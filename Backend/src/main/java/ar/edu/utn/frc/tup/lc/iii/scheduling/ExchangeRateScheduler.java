package ar.edu.utn.frc.tup.lc.iii.scheduling;

import ar.edu.utn.frc.tup.lc.iii.services.PriceListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * this component manage the saving of the usd value
 * at the start of the month.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class ExchangeRateScheduler {

    private final PriceListService priceListService;

    /**
     * using the @Scheduled i set it up so that at the 3am
     * on the first day of every month
     * the method saveUsdRateFromExternalApi is excecuted
     */
    @Scheduled(cron = "0 0 3 1 * *", zone = "America/Argentina/Buenos_Aires")
    public void fetchAndStoreUsdRate() {
        log.info("Ejecutando tarea programada para guardar el USD: " + LocalDateTime.now());
        priceListService.saveUsdRateFromExternalApi();
    }
}
