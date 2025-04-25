package ar.edu.utn.frc.tup.lc.iii.controllers.tanks;

import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.NewTankTypeDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.TankTypeDto;
import ar.edu.utn.frc.tup.lc.iii.services.TankService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tanks")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TankController {

    private final TankService tankService;

    @GetMapping("type/all")
    public ResponseEntity<List<TankTypeDto>> getAllTankTypes(){
        List<TankTypeDto> tankDtoList = tankService.getAllTankTypes();

        return ResponseEntity.ok(tankDtoList);
    }


    @PostMapping("type")
    public ResponseEntity<TankTypeDto> postTank(@RequestBody NewTankTypeDto dto) {

        return ResponseEntity.ok(tankService.postTankType(dto));
    }

    @PutMapping("type/{id}")
    public ResponseEntity<TankTypeDto> putTankType(@PathVariable Long id,@RequestBody NewTankTypeDto dto) {
        return ResponseEntity.ok(tankService.putTankType(id,dto));
    }

    @GetMapping("type/{id}")
    public ResponseEntity<TankTypeDto> getTankType(@PathVariable Long id) {
        return ResponseEntity.ok(tankService.getTankType(id));
    }

    @DeleteMapping("type/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        tankService.deleteType(id);
        return ResponseEntity.noContent().build();
    }


}
