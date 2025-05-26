package ar.edu.utn.frc.tup.lc.iii.entities.tanks;

import ar.edu.utn.frc.tup.lc.iii.entities.BaseEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.consumables.ConsumableSubType;
import jakarta.persistence.*;
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

    public static final String TABLE_NAME = "TIPO_TANQUE";

    @Column(name = "TIPO", nullable = false)
    private String type;

    @Column(name = "CAPA")
    @Enumerated(EnumType.STRING)
    private Cover cover;

    @Column(name = "CANTIDAD")
    private BigDecimal quantity;

    @Column(precision = 10,scale = 2, name = "PLASTICO_NEGRO")
    private BigDecimal plasticBlack;

    @Column(precision = 10,scale = 2, name = "PLASTICO_COLOR")
    private BigDecimal plasticColor;

    @Column(precision = 10,scale = 2, name = "COSTO")
    private BigDecimal cost;

    @Column(precision = 10,scale = 2, name = "VOLUMEN_100_KM")
    private BigDecimal vol100;

    @Column(precision = 10,scale = 2, name = "VOLUMENT_200_KM")
    private BigDecimal vol200;

    @Column(name = "TAPA_TIPO")
    @Enumerated(EnumType.STRING)
    private ConsumableSubType coverType;

    @Column(name = "TORNILLO")
    private Integer screws;

    @Column(name = "TORNILLO_GRANDE")
    private Integer bigScrews;

    @Column(name = "TEE")
    private boolean tee;

    @Column(name = "TIPO_STICKER")
    @Enumerated(EnumType.STRING)
    private ConsumableSubType sticker;

    /**
     * en la fabrica tienen dos tipos de stock
     * primera son buena calidad y son para los clientes regulares
     */
    @Column(name = "INVENTARIO_PRIMERA")
    private Long stock1;

    /**
     * en la fabrica tienen dos tipos de stock
     * segunda tienen alguna imprefeccion y son mas baratos
     */
    @Column(name = "INVENTARIO_SEGUNDA")
    private Long stock2;
}
