package ar.edu.utn.frc.tup.lc.iii.dtos.Consumables;

import ar.edu.utn.frc.tup.lc.iii.entities.consumables.ConsumableSubType;
import ar.edu.utn.frc.tup.lc.iii.entities.consumables.ConsumableType;
import ar.edu.utn.frc.tup.lc.iii.entities.consumables.UnitMeasure;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PrimaryConsumableDto {

    private Long id;

    @JsonFormat(shape= JsonFormat.Shape.STRING)
    private ConsumableType type;

    private BigDecimal quantity;

    @JsonFormat(shape= JsonFormat.Shape.STRING)
    private UnitMeasure unit;

    @JsonFormat(shape= JsonFormat.Shape.STRING)
    private ConsumableSubType subType;
}
