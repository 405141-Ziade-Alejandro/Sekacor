package ar.edu.utn.frc.tup.lc.iii.services.impl.orders;

import ar.edu.utn.frc.tup.lc.iii.dtos.orders.NewOrderDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.orders.OrderDto;
import ar.edu.utn.frc.tup.lc.iii.entities.clients.ClientEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.orders.OrderEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.orders.OrderState;
import ar.edu.utn.frc.tup.lc.iii.repositories.clients.ClientsRepository;
import ar.edu.utn.frc.tup.lc.iii.repositories.orders.OrderRepository;
import ar.edu.utn.frc.tup.lc.iii.services.OrderService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;

    private final ClientsRepository clientsRepository;

    private final ModelMapper modelMapper;

    @Override
    public OrderDto postOrder(NewOrderDto dto) {
        Optional<ClientEntity> optionalClientEntity = clientsRepository.findById(dto.getClientId());
        if (optionalClientEntity.isEmpty()) {
            throw new EntityNotFoundException("Client not found");
        }

        OrderEntity orderEntity = modelMapper.map(dto, OrderEntity.class);
        orderEntity.setState(OrderState.PREPARANDO);

        OrderEntity orderEntitySaved = orderRepository.save(orderEntity);

        return modelMapper.map(orderEntitySaved, OrderDto.class);
    }

    @Override
    public OrderDto updateOrder(OrderDto dto) {
        Optional<ClientEntity> optionalClientEntity = clientsRepository.findById(dto.getClientId());
        if (optionalClientEntity.isEmpty()) {
            throw new EntityNotFoundException("Client not found");
        }
        Optional<OrderEntity> optionalOrderEntity = orderRepository.findById(dto.getId());
        if (optionalOrderEntity.isEmpty()) {
            throw new EntityNotFoundException("Order not found");
        }
        OrderEntity orderEntity = modelMapper.map(dto, OrderEntity.class);

        OrderEntity orderEntityUpdated = orderRepository.save(orderEntity);


        return modelMapper.map(orderEntityUpdated, OrderDto.class);
    }

    @Override
    public OrderDto cancelarOrder(long id) {
        Optional<OrderEntity> optionalOrderEntity = orderRepository.findById(id);
        if (optionalOrderEntity.isEmpty()) {
            throw new EntityNotFoundException("Order not found");
        }
        optionalOrderEntity.get().setState(OrderState.CANCELADO);

        return modelMapper.map(orderRepository.save(optionalOrderEntity.get()), OrderDto.class);
    }
}
