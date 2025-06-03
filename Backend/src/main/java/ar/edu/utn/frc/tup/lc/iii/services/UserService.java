package ar.edu.utn.frc.tup.lc.iii.services;

import ar.edu.utn.frc.tup.lc.iii.dtos.users.LoginDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.users.UserDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.users.UserNewDto;

import java.util.List;

public interface UserService {
    List<UserDto> getAllUsers();

    UserDto postUser(UserNewDto dto);

    UserDto putUser(UserDto dto);

    void deleteUser(long id);

    UserDto logIn(LoginDto dto);
}
