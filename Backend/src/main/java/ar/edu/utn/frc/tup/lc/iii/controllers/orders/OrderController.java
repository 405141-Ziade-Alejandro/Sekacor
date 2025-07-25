package ar.edu.utn.frc.tup.lc.iii.controllers.orders;

import ar.edu.utn.frc.tup.lc.iii.dtos.orders.NewOrderDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.orders.OrderDto;
import ar.edu.utn.frc.tup.lc.iii.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

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
        return ResponseEntity.ok(orderService.cancelOrder(id));
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<OrderDto> completeOrder(@PathVariable long id) {
        return ResponseEntity.ok(orderService.completeOrder(id));
    }

    @GetMapping("")
    public ResponseEntity<Page<OrderDto>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(defaultValue = "desc") String order) {

        //si no se especifica sortBy, usamos "orderDate" como default
        String sortField = (sortBy == null||sortBy.isBlank()) ? "orderDate":sortBy;

        Pageable pageable = PageRequest.of(
                page,
                size,
                order.equalsIgnoreCase("asc") ?
                        Sort.by(sortField).ascending() :
                        Sort.by(sortField).descending()
        );
        Page<OrderDto> orderDtoPage = orderService.getAllOrders(pageable);

        return ResponseEntity.ok(orderDtoPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getById(@PathVariable long id) {
        return ResponseEntity.ok(orderService.getById(id));
    }

    @GetMapping("/reports/tanks-sold")
    public ResponseEntity<List<OrderDto>> getAllOrdersByDate(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)LocalDateTime start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)LocalDateTime end
            ) {
        return ResponseEntity.ok(orderService.getOrderReport(start,end));
    }

}
