package ar.edu.utn.frc.tup.lc.iii.dtos.Consumables;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateConsumableDto {

    private Long consumableId;

    private BigDecimal quantity;
}
