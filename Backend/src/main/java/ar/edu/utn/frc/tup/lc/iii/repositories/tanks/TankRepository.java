package ar.edu.utn.frc.tup.lc.iii.repositories.tanks;

import ar.edu.utn.frc.tup.lc.iii.entities.tanks.TankEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TankRepository extends JpaRepository<TankEntity, Long> {
}
