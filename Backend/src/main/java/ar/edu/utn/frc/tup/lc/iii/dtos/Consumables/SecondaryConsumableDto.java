package ar.edu.utn.frc.tup.lc.iii.dtos.Consumables;

import ar.edu.utn.frc.tup.lc.iii.entities.consumables.UnitMeasure;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SecondaryConsumableDto {

    private Long id;

    private String  type;

    private BigDecimal quantity;

    private UnitMeasure unit;

    private String  subType;
}
