package ar.edu.utn.frc.tup.lc.iii.dtos.tanks;

import ar.edu.utn.frc.tup.lc.iii.entities.consumables.ConsumableSubType;
import ar.edu.utn.frc.tup.lc.iii.entities.tanks.Cover;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * this is the same as TankTypeDto
 * but without the id,createDate and lastUpdatedDate
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewTankTypeDto {

    private String type;

    private Cover cover;

    private BigDecimal quantity;

    private BigDecimal plasticBlack;

    private BigDecimal plasticColor;

    private BigDecimal cost;

    private ConsumableSubType coverType;

    private Integer screws;

    private Integer bigScrews;

    private boolean tee;

    private ConsumableSubType oRing;

    private ConsumableSubType sticker;

    private ConsumableSubType Ramal;

    private Long stock1;

    private Long stock2;
}
