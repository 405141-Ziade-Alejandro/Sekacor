package ar.edu.utn.frc.tup.lc.iii.services.impl;

import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.NewTankTypeDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.TankTypeDto;
import ar.edu.utn.frc.tup.lc.iii.entities.tanks.TankTypeEntity;
import ar.edu.utn.frc.tup.lc.iii.repositories.TankRepository;
import ar.edu.utn.frc.tup.lc.iii.services.TankService;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TankServiceImpl implements TankService {

    private final TankRepository tankRepository;

    private final ModelMapper modelMapper;

    @Override
    public List<TankTypeDto> getAllTankTypes() {

        List<TankTypeEntity> tankTypeEntities = tankRepository.findAll();

        List<TankTypeDto> tankTypeDtos = new ArrayList<>(tankTypeEntities.size());

        for (TankTypeEntity tankType : tankTypeEntities) {
            TankTypeDto tank = modelMapper.map(tankType, TankTypeDto.class);
            tankTypeDtos.add(tank);
        }

        return tankTypeDtos;
    }

    @Override
    public TankTypeDto postTankType(NewTankTypeDto dto) {

        TankTypeEntity newTankType = modelMapper.map(dto, TankTypeEntity.class);

        TankTypeEntity savedEntity = tankRepository.save(newTankType);

        return modelMapper.map(savedEntity, TankTypeDto.class);
    }

    @Override
    public TankTypeDto putTankType(Long id, NewTankTypeDto dto) {

        Optional<TankTypeEntity> check = tankRepository.findById(id);
        if (check.isEmpty()) {
            throw new EntityNotFoundException("Tank Type with id '" + id + "' does not exist");
        }

        TankTypeEntity tankTypeEntity = check.get();
        //tankTypeEntity = modelMapper.map(dto, TankTypeEntity);
        modelMapper.map(dto, tankTypeEntity);

        TankTypeEntity updatedEntity = tankRepository.save(tankTypeEntity);

        return modelMapper.map(updatedEntity, TankTypeDto.class);
    }

    @Override
    public TankTypeDto getTankType(Long id) {
        Optional<TankTypeEntity> check = tankRepository.findById(id);
        if (check.isEmpty()) {
            throw new EntityNotFoundException("Tank Type with id '" + id + "' does not exist");
        }

        return modelMapper.map(check.get(), TankTypeDto.class);
    }

    @Override
    public void deleteType(Long id) {
        Optional<TankTypeEntity> check = tankRepository.findById(id);
        if (check.isEmpty()) {
            throw new EntityNotFoundException("Tank Type with id '" + id + "' does not exist");
        }
        tankRepository.delete(check.get());
    }

}
