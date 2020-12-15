package pl.polsl.student.javadockerapibroker.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.student.javadockerapibroker.domain.BootStrapEntry;
import pl.polsl.student.javadockerapibroker.enums.BootstrapLabel;

@Repository
public interface BootStrapEntryRepository extends CrudRepository<BootStrapEntry, Long> {

    boolean existsByLabel(BootstrapLabel label);
}
