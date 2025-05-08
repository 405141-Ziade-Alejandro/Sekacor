package ar.edu.utn.frc.tup.lc.iii.entities.clients;

import ar.edu.utn.frc.tup.lc.iii.entities.BaseEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.prices.ExchangeRateEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.prices.PriceListEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = ClientEntity.TABLE_NAME)
public class ClientEntity extends BaseEntity {
    public static final String TABLE_NAME = "CLIENTE";

    @Column(name = "NOMBRE")
    private String name;

    @Column(name = "TELEFONO")
    private String telephone;

    @ManyToOne
    @JoinColumn(name = "LISTA_PRECIO_ID")
    private PriceListEntity priceList;


}
