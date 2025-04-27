package ar.edu.utn.frc.tup.lc.iii.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

@Configuration
public class RestClientConfig {

    /**
     * Timeout duration in milliseconds for both connection and read operations.
     * This value is applied to all {@link RestTemplate} instances created by this configuration.
     */
    private  static final int TIME_OUT= 1000;

    /**
     * Creates a {@link RestTemplate} bean configured with custom connection and read timeouts.
     * This method leverages a {@link RestTemplateBuilder} to construct and configure the {@link RestTemplate}.
     *
     * @param builder a {@link RestTemplateBuilder} provided by Spring to simplify the creation and customization of {@link RestTemplate}.
     * @return a {@link RestTemplate} instance with the specified timeouts.
     */
    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder
                .setConnectTimeout(Duration.ofMillis(TIME_OUT))
                .setReadTimeout(Duration.ofMillis(TIME_OUT))
                .build();
    }
}
