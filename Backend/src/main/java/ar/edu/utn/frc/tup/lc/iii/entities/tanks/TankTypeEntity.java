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

    @Column(name = "TAPA_TIPO")
    @Enumerated(EnumType.STRING)
    private ConsumableSubType coverType;

    @Column(name = "TORNILLO")
    private Integer screws;

    @Column(name = "TORNILLO_GRANDE")
    private Integer bigScrews;

    @Column(name = "TEE")
    private boolean tee;

    @Column(name = "O_RING") //todo: el oso me informo que no todo tanque consume el mismo input, hay que sacar esto o cambiar la logica de esto
    @Enumerated(EnumType.STRING)
    private ConsumableSubType oRing;

    @Column(name = "TIPO_STICKER")
    @Enumerated(EnumType.STRING)
    private ConsumableSubType sticker;

    @Column(name = "TAMANO_RAMAL")
    @Enumerated(EnumType.STRING)
    private ConsumableSubType Ramal;

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
