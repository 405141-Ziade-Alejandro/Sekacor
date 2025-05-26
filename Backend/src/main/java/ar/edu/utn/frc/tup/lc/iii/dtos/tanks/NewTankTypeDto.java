package ar.edu.utn.frc.tup.lc.iii.dtos.tanks;

import ar.edu.utn.frc.tup.lc.iii.entities.consumables.ConsumableSubType;
import ar.edu.utn.frc.tup.lc.iii.entities.tanks.Cover;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@JsonIgnoreProperties(ignoreUnknown = true)
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

    private ConsumableSubType sticker;

    private BigDecimal vol100;

    private BigDecimal vol200;

    private Long stock1;

    private Long stock2;
}
