package ar.edu.utn.frc.tup.lc.iii.services;

import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.NewTankDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.NewTankTypeDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.TankDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.TankTypeDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

public interface TankService {
    List<TankTypeDto> getAllTankTypes();


    TankTypeDto postTankType(NewTankTypeDto dto);

    TankTypeDto putTankType(Long id, NewTankTypeDto dto);

    TankTypeDto getTankType(Long id);

    void deleteType(Long id);

    TankDto postTank(NewTankDto dto, boolean force);

    void deleteTank(long id);

    Page<TankDto> getAllTanks(Pageable pageable);

    List<TankDto> getTankReport(LocalDateTime start, LocalDateTime end);
}
