package pl.polsl.student.managementapigateway.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.student.managementapigateway.domain.BootStrapEntry;
import pl.polsl.student.managementapigateway.enums.BootstrapLabel;

@Repository
public interface BootStrapEntryRepository extends CrudRepository<BootStrapEntry, Long> {

    boolean existsByLabel(BootstrapLabel label);
}
