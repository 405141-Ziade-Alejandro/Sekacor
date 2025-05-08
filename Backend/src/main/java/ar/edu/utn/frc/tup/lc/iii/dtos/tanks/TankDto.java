package ar.edu.utn.frc.tup.lc.iii.dtos.tanks;

import ar.edu.utn.frc.tup.lc.iii.entities.tanks.Quality;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TankDto {

    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdDate;

    private long typeId;

    private long userId;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Quality quality;
}
