package ar.edu.utn.frc.tup.lc.iii.controllers.prices;

import ar.edu.utn.frc.tup.lc.iii.dtos.prices.PriceListDto;
import ar.edu.utn.frc.tup.lc.iii.services.PriceListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prices")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PriceListController {
    private final PriceListService priceListService;

    @GetMapping("")
    public ResponseEntity<List<PriceListDto>> getAll() {
        return ResponseEntity.ok(priceListService.getAllLists());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PriceListDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(priceListService.getById(id));
    }

    @PostMapping("")
    public ResponseEntity<PriceListDto> post(@RequestBody PriceListDto dto) {
        return ResponseEntity.ok(priceListService.postList(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) {
        priceListService.deleteList(id);
        return ResponseEntity.noContent().build();
    }
}
