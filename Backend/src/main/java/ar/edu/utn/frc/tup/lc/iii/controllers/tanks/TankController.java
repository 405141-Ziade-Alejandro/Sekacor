package ar.edu.utn.frc.tup.lc.iii.controllers.tanks;

import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.NewTankDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.NewTankTypeDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.TankDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.TankTypeDto;
import ar.edu.utn.frc.tup.lc.iii.services.TankService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public ResponseEntity<TankTypeDto> postTankType(@RequestBody NewTankTypeDto dto) {

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
    public ResponseEntity<Void> deleteType(@PathVariable Long id) {
        tankService.deleteType(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("")
    public ResponseEntity<TankDto> postTank(@RequestBody NewTankDto dto) {
        return ResponseEntity.ok(tankService.postTank(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTank(@PathVariable long id) {
        tankService.deleteTank(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/all")
    public ResponseEntity<Page<TankDto>> getAllTanks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String order) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                order.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
        );
        Page<TankDto> tankDtoPage = tankService.getAllTanks(pageable);

        return ResponseEntity.ok(tankDtoPage);
    }
}
