package pl.polsl.student.converterservice.services;

import org.springframework.stereotype.Service;
import pl.polsl.student.converterservice.exceptions.WrongRomanNumberException;

@Service
public class ConverterServiceImpl implements ConverterService {

    @Override
    public Integer convertToDecimal(String roman) {

        int arabicForm = 0;
        int previous = 0;
        int val = 0;

        for (int i = roman.length() - 1; i >= 0; i--)
        {
            char letter = roman.charAt(i);
            val = value(letter);
            if (val >= previous) {
                arabicForm += val;
            }
            else {
                arabicForm -= val;
            }
            previous = val;
        }

        return arabicForm;
    }

    @Override
    public String convertToRoman(Integer decimal) {
        StringBuilder romanForm = new StringBuilder();

        while (decimal >= 1000) {
            romanForm.append('M');
            decimal -= 1000;
        }
        if(decimal >= 900) {
            romanForm.append("CM");
            decimal -= 900;
        } else if (decimal >= 500) {
            romanForm.append('D');
            decimal -= 500;
        } else if (decimal >= 400) {
            romanForm.append("CD");
            decimal -= 400;
        }
        while (decimal >= 100) {
            romanForm.append('C');
            decimal -= 100;
        }
        if(decimal >= 90) {
            romanForm.append("XC");
            decimal -= 90;
        } else if (decimal >= 50) {
            romanForm.append('L');
            decimal -= 50;
        } else if (decimal >= 40) {
            romanForm.append("XL");
            decimal -= 40;
        }
        while (decimal >= 10) {
            romanForm.append('X');
            decimal -= 10;
        }
        if(decimal >= 9) {
            romanForm.append("IX");
            decimal -= 9;
        } else if (decimal >= 5) {
            romanForm.append('V');
            decimal -= 5;
        } else if (decimal >= 4) {
            romanForm.append("IV");
            decimal -= 4;
        }
        while (decimal >= 1) {
            romanForm.append('I');
            decimal -= 1;
        }

        return romanForm.toString();
    }

    private int value(char numeral) {
        switch(numeral) {
            case 'I':
                return RomanNumerals.I.getValue();
            case 'V':
                return RomanNumerals.V.getValue();
            case 'X':
                return RomanNumerals.X.getValue();
            case 'L':
                return RomanNumerals.L.getValue();
            case 'C':
                return RomanNumerals.C.getValue();
            case 'D':
                return RomanNumerals.D.getValue();
            case 'M':
                return RomanNumerals.M.getValue();
        }
        return -1;
    }

    enum RomanNumerals {

        I(1),
        V(5),
        X(10),
        L(50),
        C(100),
        D(500),
        M(1000);

        private final int value;
        RomanNumerals(int value) {
            this.value = value;
        }
        public int getValue() {

            return value;
        }
    }
}
