package ar.edu.utn.frc.tup.lc.iii.services.impl.clients;

import ar.edu.utn.frc.tup.lc.iii.dtos.clients.ClientDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.clients.NewClientDto;
import ar.edu.utn.frc.tup.lc.iii.entities.clients.ClientEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.orders.OrderEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.prices.PriceListEntity;
import ar.edu.utn.frc.tup.lc.iii.repositories.clients.ClientsRepository;
import ar.edu.utn.frc.tup.lc.iii.repositories.orders.OrderRepository;
import ar.edu.utn.frc.tup.lc.iii.repositories.prices.PriceListRepository;
import ar.edu.utn.frc.tup.lc.iii.services.ClientService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClientServiceImpl implements ClientService {

    private final ClientsRepository clientsRepository;

    private final PriceListRepository priceListRepository;

    private final OrderRepository orderRepository;

    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public ClientDto postNewClient(NewClientDto dto) {
        Optional<PriceListEntity> check = priceListRepository.findById(dto.getPriceListId());

        if (check.isEmpty()) {
            log.error("Price list with id {} not found", dto.getPriceListId());
            throw new EntityNotFoundException("Price list not found");
        }

        ClientEntity clientEntity = new ClientEntity();
        clientEntity.setDirection(dto.getDirection());
        clientEntity.setName(dto.getName());
        clientEntity.setTelephone(dto.getTelephone());

        clientEntity.setPriceList(check.get());

        ClientEntity savedEntity = clientsRepository.save(clientEntity);
        log.info("New client with id {} saved", savedEntity.getId());
        return modelMapper.map(savedEntity, ClientDto.class);
    }

    @Override
    @Transactional
    public ClientDto putClient(ClientDto dto) {
        Optional<ClientEntity> checkEntity = clientsRepository.findById(dto.getId());
        if (checkEntity.isEmpty()) {
            log.error("Client with id {} not found", dto.getId());
            throw new EntityNotFoundException("Entity "+dto.getId()+" does not exist");
        }

        Optional<PriceListEntity> checkPrice = priceListRepository.findById(dto.getPriceListId());
        if (checkPrice.isEmpty()) {
            log.error("Price list with id {} not found", dto.getPriceListId());
            throw new EntityNotFoundException("Price list not found");
        }

        log.info("Mapping Client with id {} to DTO", dto.getId());

        ClientEntity clientEntity = checkEntity.get();
        clientEntity.setName(dto.getName());
        clientEntity.setTelephone(dto.getTelephone());
        clientEntity.setPriceList(checkPrice.get());
        clientEntity.setDirection(dto.getDirection());



        ClientEntity updatedEntity = clientsRepository.save(clientEntity);
        return modelMapper.map(updatedEntity, ClientDto.class);
    }

    @Override
    public List<ClientDto> getAllClients() {
        List<ClientEntity> clientEntities = clientsRepository.findAll();
        List<ClientDto> clientDtos = new ArrayList<>(clientEntities.size());

        for (ClientEntity clientEntity : clientEntities) {
            clientDtos.add(modelMapper.map(clientEntity, ClientDto.class));
        }

        return clientDtos;
    }

    @Override
    @Transactional
    public void deleteClient(long id) {
        Optional<ClientEntity> checkEntity = clientsRepository.findById(id);
        if (checkEntity.isEmpty()) {
            log.error("Client with id {} not found", id);
            throw new EntityNotFoundException("Entity "+id+" does not exist");
        }
        List<OrderEntity> orderEntities = orderRepository.findAllByClient(checkEntity.get());
        log.info("Unlinking {} orders from client {}", orderEntities.size(), id);
        for (OrderEntity orderEntity : orderEntities) {
            orderEntity.setClient(null);
        }
        orderRepository.saveAll(orderEntities);

        clientsRepository.delete(checkEntity.get());
    }
}
