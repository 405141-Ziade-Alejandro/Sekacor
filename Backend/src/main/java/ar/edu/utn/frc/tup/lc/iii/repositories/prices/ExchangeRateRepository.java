package ar.edu.utn.frc.tup.lc.iii.repositories.prices;

import ar.edu.utn.frc.tup.lc.iii.entities.prices.ExchangeRateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.YearMonth;
import java.util.Optional;

@Repository
public interface ExchangeRateRepository extends JpaRepository<ExchangeRateEntity,Long> {
    Optional<ExchangeRateEntity> findByYearMonth(YearMonth month);
    Optional<ExchangeRateEntity> findTopByOrderByIdDesc();
}
