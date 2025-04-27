package ar.edu.utn.frc.tup.lc.iii.services.impl.prices;

import ar.edu.utn.frc.tup.lc.iii.client.UsdRestClient;
import ar.edu.utn.frc.tup.lc.iii.dtos.prices.PriceListDto;
import ar.edu.utn.frc.tup.lc.iii.entities.prices.ExchangeRateEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.prices.PriceListEntity;
import ar.edu.utn.frc.tup.lc.iii.repositories.prices.ExchangeRateRepository;
import ar.edu.utn.frc.tup.lc.iii.repositories.prices.PriceListRepository;
import ar.edu.utn.frc.tup.lc.iii.services.PriceListService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PriceListServiceImpl implements PriceListService {

    private final ExchangeRateRepository exchangeRateRepository;

    private final PriceListRepository priceListRepository;

    private final UsdRestClient usdRestClient;

    private final ModelMapper modelMapper;


    @Override
    public PriceListDto getById(Long id) {
        Optional<PriceListEntity> check = priceListRepository.findById(id);

        if (check.isEmpty()) {
            throw new EntityNotFoundException("this entity does not exist");
        }

        return modelMapper.map(check.get(), PriceListDto.class);
    }

    @Override
    public void saveUsdRateFromExternalApi() {

        BigDecimal usdValue = usdRestClient.getCurrentUsdSalePrice();

        ExchangeRateEntity rateEntity = new ExchangeRateEntity();
        rateEntity.setMonthIfNotSet();
        rateEntity.setUsdValue(usdValue);

        log.info("Saving usd sale price {}", usdValue);

        exchangeRateRepository.save(rateEntity);
    }

    @Override
    public List<PriceListDto> getAllLists() {
        List<PriceListEntity> priceListEntitiesList = priceListRepository.findAll();

        List<PriceListDto> priceListDtoList = new ArrayList<>(priceListEntitiesList.size());

        for (PriceListEntity entity : priceListEntitiesList) {
            priceListDtoList.add(modelMapper.map(entity, PriceListDto.class));
        }

        return priceListDtoList;
    }
}
