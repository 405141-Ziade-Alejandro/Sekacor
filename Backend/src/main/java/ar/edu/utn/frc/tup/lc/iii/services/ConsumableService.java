package ar.edu.utn.frc.tup.lc.iii.services;

import ar.edu.utn.frc.tup.lc.iii.dtos.Consumables.NewSecondaryConsumableDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.Consumables.PrimaryConsumableDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.Consumables.SecondaryConsumableDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.Consumables.UpdateConsumableDto;

import java.util.List;

public interface ConsumableService {
    PrimaryConsumableDto putPrimary(UpdateConsumableDto dto);

    List<PrimaryConsumableDto> getAllPrimary();

    List<SecondaryConsumableDto> getAllSecondary();

    SecondaryConsumableDto putSecondaty(UpdateConsumableDto dto);

    SecondaryConsumableDto pushSecondary(NewSecondaryConsumableDto dto);

    void deleteSecondary(Long id);
}
