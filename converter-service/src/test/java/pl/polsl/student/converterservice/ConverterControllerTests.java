package pl.polsl.student.converterservice;


import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import pl.polsl.student.converterservice.controllers.ConverterController;

import javax.validation.ConstraintViolationException;

import static org.junit.jupiter.api.Assertions.assertThrows;

@ActiveProfiles("test")
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT,
        properties = {"/bootstrap.yml", "/application.yml"},
        classes = {ConverterServiceApplication.class})
public class ConverterControllerTests {

    @Autowired
    private ConverterController converterController;

    @Test
    public void shouldToRomanThrowConstraintViolation() {
        assertThrows(ConstraintViolationException.class, () -> {
            converterController.toRoman(-1);
        });
        assertThrows(ConstraintViolationException.class, () -> {
            converterController.toRoman(4000);
        });
    }

    @Test
    public void shouldToDecimalThrowConstraintViolation() {
        assertThrows(ConstraintViolationException.class, () -> {
           converterController.toDecimal("ABC");
        });
        assertThrows(ConstraintViolationException.class, () -> {
           converterController.toDecimal("XXXX");
        });
        assertThrows(ConstraintViolationException.class, () -> {
           converterController.toDecimal("XMXM");
        });
        assertThrows(ConstraintViolationException.class, () -> {
           converterController.toDecimal("XXC");
        });
        assertThrows(ConstraintViolationException.class, () -> {
           converterController.toDecimal("MXMX");
        });
        assertThrows(ConstraintViolationException.class, () -> {
           converterController.toDecimal("123");
        });
    }
}
