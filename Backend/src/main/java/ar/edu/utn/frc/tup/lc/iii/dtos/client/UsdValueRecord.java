package ar.edu.utn.frc.tup.lc.iii.dtos.client;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.sql.Timestamp;

/**
 * this is a record that holds the info thatt the
 * dolar api brings when called
 * @param moneda
 * @param casa
 * @param nombre
 * @param compra
 * @param venta
 * @param fechaActualizacion
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public record UsdValueRecord
        (String moneda,
         String casa,
         String nombre,
         int compra,
         int venta,
         String fechaActualizacion) {
}
