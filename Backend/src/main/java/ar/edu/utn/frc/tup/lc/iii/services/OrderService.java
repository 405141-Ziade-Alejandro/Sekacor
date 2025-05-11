package ar.edu.utn.frc.tup.lc.iii.services;

import ar.edu.utn.frc.tup.lc.iii.dtos.orders.NewOrderDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.orders.OrderDto;

public interface OrderService {
    OrderDto postOrder(NewOrderDto dto);

    OrderDto updateOrder(OrderDto dto);

    OrderDto cancelarOrder(long id);
}
