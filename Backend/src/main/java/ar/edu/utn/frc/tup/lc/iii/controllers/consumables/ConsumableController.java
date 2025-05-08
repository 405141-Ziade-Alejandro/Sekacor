package ar.edu.utn.frc.tup.lc.iii.controllers.consumables;

import ar.edu.utn.frc.tup.lc.iii.dtos.Consumables.NewSecondaryConsumableDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.Consumables.PrimaryConsumableDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.Consumables.SecondaryConsumableDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.Consumables.UpdateConsumableDto;
import ar.edu.utn.frc.tup.lc.iii.services.ConsumableService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Consumable")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ConsumableController {

    private final ConsumableService consumableService;

    @PutMapping("/primary")
    public ResponseEntity<PrimaryConsumableDto> putPrimary(@RequestBody UpdateConsumableDto dto) {
        return ResponseEntity.ok(consumableService.putPrimary(dto));
    }

    @GetMapping("/primary")
    public ResponseEntity<List<PrimaryConsumableDto>> getAllPrimary() {
        return ResponseEntity.ok(consumableService.getAllPrimary());
    }

    @PostMapping("/secondary")
    public ResponseEntity<SecondaryConsumableDto> post(@RequestBody NewSecondaryConsumableDto dto) {
        return ResponseEntity.ok(consumableService.pushSecondary(dto));
    }

    @GetMapping("/secondary")
    public ResponseEntity<List<SecondaryConsumableDto>> getAllSecondary() {
        return ResponseEntity.ok(consumableService.getAllSecondary());
    }

    @PutMapping("/secondary")
    public ResponseEntity<SecondaryConsumableDto> putSecondary(@RequestBody UpdateConsumableDto dto) {
        return ResponseEntity.ok(consumableService.putSecondaty(dto));
    }


    @DeleteMapping("/secondary/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) {

        consumableService.deleteSecondary(id);

        return ResponseEntity.noContent().build();
    }
}
