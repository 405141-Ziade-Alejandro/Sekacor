package ar.edu.utn.frc.tup.lc.iii.repositories.orders;

import ar.edu.utn.frc.tup.lc.iii.entities.clients.ClientEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.orders.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity,Long> {
    List<OrderEntity> findAllByClient(ClientEntity client);
    List<OrderEntity> findAllByOrderDateBetween(LocalDateTime startDate, LocalDateTime endDate);
}
