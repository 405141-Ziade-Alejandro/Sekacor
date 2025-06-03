package ar.edu.utn.frc.tup.lc.iii.services.impl.prices;

import ar.edu.utn.frc.tup.lc.iii.client.UsdRestClient;
import ar.edu.utn.frc.tup.lc.iii.dtos.prices.ExchangeRateDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.prices.PriceListDto;
import ar.edu.utn.frc.tup.lc.iii.entities.prices.ExchangeRateEntity;
import ar.edu.utn.frc.tup.lc.iii.entities.prices.PriceListEntity;
import ar.edu.utn.frc.tup.lc.iii.repositories.prices.ExchangeRateRepository;
import ar.edu.utn.frc.tup.lc.iii.repositories.prices.PriceListRepository;
import ar.edu.utn.frc.tup.lc.iii.services.PriceListService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
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
        log.info("Getting price list by id: {}", id);
        Optional<PriceListEntity> check = priceListRepository.findById(id);

        if (check.isEmpty()) {
            log.error("Price list with id {} not found", id);
            throw new EntityNotFoundException("this entity does not exist");
        }

        return modelMapper.map(check.get(), PriceListDto.class);
    }

    /**
     * this use the rest client of usdRestClient
     * to save the value the dolar on the database
     * this will be useful to when we have to calculate the
     * prices of the tanks
     */
    @Override
    @Transactional
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

        log.info("Getting all price lists");
        for (PriceListEntity entity : priceListEntitiesList) {

            priceListDtoList.add(modelMapper.map(entity, PriceListDto.class));
        }

        return priceListDtoList;
    }

    @Override
    @Transactional
    public PriceListDto postList(PriceListDto dto) {
        PriceListEntity priceListEntity = modelMapper.map(dto, PriceListEntity.class);
        PriceListEntity saved = priceListRepository.save(priceListEntity);

        return modelMapper.map(saved, PriceListDto.class);
    }

    @Override
    @Transactional
    public void deleteList(long id) {
        Optional<PriceListEntity> check = priceListRepository.findById(id);
        if (check.isEmpty()) {
            log.error("Price list with id {} not found", id);
            throw new EntityNotFoundException("there were no price list with id " + id);
        }
        priceListRepository.deleteById(id);
    }

    @Override
    public ExchangeRateDto getExchangeRateLatest() {
        Optional<ExchangeRateEntity> check = exchangeRateRepository.findTopByOrderByIdDesc();
        if (check.isEmpty()) {
            throw new EntityNotFoundException("there were no exchange rate latest");
        }

        return modelMapper.map(check.get(), ExchangeRateDto.class);
    }
}
