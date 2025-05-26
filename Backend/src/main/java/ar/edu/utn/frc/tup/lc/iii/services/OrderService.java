package ar.edu.utn.frc.tup.lc.iii.services;

import ar.edu.utn.frc.tup.lc.iii.dtos.orders.NewOrderDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.orders.OrderDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {
    OrderDto postOrder(NewOrderDto dto);

    OrderDto updateOrder(OrderDto dto);

    OrderDto cancelarOrder(long id);

    Page<OrderDto> getAllOrders(Pageable pageable);

    OrderDto getById(long id);

    OrderDto completeOrder(long id);
}
