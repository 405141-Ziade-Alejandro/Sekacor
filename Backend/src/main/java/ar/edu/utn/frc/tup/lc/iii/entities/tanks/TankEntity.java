package ar.edu.utn.frc.tup.lc.iii.entities.tanks;

import ar.edu.utn.frc.tup.lc.iii.entities.BaseEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.users.UserEntity;
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
@Table(name = TankEntity.TABLE_NAME)
public class TankEntity extends BaseEntity {

    public static final String TABLE_NAME = "TANQUE";

    @ManyToOne
    @JoinColumn(name = "TANK_TYPE_ID")
    private TankTypeEntity type;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private UserEntity user;

    @Enumerated(EnumType.STRING)
    private Cuality cuality;
}
