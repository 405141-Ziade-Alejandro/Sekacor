package ar.edu.utn.frc.tup.lc.iii.services;

import ar.edu.utn.frc.tup.lc.iii.dtos.prices.ExchangeRateDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.prices.PriceListDto;

import java.util.List;

public interface PriceListService {
    

    PriceListDto getById(Long id);

    void saveUsdRateFromExternalApi();

    List<PriceListDto> getAllLists();

    PriceListDto postList(PriceListDto dto);

    void deleteList(long id);

    ExchangeRateDto getExchangeRateLatest();
}
