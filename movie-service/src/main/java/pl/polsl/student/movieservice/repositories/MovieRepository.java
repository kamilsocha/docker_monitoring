package pl.polsl.student.movieservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.student.movieservice.domain.Movie;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long>, PagingAndSortingRepository<Movie, Long> {

    List<Movie> findAllByIdNotIn(Long[] idsToFilterOut);
}
