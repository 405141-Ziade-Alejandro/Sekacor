package ar.edu.utn.frc.tup.lc.iii.services.impl.tanks;

import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.NewTankDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.NewTankTypeDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.TankDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.TankTypeDto;
import ar.edu.utn.frc.tup.lc.iii.entities.consumables.ConsumableSubType;
import ar.edu.utn.frc.tup.lc.iii.entities.consumables.ConsumableType;
import ar.edu.utn.frc.tup.lc.iii.entities.consumables.PrimaryConsumableEntity;
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
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public TankDto postTank(NewTankDto dto) {
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

        TankEntity tankEntity = new TankEntity();

        tankEntity.setCuality(dto.getCuality());
        tankEntity.setUser(checkUser.get());
        tankEntity.setType(checkType.get());

        boolean enoughConsumables = reduceConsumables(checkType.get());


        TankEntity savedEntity = tankRepository.save(tankEntity);

        TankDto newTankDto = modelMapper.map(savedEntity, TankDto.class);

        newTankDto.setTypeId(savedEntity.getType().getId());
        newTankDto.setUserId(savedEntity.getUser().getId());


        return null;
    }

    private boolean reduceConsumables(TankTypeEntity tankTypeEntity) {
//        plastic
        Optional<PrimaryConsumableEntity> checkPlasticBlack = primaryConsumableRepository.findByTypeAndSubType(ConsumableType.PLASTICO, ConsumableSubType.NEGRO);
        if (checkPlasticBlack.isEmpty()) {
            throw new EntityNotFoundException("cannot find the primary consumable plastic black, something is wrong with the Data Base");
        }
//        if (checkPlasticBlack.get().getQuantity() < tankTypeEntity.getPlasticBlack()) {
//
//        }
        PrimaryConsumableEntity plasticBlack = checkPlasticBlack.get();

        plasticBlack.setQuantity(plasticBlack.getQuantity()/* aca tengo que poener la resta de tankTypeEntity*/);

        primaryConsumableRepository.save(plasticBlack);

//        plastic color
//        tapa
//        if tapa!=none > screws
//        big screws
//        tee
//        oring
//        sticker
//        ramal
        return true;
    }


    @Override
    public void deleteTank(long id) {

    }

    @Override
    public Page<TankDto> getAllTanks(Pageable pageable) {
        return null;
    }

}
