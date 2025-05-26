package ar.edu.utn.frc.tup.lc.iii.repositories.orders;

import ar.edu.utn.frc.tup.lc.iii.entities.orders.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity,Long> {
}
