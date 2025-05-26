package ar.edu.utn.frc.tup.lc.iii.dtos.users;

import ar.edu.utn.frc.tup.lc.iii.entities.users.UserRoles;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserNewDto {
    private String name;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private UserRoles role;
}
