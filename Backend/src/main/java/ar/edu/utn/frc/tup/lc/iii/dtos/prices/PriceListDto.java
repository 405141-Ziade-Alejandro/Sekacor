package ar.edu.utn.frc.tup.lc.iii.dtos.prices;

import ar.edu.utn.frc.tup.lc.iii.entities.prices.VolKm;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PriceListDto {

    private Long id;

    private String name;


    private BigDecimal profit;

    private BigDecimal commission;

    private BigDecimal corralon;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private VolKm volKm;
}
