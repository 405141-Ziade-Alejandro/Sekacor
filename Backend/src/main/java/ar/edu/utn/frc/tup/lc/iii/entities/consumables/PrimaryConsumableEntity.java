package ar.edu.utn.frc.tup.lc.iii.entities.consumables;

import ar.edu.utn.frc.tup.lc.iii.entities.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = PrimaryConsumableEntity.TABLE_NAME)
public class PrimaryConsumableEntity extends BaseEntity {

    public static final String TABLE_NAME = "INSUMO_PRIMARIO";

    @Column(name = "TIPO")
    @Enumerated(EnumType.STRING)
    private ConsumableType type;

    @Column(name = "CANTIDAD",precision = 10,scale = 2)
    private BigDecimal quantity;

    @Column(name = "UNIDAD")
    @Enumerated(EnumType.STRING)
    private UnitMeasure unit;

    @Column(name = "SUB_TIPO")
    @Enumerated(EnumType.STRING)
    private ConsumableSubType subType;
}
