package ar.edu.utn.frc.tup.lc.iii.entities.tanks;

import ar.edu.utn.frc.tup.lc.iii.entities.BaseEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.consumables.ConsumableSubType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = TankTypeEntity.TABLE_NAME)
public class TankTypeEntity extends BaseEntity {

    public static final String TABLE_NAME = "TANQUE";

    @Column(name = "TIPO", nullable = false)
    private String type;

    @Column(name = "CAPA")
    private Cover cover;

    @Column(name = "CANTIDAD")
    private BigDecimal quantity;

    @Column(precision = 10,scale = 2, name = "PLASTICO_NEGRO")
    private BigDecimal plasticBlack;

    @Column(precision = 10,scale = 2, name = "PLASTICO_COLOR")
    private BigDecimal plasticColor;

    @Column(precision = 10,scale = 2, name = "COSTO")
    private BigDecimal cost;

    @Column(name = "TAPA_TIPO")
    private ConsumableSubType coverType;



    @Column(name = "TORNILLO")
    private Integer screws;

    @Column(name = "TORNILLO_GRANDE")
    private Integer bigScrews;

    @Column(name = "TEE")
    private boolean tee;

    @Column(name = "O_RING")
    private ConsumableSubType oRing;

    @Column(name = "TIPO_STICKER")
    private ConsumableSubType sticker;

    @Column(name = "TAMANO_RAMAL")
    private ConsumableSubType Ramal;

    @Column(name = "INVENTARIO")
    private Long stock;
}
