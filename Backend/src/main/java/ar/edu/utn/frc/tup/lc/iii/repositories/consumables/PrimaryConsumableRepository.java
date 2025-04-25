package ar.edu.utn.frc.tup.lc.iii.repositories.consumables;

import ar.edu.utn.frc.tup.lc.iii.entities.consumables.ConsumableSubType;
import ar.edu.utn.frc.tup.lc.iii.entities.consumables.ConsumableType;
import ar.edu.utn.frc.tup.lc.iii.entities.consumables.PrimaryConsumableEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PrimaryConsumableRepository extends JpaRepository<PrimaryConsumableEntity, Long> {
    Optional<PrimaryConsumableEntity> findByTypeAndSubType(ConsumableType type, ConsumableSubType subType);
}
