package ar.edu.utn.frc.tup.lc.iii.dtos.tanks;

import ar.edu.utn.frc.tup.lc.iii.entities.consumables.ConsumableSubType;
import ar.edu.utn.frc.tup.lc.iii.entities.tanks.Cover;


import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TankTypeDto {


    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime lastUpdatedAt;

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
