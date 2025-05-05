package ar.edu.utn.frc.tup.lc.iii.dtos.users;

import ar.edu.utn.frc.tup.lc.iii.entities.users.UserRoles;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;

    private String name;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private UserRoles role;
}
