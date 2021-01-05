package pl.polsl.student.authservice.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.student.authservice.domain.BootStrapEntry;
import pl.polsl.student.authservice.enums.BootstrapLabel;


@Repository
public interface BootStrapEntryRepository extends CrudRepository<BootStrapEntry, Long> {

    boolean existsByLabel(BootstrapLabel label);
}
