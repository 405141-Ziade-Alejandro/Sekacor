package ar.edu.utn.frc.tup.lc.iii.controllers.clients;

import ar.edu.utn.frc.tup.lc.iii.dtos.clients.ClientDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.clients.NewClientDto;
import ar.edu.utn.frc.tup.lc.iii.services.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Clients")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ClientController {
    private final ClientService clientService;

    @GetMapping("")
    public ResponseEntity<List<ClientDto>> getAllClients() {
        return ResponseEntity.ok(clientService.getAllClients());
    }

    @PostMapping("")
    public ResponseEntity<ClientDto> postNewClient(@RequestBody NewClientDto dto) {
        return ResponseEntity.ok(clientService.postNewClient(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable long id) {
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("")
    public ResponseEntity<ClientDto> putClient(@RequestBody ClientDto dto) {
        return ResponseEntity.ok(clientService.putClient(dto));
    }
}
