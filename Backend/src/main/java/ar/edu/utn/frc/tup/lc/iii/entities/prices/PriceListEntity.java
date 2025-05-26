package ar.edu.utn.frc.tup.lc.iii.entities.prices;

import ar.edu.utn.frc.tup.lc.iii.entities.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.YearMonth;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = PriceListEntity.TABLE_NAME)
public class PriceListEntity extends BaseEntity {
    public static final String TABLE_NAME = "PRICE_LIST";

    @Column(name = "NOMBRE")
    private String name;

    @Column(name = "GANANCIA")
    private BigDecimal profit;

    @Column(name = "COMISION")
    private BigDecimal commission;

    @Column(name = "CORRALON")
    private BigDecimal corralon;

    @Enumerated(EnumType.STRING)
    private VolKm volKm;
}
