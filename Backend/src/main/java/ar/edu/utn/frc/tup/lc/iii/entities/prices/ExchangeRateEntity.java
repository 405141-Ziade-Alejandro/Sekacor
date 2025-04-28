package ar.edu.utn.frc.tup.lc.iii.entities.prices;

import ar.edu.utn.frc.tup.lc.iii.entities.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.expression.spel.ast.NullLiteral;

import java.math.BigDecimal;
import java.time.YearMonth;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = ExchangeRateEntity.TABLE_NAME)
public class ExchangeRateEntity extends BaseEntity {
    public static final String TABLE_NAME = "VALOR_DOLAR";

    @Column(name = "MES_AÑO", nullable = false, unique = true)
    private YearMonth yearMonth;

    @Column(name = "PRECIO", precision = 10, scale = 4, nullable = false)
    private BigDecimal usdValue;

    @PrePersist
    public void setMonthIfNotSet() {
        if (yearMonth == null) {
            yearMonth = YearMonth.now();
        }
    }
}
