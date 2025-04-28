package ar.edu.utn.frc.tup.lc.iii.repositories.prices;

import ar.edu.utn.frc.tup.lc.iii.entities.prices.PriceListEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PriceListRepository extends JpaRepository<PriceListEntity,Long> {
}
