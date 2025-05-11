package ar.edu.utn.frc.tup.lc.iii.dtos.orders;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewOrderDto {
    private long clientId;

    private List<OrderDetailDto> orderDetails;

    private BigDecimal totalPrice;
}
