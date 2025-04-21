package ar.edu.utn.frc.tup.lc.iii.services;

import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.NewTankTypeDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.TankTypeDto;

import java.util.List;

public interface TankService {
    List<TankTypeDto> getAllTankTypes();


    TankTypeDto postTankType(NewTankTypeDto dto);

    TankTypeDto putTankType(Long id, NewTankTypeDto dto);

    TankTypeDto getTankType(Long id);

    void deleteType(Long id);
}
