package pl.polsl.student.movieservice.services.bootstrapservices;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

@Slf4j
public abstract class BootStrapService {

    @Autowired
    protected BootStrapEntryService entryService;

    public void boot() {
        writeDefaults();
    }

    protected void writeDefaults() {}
}
