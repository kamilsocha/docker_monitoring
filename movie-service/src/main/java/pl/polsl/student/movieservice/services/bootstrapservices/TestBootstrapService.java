package pl.polsl.student.movieservice.services.bootstrapservices;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Slf4j
@Profile("test")
@RequiredArgsConstructor
@Service
public class TestBootstrapService extends BootStrapService {

    @Override
    protected void writeDefaults() {
        super.writeDefaults();
    }

}
