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
}
