package ar.edu.utn.frc.tup.lc.iii.client;

import ar.edu.utn.frc.tup.lc.iii.dtos.client.UsdValueRecord;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class UsdRestClient {

    private final RestTemplate restTemplate;

    private static final String urlApi = "https://dolarapi.com/v1/dolares/oficial";

    public ResponseEntity<UsdValueRecord> fetchUsdValue() {
        return restTemplate.getForEntity(urlApi, UsdValueRecord.class);
    }

    public BigDecimal getCurrentUsdSalePrice() {
        ResponseEntity<UsdValueRecord> response = fetchUsdValue();


        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new RuntimeException("Error al obtener el valor");
        }

        return new BigDecimal(response.getBody().venta());
    }
}
