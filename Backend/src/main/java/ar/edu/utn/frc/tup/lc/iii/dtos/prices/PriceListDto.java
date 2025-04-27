package ar.edu.utn.frc.tup.lc.iii.dtos.prices;

import jakarta.persistence.Column;
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


    private BigDecimal modifier;
}
