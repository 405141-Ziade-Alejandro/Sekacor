package ar.edu.utn.frc.tup.lc.iii.controllers.users;

import ar.edu.utn.frc.tup.lc.iii.dtos.users.LoginDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.users.PassChangeDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.users.UserDto;
import ar.edu.utn.frc.tup.lc.iii.dtos.users.UserNewDto;
import ar.edu.utn.frc.tup.lc.iii.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("")
    public ResponseEntity<UserDto> post(@RequestBody UserNewDto dto) {
        return ResponseEntity.ok(userService.postUser(dto));
    }

    @PutMapping("")
    public ResponseEntity<UserDto> put(@RequestBody UserDto dto) {
        return ResponseEntity.ok(userService.putUser(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody LoginDto dto) {
        return ResponseEntity.ok(userService.logIn(dto));
    }

    @PutMapping("/pass-change")
    public ResponseEntity<Boolean> changePassword(@RequestBody PassChangeDto dto) {
        return ResponseEntity.ok(userService.changePass(dto));
    }
}
