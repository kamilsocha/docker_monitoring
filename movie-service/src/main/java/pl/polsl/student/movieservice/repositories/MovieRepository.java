package pl.polsl.student.movieservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.student.movieservice.domain.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
}
