package pl.polsl.student.converterservice.controllers;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.student.converterservice.services.ConverterServiceImpl;
import pl.polsl.student.converterservice.validation.ValidRoman;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Validated
@RequiredArgsConstructor
@RequestMapping("/converter")
@RestController
public class ConverterController {

    private final ConverterServiceImpl converterService;

    @ApiOperation("Convert decimal number to roman representation.")
    @GetMapping("/toRoman")
    public ResponseEntity<String> toRoman(@RequestParam @Min(0) @Max(3999) Integer decimal) {
        return ResponseEntity.ok(converterService.convertToRoman(decimal));
    }

    @ApiOperation("Convert roman number to decimal representation.")
    @GetMapping("/toDecimal")
    public ResponseEntity<Integer> toDecimal(@RequestParam @ValidRoman String roman) {
        return ResponseEntity.ok(converterService.convertToDecimal(roman));
    }
}
