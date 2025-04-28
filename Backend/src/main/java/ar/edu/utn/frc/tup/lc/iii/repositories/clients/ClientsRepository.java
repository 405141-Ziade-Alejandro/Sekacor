package ar.edu.utn.frc.tup.lc.iii.repositories.clients;

import ar.edu.utn.frc.tup.lc.iii.entities.clients.ClientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientsRepository extends JpaRepository<ClientEntity,Long> {
}
