package ar.edu.utn.frc.tup.lc.iii.rest;

import ar.edu.utn.frc.tup.lc.iii.client.UsdRestClient;
import ar.edu.utn.frc.tup.lc.iii.dtos.client.UsdValueRecord;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class UsdRestClientTestIT {

    @Autowired
    private UsdRestClient usdRestClient;

    @BeforeEach
    public void setUp() {

    }

    @Test
    public void test() {
        ResponseEntity<UsdValueRecord> valueRecordResponseEntity = usdRestClient.fetchUsdValue();

        assertNotNull(valueRecordResponseEntity.getBody());
    }
}
