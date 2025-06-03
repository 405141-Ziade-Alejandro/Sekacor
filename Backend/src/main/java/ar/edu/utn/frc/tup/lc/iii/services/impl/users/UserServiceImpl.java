package ar.edu.utn.frc.tup.lc.iii.services.impl.users;

import ar.edu.utn.frc.tup.lc.iii.dtos.users.LoginDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.users.UserDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.users.UserNewDto;
import ar.edu.utn.frc.tup.lc.iii.entities.users.UserEntity;
import ar.edu.utn.frc.tup.lc.iii.repositories.users.UserRepository;
import ar.edu.utn.frc.tup.lc.iii.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    @Override
    public List<UserDto> getAllUsers() {
        List<UserEntity> users = userRepository.findAll();

        List<UserDto> userDtos = new ArrayList<>(users.size());

        for (UserEntity user : users) {
            userDtos.add(modelMapper.map(user, UserDto.class));
        }
        return userDtos;
    }

    @Override
    @Transactional
    public UserDto postUser(UserNewDto dto) {
        UserEntity user = modelMapper.map(dto, UserEntity.class);

        user.setPassword("1234");

        UserEntity savedUser = userRepository.save(user);

        return modelMapper.map(savedUser, UserDto.class);
    }

    @Override
    @Transactional
    public UserDto putUser(UserDto dto) {
        Optional<UserEntity> check = userRepository.findById(dto.getId());

        if(check.isEmpty()) {
            throw new EntityNotFoundException("this user does not exist");
        }
        UserEntity user = modelMapper.map(dto, UserEntity.class);

        UserEntity updatedUser = userRepository.save(user);


        return modelMapper.map(updatedUser, UserDto.class);
    }

    @Override
    @Transactional
    public void deleteUser(long id) {
        Optional<UserEntity> check = userRepository.findById(id);
        if(check.isEmpty()) {
            throw new EntityNotFoundException("this user does not exist");
        }
        userRepository.deleteById(id);
    }

    @Override
    public UserDto logIn(LoginDto dto) {
        Optional<UserEntity> check = userRepository.findByNameAndPassword(dto.getUserName(), dto.getPassword());
        if(check.isEmpty()) {
            throw new EntityNotFoundException("this user does not exist");
        }

        return modelMapper.map(check.get(), UserDto.class);
    }
}
