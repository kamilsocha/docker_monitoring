package pl.polsl.student.authservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.student.authservice.domain.Role;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findFirstByName(String name);
}
