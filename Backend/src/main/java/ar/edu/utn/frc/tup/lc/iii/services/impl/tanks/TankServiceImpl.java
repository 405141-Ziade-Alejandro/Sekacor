package ar.edu.utn.frc.tup.lc.iii.services.impl.tanks;

import ar.edu.utn.frc.tup.lc.iii.dtos.error.NotEnoughConsumablesException;
import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.*;
import ar.edu.utn.frc.tup.lc.iii.entities.consumables.ConsumableSubType;
import ar.edu.utn.frc.tup.lc.iii.entities.consumables.ConsumableType;
import ar.edu.utn.frc.tup.lc.iii.entities.consumables.PrimaryConsumableEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.tanks.Cuality;
import ar.edu.utn.frc.tup.lc.iii.entities.tanks.TankEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.tanks.TankTypeEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.users.UserEntity;
import ar.edu.utn.frc.tup.lc.iii.repositories.consumables.PrimaryConsumableRepository;
import ar.edu.utn.frc.tup.lc.iii.repositories.tanks.TankRepository;
import ar.edu.utn.frc.tup.lc.iii.repositories.tanks.TankTypeRepository;
import ar.edu.utn.frc.tup.lc.iii.repositories.users.UserRepository;
import ar.edu.utn.frc.tup.lc.iii.services.TankService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.function.BiConsumer;
import java.util.function.BiFunction;

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
    public TankTypeDto postTankType(NewTankTypeDto dto) {

        TankTypeEntity newTankType = modelMapper.map(dto, TankTypeEntity.class);

        TankTypeEntity savedEntity = tankTypeRepository.save(newTankType);
        log.info("new tank type: {} saved", savedEntity);

        return modelMapper.map(savedEntity, TankTypeDto.class);
    }

    @Override
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
    public void deleteType(Long id) {
        Optional<TankTypeEntity> check = tankTypeRepository.findById(id);
        if (check.isEmpty()) {
            log.error("Tank type with id {} not found", id);
            throw new EntityNotFoundException("Tank Type with id '" + id + "' does not exist");
        }
        tankTypeRepository.delete(check.get());
        log.info("Tank type with id {} deleted", id);
    }

    @Override
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

        List<MissingConsumableDto> missing = validateAndReduceConsumables(checkType.get(), force);
        if (!missing.isEmpty()) {
            throw new NotEnoughConsumablesException(missing);
        }

        TankEntity tankEntity = new TankEntity();

        tankEntity.setCuality(dto.getCuality());
        tankEntity.setUser(checkUser.get());
        tankEntity.setType(checkType.get());


        TankEntity savedEntity = tankRepository.save(tankEntity);

        if (dto.getCuality()== Cuality.PRIMERA){
            checkType.get().setStock1(checkType.get().getStock1()+1);
            tankTypeRepository.save(checkType.get());
        } else{
            checkType.get().setStock2(checkType.get().getStock2()+1);
            tankTypeRepository.save(checkType.get());
        }

        TankDto newTankDto = modelMapper.map(savedEntity, TankDto.class);

        newTankDto.setTypeId(savedEntity.getType().getId());
        newTankDto.setUserId(savedEntity.getUser().getId());


        return newTankDto;
    }

    private List<MissingConsumableDto> validateAndReduceConsumables(TankTypeEntity tankTypeEntity, boolean force) {

        List<MissingConsumableDto> missingList = new ArrayList<>();

        checkAndReduce(ConsumableType.PLASTICO, ConsumableSubType.NEGRO, force, tankTypeEntity.getPlasticBlack(), missingList);
        checkAndReduce(ConsumableType.PLASTICO, ConsumableSubType.COLOR, force, tankTypeEntity.getPlasticColor(), missingList);

        if (tankTypeEntity.getCoverType() != ConsumableSubType.NONE) {
            checkAndReduce(ConsumableType.TAPA, tankTypeEntity.getCoverType(), force, BigDecimal.ONE, missingList);
            checkAndReduce(ConsumableType.TORNILLOS, ConsumableSubType.NONE, force, BigDecimal.valueOf(tankTypeEntity.getScrews()), missingList);
        }

        if (tankTypeEntity.getBigScrews() > 0) {
            checkAndReduce(ConsumableType.TORNILLO_GRANDE, ConsumableSubType.NONE, force, BigDecimal.valueOf(tankTypeEntity.getBigScrews()), missingList);
        }

        if (tankTypeEntity.isTee()) {
            //tee siempre son dos las que se usan
            checkAndReduce(ConsumableType.TEE, ConsumableSubType.NONE, force, BigDecimal.valueOf(2), missingList);
        }

        if (tankTypeEntity.getORing() != ConsumableSubType.NONE) {
            checkAndReduce(ConsumableType.ARO_GOMA, tankTypeEntity.getORing(), force, BigDecimal.valueOf(2), missingList);
        }

        if (tankTypeEntity.getSticker() != ConsumableSubType.NONE) {
            checkAndReduce(ConsumableType.STICKER, tankTypeEntity.getSticker(), force, BigDecimal.valueOf(1), missingList);
        }

        if (tankTypeEntity.getRamal() != ConsumableSubType.NONE) {
            checkAndReduce(ConsumableType.RAMAL, tankTypeEntity.getRamal(), force, BigDecimal.valueOf(2), missingList);
        }

        return missingList;
    }

    private void checkAndReduce(ConsumableType type, ConsumableSubType subType, boolean force, BigDecimal required, List<MissingConsumableDto> missingList) {
        Optional<PrimaryConsumableEntity> opt = primaryConsumableRepository.findByTypeAndSubType(type, subType);

        if (opt.isEmpty()) {
            throw new EntityNotFoundException("Consumable not found: " + type + " - " + subType);
        }

        PrimaryConsumableEntity primaryConsumable = opt.get();
        BigDecimal available = primaryConsumable.getQuantity();

        if (available.compareTo(required) >= 0) {
            primaryConsumable.setQuantity(available.subtract(required));
            primaryConsumableRepository.save(primaryConsumable);
        } else {
            if (!force) {
                missingList.add(new MissingConsumableDto(type, subType, required, available));
            } else {
                //registrar en negativo
                primaryConsumable.setQuantity(available.subtract(required));
                primaryConsumableRepository.save(primaryConsumable);
            }
        }

    }

    @Override
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

}
