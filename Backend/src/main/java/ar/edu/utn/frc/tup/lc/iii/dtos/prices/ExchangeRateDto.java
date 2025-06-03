package ar.edu.utn.frc.tup.lc.iii.dtos.prices;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.YearMonth;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExchangeRateDto {
    private YearMonth yearMonth;

    private BigDecimal usdValue;
}
