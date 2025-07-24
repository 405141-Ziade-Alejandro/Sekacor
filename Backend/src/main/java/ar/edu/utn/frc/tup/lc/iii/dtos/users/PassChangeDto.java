package ar.edu.utn.frc.tup.lc.iii.dtos.users;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PassChangeDto {
    private long userId;
    private String oldPassword;
    private String newPassword;
}
