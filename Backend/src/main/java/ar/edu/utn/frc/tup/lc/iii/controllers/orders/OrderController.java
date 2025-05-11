package ar.edu.utn.frc.tup.lc.iii.controllers.orders;

import ar.edu.utn.frc.tup.lc.iii.dtos.orders.NewOrderDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.orders.OrderDto;
import ar.edu.utn.frc.tup.lc.iii.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {
    private final OrderService orderService;

    @PostMapping("")
    public ResponseEntity<OrderDto> postOrder(@RequestBody NewOrderDto dto) {
        return ResponseEntity.ok(orderService.postOrder(dto));
    }

    @PutMapping("")
    public ResponseEntity<OrderDto> putORder(@RequestBody OrderDto dto) {
        return ResponseEntity.ok(orderService.updateOrder(dto));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<OrderDto> CancelOrder(@PathVariable long id) {
        return ResponseEntity.ok(orderService.cancelarOrder(id));
    }
}
