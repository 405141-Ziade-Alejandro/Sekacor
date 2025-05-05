package ar.edu.utn.frc.tup.lc.iii.entities.users;

import ar.edu.utn.frc.tup.lc.iii.entities.BaseEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.tanks.TankTypeEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = UserEntity.TABLE_NAME)
public class UserEntity extends BaseEntity {
    public static final String TABLE_NAME = "USUARIO";

    @Column(name = "NOMBRE")
    private String name;

    @Column(name = "CONTRASEÑA")
    private String password;

    @Enumerated(EnumType.STRING)
    private UserRoles role;
}
