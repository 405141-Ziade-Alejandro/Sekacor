package ar.edu.utn.frc.tup.lc.iii.repositories.tanks;

import ar.edu.utn.frc.tup.lc.iii.entities.tanks.TankTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TankTypeRepository extends JpaRepository<TankTypeEntity,Long> {
    Optional<TankTypeEntity> findByType(String type);
}
