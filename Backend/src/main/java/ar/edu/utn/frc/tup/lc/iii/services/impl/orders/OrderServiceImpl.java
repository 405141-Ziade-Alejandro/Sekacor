package ar.edu.utn.frc.tup.lc.iii.services.impl.orders;

import ar.edu.utn.frc.tup.lc.iii.dtos.orders.NewOrderDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.orders.OrderDetailDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.orders.OrderDto;
import ar.edu.utn.frc.tup.lc.iii.entities.clients.ClientEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.orders.OrderDetailsEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.orders.OrderEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.orders.OrderState;
import ar.edu.utn.frc.tup.lc.iii.repositories.clients.ClientsRepository;
import ar.edu.utn.frc.tup.lc.iii.repositories.orders.OrderRepository;
import ar.edu.utn.frc.tup.lc.iii.repositories.tanks.TankRepository;
import ar.edu.utn.frc.tup.lc.iii.repositories.tanks.TankTypeRepository;
import ar.edu.utn.frc.tup.lc.iii.services.OrderService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;

    private final ClientsRepository clientsRepository;

    private final TankTypeRepository tankTypeRepository;

    private final ModelMapper modelMapper;

    /**
     * el mapeo aca es manual porque el modelmapper le asignaba el id del cliente a la entidad
     * y por ende repetidos post causaba un put o daba error 500
     * @param dto
     * @return
     */
    @Override
    public OrderDto postOrder(NewOrderDto dto) {
        Optional<ClientEntity> optionalClientEntity = clientsRepository.findById(dto.getClientId());
        if (optionalClientEntity.isEmpty()) {
            throw new EntityNotFoundException("Client not found");
        }

        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setClient(optionalClientEntity.get());
        orderEntity.setState(OrderState.PREPARANDO);
        orderEntity.setTotalPrice(dto.getTotalPrice());
        orderEntity.setOrderDate(dto.getOrderDate());

        List<OrderDetailsEntity> detailsEntityList = new ArrayList<>();

        for (OrderDetailDto detailDto : dto.getOrderDetails()) {
            OrderDetailsEntity detail = new OrderDetailsEntity();


            detail.setTankType(tankTypeRepository.findById(detailDto.getTypeTankId())
                    .orElseThrow(() -> new EntityNotFoundException("Tank type not found")));
            detail.setQuantity(detailDto.getQuantity());
            detail.setPrice(detailDto.getPrice());
            detailsEntityList.add(detail);
        }
        orderEntity.setDetails(detailsEntityList);


        OrderEntity orderEntitySaved = orderRepository.save(orderEntity);

        return modelMapper.map(orderEntitySaved, OrderDto.class);
    }

    /**
     * todo falta implementar el front
     * sigue la misma logica del post
     * @param dto
     * @return
     */
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
        OrderEntity orderEntity = optionalOrderEntity.get();

        orderEntity.setClient(optionalClientEntity.get());
        orderEntity.setState(dto.getState());
        orderEntity.setTotalPrice(dto.getTotalPrice());
        orderEntity.setOrderDate(dto.getOrderDate());

        List<OrderDetailsEntity> detailsEntityList = orderEntity.getDetails();

        //todo figure out how to do this update in the list


        OrderEntity orderEntityUpdated = orderRepository.save(orderEntity);


        return modelMapper.map(orderEntityUpdated, OrderDto.class);
    }

    /**
     * las ordenes no se borran, se cancelan, y quedan registradas
     * @param id
     * @return
     */
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
