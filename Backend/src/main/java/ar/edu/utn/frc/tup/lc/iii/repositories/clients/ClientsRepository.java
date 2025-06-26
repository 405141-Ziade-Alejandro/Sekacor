package ar.edu.utn.frc.tup.lc.iii.repositories.clients;

import ar.edu.utn.frc.tup.lc.iii.entities.clients.ClientEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.prices.PriceListEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientsRepository extends JpaRepository<ClientEntity,Long> {
    List<ClientEntity> findAllByPriceList(PriceListEntity priceList);
}
