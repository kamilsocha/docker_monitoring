package pl.polsl.student.converterservice;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.polsl.student.converterservice.services.ConverterServiceImpl;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
public class ConverterServiceUnitTests {

    @InjectMocks
    private ConverterServiceImpl converterService;

    @Test
    public void shouldConvertToDecimal() {
        var roman = "XX";
        var res = converterService.convertToDecimal(roman);
        assertEquals(20, res);
    }

    @Test
    public void shouldConvertToRoman() {
        var decimal = 20;
        var res = converterService.convertToRoman(decimal);
        assertEquals("XX", res);
    }
}
