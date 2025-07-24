package ar.edu.utn.frc.tup.lc.iii.entities.orders;

import ar.edu.utn.frc.tup.lc.iii.entities.BaseEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.clients.ClientEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = OrderEntity.TABLE_NAME)
public class OrderEntity extends BaseEntity {
    public static final String TABLE_NAME = "PEDIDO";

    @ManyToOne(optional = true)
    @JoinColumn(name = "CLIENTE_ID")
    private ClientEntity client;

    @Column(name = "FECHA_ENTREGA")
    private LocalDateTime orderDate;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetailsEntity> details;

    @Column(name = "PRECIO_TOTAL",precision = 10,scale = 2)
    private BigDecimal totalPrice;

    @Enumerated(EnumType.STRING)
    private OrderState state;
}
