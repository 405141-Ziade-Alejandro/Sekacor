package ar.edu.utn.frc.tup.lc.iii.rest;

import ar.edu.utn.frc.tup.lc.iii.client.UsdRestClient;
import ar.edu.utn.frc.tup.lc.iii.dtos.client.UsdValueRecord;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatcher;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class UsdRestClientTest {

    @MockBean
    private RestTemplate restTemplate;

    @SpyBean
    private UsdRestClient usdRestClient;

    private UsdValueRecord mockRecord;

    @BeforeEach
    public void setUp() {
        mockRecord = new UsdValueRecord(
                "peso",
                "casa central",
                "dolar Off",
                800,
                850,
                "fecha"
        );
    }

    @Test
    public void fetchSuccessfully() {
        ResponseEntity<UsdValueRecord> fakeResponse = new ResponseEntity<>(mockRecord, HttpStatus.OK);

        Mockito.when(restTemplate.getForEntity(
                ArgumentMatchers.eq("https://dolarapi.com/v1/dolares/oficial"),
                ArgumentMatchers.eq(UsdValueRecord.class)
        )).thenReturn(fakeResponse);

        BigDecimal usdSalePrice =  usdRestClient.getCurrentUsdSalePrice();

        assertNotNull(usdSalePrice);
        assertEquals(BigDecimal.valueOf(850),usdSalePrice);
    }
}
