package ar.edu.utn.frc.tup.lc.iii.dtos.tanks;

import ar.edu.utn.frc.tup.lc.iii.entities.consumables.ConsumableSubType;
import ar.edu.utn.frc.tup.lc.iii.entities.tanks.Cover;
import ar.edu.utn.frc.tup.lc.iii.entities.tanks.Quality;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;


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

    //to do: make two types of stocks (stock 1 and stock 2)
    private Long stock1;

    private Long stock2;
}
