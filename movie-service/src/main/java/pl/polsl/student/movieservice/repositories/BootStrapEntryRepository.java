package pl.polsl.student.movieservice.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.student.movieservice.domain.BootStrapEntry;
import pl.polsl.student.movieservice.enums.BootstrapLabel;


@Repository
public interface BootStrapEntryRepository extends CrudRepository<BootStrapEntry, Long> {

    boolean existsByLabel(BootstrapLabel label);
}
