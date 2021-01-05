package pl.polsl.student.movieservice.services.bootstrapservices;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.polsl.student.movieservice.domain.BootStrapEntry;
import pl.polsl.student.movieservice.enums.BootstrapLabel;
import pl.polsl.student.movieservice.repositories.BootStrapEntryRepository;

import javax.transaction.Transactional;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class BootStrapEntryService {

    private final BootStrapEntryRepository bootStrapEntryRepository;

    public void createIfNotExists(BootstrapLabel label, Runnable runnable) {
        String entryStatus = "Already in database.";
        boolean entryExists = existsByLabel(label);

        if(!entryExists) {
            runnable.run();
            create(label);
            entryStatus = "creating";
        }

        log(label, entryStatus);
    }

    public boolean existsByLabel(BootstrapLabel label) {
        return bootStrapEntryRepository.existsByLabel(label);
    }

    public BootStrapEntry create(BootstrapLabel label) {
        BootStrapEntry bootStrapEntry = new BootStrapEntry();
        bootStrapEntry.setLabel(label);
        return bootStrapEntryRepository.save(bootStrapEntry);
    }

    private void log(BootstrapLabel label, String entryStatus) {
        String entryMessage = "processing " + label + " -> " + entryStatus;
        log.info(entryMessage);
    }
}
