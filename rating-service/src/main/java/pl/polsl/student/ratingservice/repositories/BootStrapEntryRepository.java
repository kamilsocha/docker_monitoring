package pl.polsl.student.ratingservice.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.student.ratingservice.domain.BootStrapEntry;
import pl.polsl.student.ratingservice.enums.BootstrapLabel;


@Repository
public interface BootStrapEntryRepository extends CrudRepository<BootStrapEntry, Long> {

    boolean existsByLabel(BootstrapLabel label);
}
