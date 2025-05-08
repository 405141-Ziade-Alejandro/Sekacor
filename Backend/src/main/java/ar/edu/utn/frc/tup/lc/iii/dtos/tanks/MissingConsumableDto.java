package ar.edu.utn.frc.tup.lc.iii.dtos.tanks;

import ar.edu.utn.frc.tup.lc.iii.entities.consumables.ConsumableSubType;
import ar.edu.utn.frc.tup.lc.iii.entities.consumables.ConsumableType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MissingConsumableDto {
    private ConsumableType type;
    private ConsumableSubType subType;
    private BigDecimal required;
    private BigDecimal available;
}
