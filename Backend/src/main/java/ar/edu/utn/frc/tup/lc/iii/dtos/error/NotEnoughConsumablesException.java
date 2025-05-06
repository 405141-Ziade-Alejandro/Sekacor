package ar.edu.utn.frc.tup.lc.iii.dtos.error;

import ar.edu.utn.frc.tup.lc.iii.dtos.tanks.MissingConsumableDto;
import lombok.Getter;

import java.util.List;

@Getter
public class NotEnoughConsumablesException extends RuntimeException{
    private final List<MissingConsumableDto> missingConsumables;

    public NotEnoughConsumablesException(List<MissingConsumableDto> missingConsumables) {
        super("Not enough consumables");
        this.missingConsumables = missingConsumables;
    }

}
