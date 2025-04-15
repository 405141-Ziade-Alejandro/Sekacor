package ar.edu.utn.frc.tup.lc.iii.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public class DummyDto {
    @Schema(
            title = "Email to logged in",
            description ="the Player Email",
            example = "email@gmail.com",
            nullable = false)
    @NotNull(message = "email can't be null")
    @JsonProperty("user_name")
    private String Email;
}
