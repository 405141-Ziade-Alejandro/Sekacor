package ar.edu.utn.frc.tup.lc.iii.dtos.clients;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewClientDto {
    private String name;
    private String telephone;
    private long  priceListId;
    private String direction;
}
