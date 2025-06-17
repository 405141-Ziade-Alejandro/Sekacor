package ar.edu.utn.frc.tup.lc.iii.services.impl.orders;

import ar.edu.utn.frc.tup.lc.iii.dtos.error.InvalidOrderStateException;
import ar.edu.utn.frc.tup.lc.iii.dtos.orders.NewOrderDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.orders.OrderDetailDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.orders.OrderDto;
import ar.edu.utn.frc.tup.lc.iii.entities.clients.ClientEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.orders.OrderDetailsEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.orders.OrderEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.orders.OrderState;
import ar.edu.utn.frc.tup.lc.iii.entities.tanks.TankTypeEntity;
import ar.edu.utn.frc.tup.lc.iii.repositories.clients.ClientsRepository;
import ar.edu.utn.frc.tup.lc.iii.repositories.orders.OrderRepository;
import ar.edu.utn.frc.tup.lc.iii.repositories.tanks.TankTypeRepository;
import ar.edu.utn.frc.tup.lc.iii.services.OrderService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.hibernate.query.Order;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
     *
     * @param dto
     * @return
     */
    @Override
    @Transactional
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

            /*todo: see if this can be better,
            *  for now it just search the DB for each detail*/
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
     * sigue la misma logica del post
     *
     * @param dto
     * @return
     */
    @Override
    @Transactional
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

        List<OrderDetailsEntity> detailsEntityList = new ArrayList<>(dto.getOrderDetails().size());

        for (OrderDetailDto detailDto : dto.getOrderDetails()) {
            OrderDetailsEntity detail = new OrderDetailsEntity();
            detail.setQuantity(detailDto.getQuantity());
            detail.setPrice(detailDto.getPrice());

            detail.setTankType(tankTypeRepository.findById(detailDto.getTypeTankId())
                    .orElseThrow(() -> new EntityNotFoundException("Tank type not found")));

            detailsEntityList.add(detail);
        }
        orderEntity.getDetails().clear();
        orderEntity.getDetails().addAll(detailsEntityList);

        OrderEntity orderEntityUpdated = orderRepository.save(orderEntity);

        return modelMapper.map(orderEntityUpdated, OrderDto.class);
    }

    /**
     * las ordenes no se borran, se cancelan, y quedan registradas
     *
     * @param id
     * @return
     */
    @Override
    @Transactional
    public OrderDto cancelarOrder(long id) {
        Optional<OrderEntity> optionalOrderEntity = orderRepository.findById(id);
        if (optionalOrderEntity.isEmpty()) {
            throw new EntityNotFoundException("Order not found");
        }
        if (optionalOrderEntity.get().getState() == OrderState.CANCELADO || optionalOrderEntity.get().getState() == OrderState.FINALIZADO) {
            throw new InvalidOrderStateException("Invalid order state for cancellation");
        }
        optionalOrderEntity.get().setState(OrderState.CANCELADO);

        return modelMapper.map(orderRepository.save(optionalOrderEntity.get()), OrderDto.class);
    }

    @Override
    public Page<OrderDto> getAllOrders(Pageable pageable) {
        Page<OrderEntity> orderEntityPage = orderRepository.findAll(pageable);

        List<OrderEntity> orderEntityList = orderEntityPage.getContent();


        List<OrderDto> orderDtoList = new ArrayList<>();
        for (OrderEntity orderEntity : orderEntityList) {
            OrderDto orderDto = modelMapper.map(orderEntity, OrderDto.class);
            orderDtoList.add(orderDto);
        }

        return new PageImpl<>(orderDtoList, pageable, orderEntityPage.getTotalElements());
    }

    @Override
    public OrderDto getById(long id) {
        Optional<OrderEntity> checkOrderEntity = orderRepository.findById(id);
        if (checkOrderEntity.isEmpty()) {
            throw new EntityNotFoundException("Order not found");
        }
        return modelMapper.map(checkOrderEntity.get(), OrderDto.class);
    }

    @Override
    @Transactional
    public OrderDto completeOrder(long id) {
        Optional<OrderEntity> checkOrderEntity = orderRepository.findById(id);
        if (checkOrderEntity.isEmpty()) {
            throw new EntityNotFoundException("Order not found");
        }
        if (checkOrderEntity.get().getState() != OrderState.PREPARANDO) {
            throw new InvalidOrderStateException("Invalid order state for completion");
        }

        reduceTanksInStock(checkOrderEntity.get().getDetails());

        checkOrderEntity.get().setState(OrderState.FINALIZADO);
        checkOrderEntity.get().setOrderDate(LocalDateTime.now());

        OrderEntity savedOrderEntity = orderRepository.save(checkOrderEntity.get());

        return modelMapper.map(savedOrderEntity, OrderDto.class);
    }

    @Override
    public List<OrderDto> getOrderReport(LocalDateTime start, LocalDateTime end) {
        List<OrderEntity> orderEntityList = orderRepository.findAllByOrderDateBetween(start, end);
        List<OrderDto> orderDtoList = new ArrayList<>(orderEntityList.size());

        for (OrderEntity orderEntity : orderEntityList) {
//            if (orderEntity.getState() == OrderState.FINALIZADO) { todo: esto esta asi para facilitar el testing, una vez listo descomentar
                orderDtoList.add(modelMapper.map(orderEntity, OrderDto.class));
//            }
        }
        return orderDtoList;
    }

    /**
     * what this does is reduce from stock all the tanks that were sold
     * only stock 1 because those are the ones that are sold this way
     * @param details contains all the tankTypes and the amount sold of them
     */
    private void reduceTanksInStock(List<OrderDetailsEntity> details) {
        List<TankTypeEntity> tankTypeEntityList = new ArrayList<>();

        for (OrderDetailsEntity detail : details) {
          detail.getTankType().setStock1(detail.getTankType().getStock1() - detail.getQuantity());
          tankTypeEntityList.add(detail.getTankType());
        }
        tankTypeRepository.saveAll(tankTypeEntityList);
    }
}
