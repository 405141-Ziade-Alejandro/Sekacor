package ar.edu.utn.frc.tup.lc.iii.controllers;

import ar.edu.utn.frc.tup.lc.iii.dtos.DummyDto;
import ar.edu.utn.frc.tup.lc.iii.models.Dummy;
import ar.edu.utn.frc.tup.lc.iii.services.DummyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dummy")
public class DummyController {

    @Autowired
    private DummyService dummyService;

    @Operation(
            summary = "check the health of the app",
            description = "if the app is alive it returns hello world"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "successful operation",
                    content = @Content(
                            schema = @Schema(implementation = String.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "internal server error"
            )
    })
    @GetMapping("/{id}")
    public ResponseEntity<DummyDto> getDummy(@PathVariable Long id) {
        Dummy dummy = dummyService.getDummy(id);
        return null;
    }

    @GetMapping("")
    public ResponseEntity<List<DummyDto>> getDummyList() {
        List<Dummy> dummyList = dummyService.getDummysList();
        return null;
    }

    @PostMapping("")
    public ResponseEntity<DummyDto> createDummy(DummyDto dto) {
        Dummy dummy = dummyService.createDummy(null);
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<DummyDto> updateDummy(@RequestBody @Valid DummyDto dto, @PathVariable Long id) {
        Dummy dummy = dummyService.updateDummy(dto,id);
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DummyDto> deleteDummy(@PathVariable Long id) {
        dummyService.deleteDummy(id);
        return null;
    }

}
