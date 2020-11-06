package pl.polsl.student.converterservice.services;

public interface ConverterService {

    Integer convertToDecimal(String roman);
    String convertToRoman(Integer decimal);
}
