package ar.edu.utn.frc.tup.lc.iii.services;

import ar.edu.utn.frc.tup.lc.iii.dtos.clients.ClientDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.clients.NewClientDto;

import java.util.List;

public interface ClientService {
    ClientDto postNewClient(NewClientDto dto);

    ClientDto putClient(ClientDto dto);

    List<ClientDto> getAllClients();

    void deleteClient(long id);
}
