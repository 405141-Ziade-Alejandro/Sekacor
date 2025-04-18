package ar.edu.utn.frc.tup.lc.iii.entities.tanks;

import ar.edu.utn.frc.tup.lc.iii.entities.BaseEntity;
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
@Table(name = TankEntity.TABLE_NAME)
public class TankEntity extends BaseEntity {

    public static final String TABLE_NAME = "TANQUE";

    @Column(name = "TIPO")
    private String type;

    @Column(name = "CANTIDAD")
    private BigDecimal quantity;

    @Column(precision = 10,scale = 2, name = "PLASTICO_NEGRO")
    private BigDecimal plasticBlack;

    @Column(precision = 10,scale = 2, name = "PLASTICO_COLOR")
    private BigDecimal plasticColor;

    @Column(precision = 10,scale = 2, name = "PLASTICO_COLOR")
    private BigDecimal plasticVirgin;

    @Column(name = "TAPA_TIPO")
    private String coverType;

    @Column(name = "USUARIO")
    //todo: luego hay que cambiar esto por una entidad usuario pero luego cuando tenga que hacer eso en el sprint
    private String user;

    @Column(name = "CALIDAD")
    private Quality quality;
}
