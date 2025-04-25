package ar.edu.utn.frc.tup.lc.iii.repositories.consumables;

import ar.edu.utn.frc.tup.lc.iii.entities.consumables.SecondaryConsumableEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SecondaryConsumableRepository extends JpaRepository<SecondaryConsumableEntity,Long> {

}
