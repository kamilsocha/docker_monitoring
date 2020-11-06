package pl.polsl.student.userservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.student.userservice.domain.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
