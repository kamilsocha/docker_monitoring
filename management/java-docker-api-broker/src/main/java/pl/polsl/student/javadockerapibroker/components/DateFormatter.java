package pl.polsl.student.javadockerapibroker.components;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.temporal.ChronoField;

@Component
public class DateFormatter {

    private final DateTimeFormatter formatter;

    public DateFormatter() {
        formatter = new DateTimeFormatterBuilder()
                .appendPattern("yyyy-MM-dd")
                .optionalStart()
                .appendPattern(" HH:mm:ss")
                .optionalEnd()
                .parseDefaulting(ChronoField.HOUR_OF_DAY, 0)
                .parseDefaulting(ChronoField.MINUTE_OF_HOUR, 0)
                .toFormatter();
    }

    public LocalDateTime parseDayTime(String date) {
        return LocalDateTime.parse(date, formatter);
    }
}
