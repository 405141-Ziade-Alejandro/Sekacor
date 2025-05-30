package ar.edu.utn.frc.tup.lc.iii.repositories.users;

import ar.edu.utn.frc.tup.lc.iii.entities.users.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
}
