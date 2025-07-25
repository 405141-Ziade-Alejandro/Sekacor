package ar.edu.utn.frc.tup.lc.iii.services;

import ar.edu.utn.frc.tup.lc.iii.dtos.orders.NewOrderDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.orders.OrderDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderService {
    OrderDto postOrder(NewOrderDto dto);

    OrderDto updateOrder(OrderDto dto);

    OrderDto cancelOrder(long id);

    Page<OrderDto> getAllOrders(Pageable pageable);

    OrderDto getById(long id);

    OrderDto completeOrder(long id);

    List<OrderDto> getOrderReport(LocalDateTime start, LocalDateTime end);
}
