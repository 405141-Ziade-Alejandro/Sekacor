package ar.edu.utn.frc.tup.lc.iii.services.impl.consumable;

import ar.edu.utn.frc.tup.lc.iii.dtos.Consumables.NewSecondaryConsumableDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.Consumables.PrimaryConsumableDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.Consumables.SecondaryConsumableDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.Consumables.UpdateConsumableDto;
import ar.edu.utn.frc.tup.lc.iii.entities.consumables.PrimaryConsumableEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.consumables.SecondaryConsumableEntity;
import ar.edu.utn.frc.tup.lc.iii.repositories.consumables.PrimaryConsumableRepository;
import ar.edu.utn.frc.tup.lc.iii.repositories.consumables.SecondaryConsumableRepository;
import ar.edu.utn.frc.tup.lc.iii.services.ConsumableService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ConsumableServiceImpl implements ConsumableService {

    private final PrimaryConsumableRepository primaryConsumableRepository;

    private final SecondaryConsumableRepository secondaryConsumableRepository;

    private final ModelMapper modelMapper;

    @Override
    public PrimaryConsumableDto putPrimary(UpdateConsumableDto dto) {
        Optional<PrimaryConsumableEntity> check = primaryConsumableRepository.findById(dto.getConsumableId());

        if (check.isEmpty()) {
            throw new EntityNotFoundException("this entity doesn't exist");
        }

        PrimaryConsumableEntity consumableEntity = check.get();

        consumableEntity.setQuantity(dto.getQuantity());

        PrimaryConsumableEntity updatedConsumable = primaryConsumableRepository.save(consumableEntity);

        return modelMapper.map(updatedConsumable,PrimaryConsumableDto.class);
    }

    @Override
    public List<PrimaryConsumableDto> getAllPrimary() {

        List<PrimaryConsumableEntity> entityList = primaryConsumableRepository.findAll();

        List<PrimaryConsumableDto> dtoList = new ArrayList<>(entityList.size());

        for (PrimaryConsumableEntity entity : entityList) {
            dtoList.add(modelMapper.map(entity,PrimaryConsumableDto.class));
        }

        return dtoList;
    }

    @Override
    public List<SecondaryConsumableDto> getAllSecondary() {
        List<SecondaryConsumableEntity> entityList = secondaryConsumableRepository.findAll();

        List<SecondaryConsumableDto> dtoList = new ArrayList<>(entityList.size());

        for (SecondaryConsumableEntity entity : entityList) {
            dtoList.add(modelMapper.map(entity, SecondaryConsumableDto.class));
        }

        return dtoList;
    }

    @Override
    public SecondaryConsumableDto putSecondaty(UpdateConsumableDto dto) {

        Optional<SecondaryConsumableEntity> check = secondaryConsumableRepository.findById(dto.getConsumableId());

        if (check.isEmpty()) {
            throw new EntityNotFoundException("this entity doesn't exist");
        }

        SecondaryConsumableEntity entity = check.get();

        entity.setQuantity(dto.getQuantity());

        SecondaryConsumableEntity updatedEntity = secondaryConsumableRepository.save(entity);

        return modelMapper.map(updatedEntity, SecondaryConsumableDto.class);
    }

    @Override
    public SecondaryConsumableDto pushSecondary(NewSecondaryConsumableDto dto) {
        SecondaryConsumableEntity newEntity = modelMapper.map(dto,SecondaryConsumableEntity.class);

        SecondaryConsumableEntity savedEntity = secondaryConsumableRepository.save(newEntity);

        return modelMapper.map(savedEntity, SecondaryConsumableDto.class);
    }

    @Override
    public void deleteSecondary(Long id) {
        Optional<SecondaryConsumableEntity> check = secondaryConsumableRepository.findById(id);

        if (check.isEmpty()) {
            throw new EntityNotFoundException("this entity doesn't exist");
        }

        secondaryConsumableRepository.delete(check.get());
    }
}
