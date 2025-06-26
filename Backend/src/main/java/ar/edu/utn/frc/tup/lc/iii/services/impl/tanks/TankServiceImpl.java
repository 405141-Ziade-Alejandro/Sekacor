package ar.edu.utn.frc.tup.lc.iii.services.impl.tanks;

import ar.edu.utn.frc.tup.lc.iii.dtos.error.NotEnoughConsumablesException;
import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.*;
import ar.edu.utn.frc.tup.lc.iii.entities.consumables.ConsumableSubType;
import ar.edu.utn.frc.tup.lc.iii.entities.consumables.ConsumableType;
import ar.edu.utn.frc.tup.lc.iii.entities.consumables.PrimaryConsumableEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.tanks.Quality;
import ar.edu.utn.frc.tup.lc.iii.entities.tanks.TankEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.tanks.TankTypeEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.users.UserEntity;
import ar.edu.utn.frc.tup.lc.iii.repositories.consumables.PrimaryConsumableRepository;
import ar.edu.utn.frc.tup.lc.iii.repositories.tanks.TankRepository;
import ar.edu.utn.frc.tup.lc.iii.repositories.tanks.TankTypeRepository;
import ar.edu.utn.frc.tup.lc.iii.repositories.users.UserRepository;
import ar.edu.utn.frc.tup.lc.iii.services.TankService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class TankServiceImpl implements TankService {

    private final TankTypeRepository tankTypeRepository;

    private final TankRepository tankRepository;

    private final UserRepository userRepository;

    private final PrimaryConsumableRepository primaryConsumableRepository;

    private final ModelMapper modelMapper;

    @Override
    public List<TankTypeDto> getAllTankTypes() {

        List<TankTypeEntity> tankTypeEntities = tankTypeRepository.findAll();

        List<TankTypeDto> tankTypeDtos = new ArrayList<>(tankTypeEntities.size());

        log.info("mapping all tank types");
        for (TankTypeEntity tankType : tankTypeEntities) {
            TankTypeDto tank = modelMapper.map(tankType, TankTypeDto.class);
            tankTypeDtos.add(tank);
        }

        return tankTypeDtos;
    }

    @Override
    @Transactional
    public TankTypeDto postTankType(NewTankTypeDto dto) {

        TankTypeEntity newTankType = modelMapper.map(dto, TankTypeEntity.class);

        TankTypeEntity savedEntity = tankTypeRepository.save(newTankType);
        log.info("new tank type: {} saved", savedEntity);

        return modelMapper.map(savedEntity, TankTypeDto.class);
    }

    @Override
    @Transactional
    public TankTypeDto putTankType(Long id, NewTankTypeDto dto) {

        Optional<TankTypeEntity> check = tankTypeRepository.findById(id);
        if (check.isEmpty()) {
            log.error("Tank type with id {} not found", id);
            throw new EntityNotFoundException("Tank Type with id '" + id + "' does not exist");
        }

        TankTypeEntity tankTypeEntity = check.get();
        modelMapper.map(dto, tankTypeEntity);

        TankTypeEntity updatedEntity = tankTypeRepository.save(tankTypeEntity);

        log.info("Tank type with id {} updated", id);

        return modelMapper.map(updatedEntity, TankTypeDto.class);
    }

    @Override
    public TankTypeDto getTankType(Long id) {
        Optional<TankTypeEntity> check = tankTypeRepository.findById(id);

        if (check.isEmpty()) {
            log.error("Tank type with id {} not found", id);
            throw new EntityNotFoundException("Tank Type with id '" + id + "' does not exist");
        }

        return modelMapper.map(check.get(), TankTypeDto.class);
    }

    @Override
    @Transactional
    public void deleteType(Long id) {
        Optional<TankTypeEntity> check = tankTypeRepository.findById(id);
        if (check.isEmpty()) {
            log.error("Tank type with id {} not found", id);
            throw new EntityNotFoundException("Tank Type with id '" + id + "' does not exist");
        }
        List<TankEntity> tankEntities = tankRepository.findAllByType(check.get());

        for (TankEntity tank : tankEntities) {
            tank.setType(null);
        }
        tankRepository.saveAll(tankEntities);

        tankTypeRepository.delete(check.get());
        log.info("Tank type with id {} deleted", id);
    }

    /**
     * this method makes sure to post a new tank and reduce the consumables used
     * or send you a list with what's missing on an
     * @exception NotEnoughConsumablesException this exception has a missing list with the consumables missing
     * @param dto
     * @param force this boolean is set up so that the consumables do get reduce
     *              even if that means that they will have negative stock
     * @return
     */
    @Override
    @Transactional
    public TankDto postTank(NewTankDto dto, boolean force) {
        Optional<TankTypeEntity> checkType = tankTypeRepository.findById(dto.getTypeId());
        if (checkType.isEmpty()) {
            log.error("Tank type with id {} not found", dto.getTypeId());
            throw new EntityNotFoundException("Tank Type with id '" + dto.getTypeId() + "' does not exist");
        }

        Optional<UserEntity> checkUser = userRepository.findById(dto.getUserId());
        if (checkUser.isEmpty()) {
            log.error("User with id {} not found", dto.getUserId());
            throw new EntityNotFoundException("User with id '" + dto.getUserId() + "' does not exist");
        }

        //if force is true, then it bypass the check of consumables
        //and reduces the consumables anyway
        if (!force){
            List<MissingConsumableDto> missing = validateConsumables(checkType.get());
            if (!missing.isEmpty()) {
                throw new NotEnoughConsumablesException(missing);
            }
        }
        //this is the method that reduce the amount of cconsumables according to the type of tank
        reducePrimaryConsumables(checkType.get());



        TankEntity tankEntity = new TankEntity();

        tankEntity.setQuality(dto.getQuality());
        tankEntity.setUser(checkUser.get());
        tankEntity.setType(checkType.get());


        TankEntity savedEntity = tankRepository.save(tankEntity);

        if (dto.getQuality()== Quality.PRIMERA){
            checkType.get().setStock1(checkType.get().getStock1()+1);
        } else{
            checkType.get().setStock2(checkType.get().getStock2()+1);
        }
        tankTypeRepository.save(checkType.get());

        TankDto newTankDto = modelMapper.map(savedEntity, TankDto.class);

        newTankDto.setTypeId(savedEntity.getType().getId());
        newTankDto.setUserId(savedEntity.getUser().getId());


        return newTankDto;
    }

    /**
     * this method goes one by one on each required consumable for the type tank and reduce it
     * @param tankTypeEntity it is necesary to check what and the amount that needs reducing
     */
    private void reducePrimaryConsumables(TankTypeEntity tankTypeEntity) {
        reduceConsumable(ConsumableType.PLASTICO,ConsumableSubType.NEGRO,tankTypeEntity.getPlasticBlack());
        reduceConsumable(ConsumableType.PLASTICO,ConsumableSubType.COLOR,tankTypeEntity.getPlasticColor());

        if (tankTypeEntity.getCoverType() != ConsumableSubType.NONE){
            reduceConsumable(ConsumableType.TAPA,tankTypeEntity.getCoverType(),BigDecimal.ONE);
            reduceConsumable(ConsumableType.TORNILLOS,ConsumableSubType.NONE, BigDecimal.valueOf(tankTypeEntity.getScrews()));
        }

        if (tankTypeEntity.getBigScrews()>0){
            reduceConsumable(ConsumableType.TORNILLO_GRANDE,ConsumableSubType.NONE,BigDecimal.valueOf(tankTypeEntity.getBigScrews()));
        }

        if (tankTypeEntity.isTee()) {
            reduceConsumable(ConsumableType.TEE,ConsumableSubType.NONE,BigDecimal.valueOf(2));
        }

        if (tankTypeEntity.getSticker()!= ConsumableSubType.NONE){
            reduceConsumable(ConsumableType.STICKER, tankTypeEntity.getSticker(),BigDecimal.ONE);
        }
    }

    /**
     * this does only reduces the primary consumable by the amount required
     * @param consumableType this is required to find the consumable
     * @param consumableSubType this is required to find the consumable
     * @param amountRequired amount that will be reduced
     */
    private void reduceConsumable(ConsumableType consumableType, ConsumableSubType consumableSubType, BigDecimal amountRequired) {

        Optional<PrimaryConsumableEntity> optional = primaryConsumableRepository.findByTypeAndSubType(consumableType, consumableSubType);
        if (optional.isEmpty()) {
            throw new EntityNotFoundException("Primary consumable with type '" + consumableType + "' and subType of '"+consumableSubType+"' does not exist");
        }

        PrimaryConsumableEntity primaryConsumable = optional.get();
        BigDecimal availableConsumable = primaryConsumable.getQuantity();

        primaryConsumable.setQuantity(availableConsumable.subtract(amountRequired));
        primaryConsumableRepository.save(primaryConsumable);
    }

    /**
     * this method goes one by one for the Primary consumables required to make the tank
     * it returns a list, if the list is empty, it means there were enough consumables to make the tank
     * if the list isn't empty it means that there were consumables missing
     * @param tankTypeEntity this is required to know the amounts of consumables for production
     * @return a list of consumables with the amount missing to complete the production
     */
    private List<MissingConsumableDto> validateConsumables(TankTypeEntity tankTypeEntity) {

        List<MissingConsumableDto> missingList = new ArrayList<>();

        checkConsumable(ConsumableType.PLASTICO, ConsumableSubType.NEGRO,tankTypeEntity.getPlasticBlack(),missingList);
        checkConsumable(ConsumableType.PLASTICO,ConsumableSubType.COLOR,tankTypeEntity.getPlasticColor(),missingList);


        if (tankTypeEntity.getCoverType() != ConsumableSubType.NONE){
            checkConsumable(ConsumableType.TAPA,tankTypeEntity.getCoverType(),BigDecimal.ONE,missingList);
            checkConsumable(ConsumableType.TORNILLOS,ConsumableSubType.NONE,BigDecimal.valueOf(tankTypeEntity.getScrews()),missingList);
        }

        if (tankTypeEntity.getBigScrews()>0){
            checkConsumable(ConsumableType.TORNILLO_GRANDE,ConsumableSubType.NONE,BigDecimal.valueOf(tankTypeEntity.getBigScrews()),missingList);
        }

        if (tankTypeEntity.isTee()) {
            checkConsumable(ConsumableType.TEE,ConsumableSubType.NONE,BigDecimal.valueOf(2),missingList);
        }

        if (tankTypeEntity.getSticker()!= ConsumableSubType.NONE){
            checkConsumable(ConsumableType.STICKER,tankTypeEntity.getSticker(),BigDecimal.ONE,missingList);
        }
        return missingList;
    }

    /**
     * this method checks if there is enough consumable for the production of the tank
     * if there is, nothing happen,
     * if there isn't then it adds it to the list
     * @param consumableType to locate the primary consumable
     * @param consumableSubType to locate the primary consumable
     * @param consumableRequiredByTheTank the amount of the consumable for the production
     * @param missingList list of consumables and the amount missing
     */
    private void checkConsumable(ConsumableType consumableType, ConsumableSubType consumableSubType, BigDecimal consumableRequiredByTheTank, List<MissingConsumableDto> missingList) {
        Optional<PrimaryConsumableEntity> optional = primaryConsumableRepository.findByTypeAndSubType(consumableType, consumableSubType);
        if (optional.isEmpty()) {
            throw new EntityNotFoundException("Primary consumable with type '" + consumableType + "' and subType of '"+consumableSubType+"' does not exist");
        }

        PrimaryConsumableEntity primaryConsumable = optional.get();
        BigDecimal availableConsumable = primaryConsumable.getQuantity();

        if (availableConsumable.compareTo(consumableRequiredByTheTank) < 0) {
            missingList.add(new MissingConsumableDto(consumableType, consumableSubType, consumableRequiredByTheTank, availableConsumable,primaryConsumable.getUnit()));
        }
    }

    @Override
    @Transactional
    public void deleteTank(long id) {
        Optional<TankEntity> opt = tankRepository.findById(id);
        if (opt.isEmpty()) {
            throw new EntityNotFoundException("Tank not found: " + id);
        }

        tankRepository.deleteById(id);
    }


    @Override
    public Page<TankDto> getAllTanks(Pageable pageable) {
        //paso 1: consultamos la base paginada
        Page<TankEntity> page = tankRepository.findAll(pageable);
        // paso 2: obtenemos los datos de esta pagina
        List<TankEntity> tankEntities = page.getContent();

        //paso 3 convertir entidades a dtos
        List<TankDto> tankDtos = new ArrayList<>();
        for (TankEntity tankEntity : tankEntities) {
            TankDto tankDto = modelMapper.map(tankEntity, TankDto.class);
            tankDto.setTypeId(tankEntity.getType().getId());
            tankDto.setUserId(tankEntity.getUser().getId());
            tankDtos.add(tankDto);
        }

        //paso 4 devolvemos la pagina con todos los datos
        return new PageImpl<>(tankDtos, pageable, page.getTotalElements());
    }

    @Override
    public List<TankDto> getTankReport(LocalDateTime start, LocalDateTime end) {
        List<TankEntity> tankEntities = tankRepository.findAllByCreatedDateBetween(start, end);
        List<TankDto> tankDtos = new ArrayList<>(tankEntities.size());

        for (TankEntity tankEntity : tankEntities) {
            tankDtos.add(modelMapper.map(tankEntity, TankDto.class));
        }
        return tankDtos;
    }

}
