package ar.edu.utn.frc.tup.lc.iii.dtos.client;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.sql.Timestamp;

@JsonIgnoreProperties(ignoreUnknown = true)
public record UsdValueRecord
        (String moneda,
         String casa,
         String nombre,
         int compra,
         int venta,
         String fechaActualizacion) {
}
