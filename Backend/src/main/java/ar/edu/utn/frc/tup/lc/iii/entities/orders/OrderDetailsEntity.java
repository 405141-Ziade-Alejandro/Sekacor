package ar.edu.utn.frc.tup.lc.iii.entities.orders;

import ar.edu.utn.frc.tup.lc.iii.entities.BaseEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.prices.PriceListEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.tanks.TankTypeEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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
@Table(name = OrderDetailsEntity.TABLE_NAME)
public class OrderDetailsEntity extends BaseEntity {
    public static final String TABLE_NAME = "PEDIDO_DETALLE";

    @ManyToOne
    @JoinColumn(name = "TIPO_TANQUE_ID")
    private TankTypeEntity tankType;

    private int quantity;

    private BigDecimal price;
}
