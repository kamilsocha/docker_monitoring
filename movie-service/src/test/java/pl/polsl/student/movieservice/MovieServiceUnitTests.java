package pl.polsl.student.movieservice;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import pl.polsl.student.movieservice.domain.Movie;
import pl.polsl.student.movieservice.repositories.MovieRepository;
import pl.polsl.student.movieservice.services.impl.MovieServiceImpl;
import pl.polsl.student.movieservice.services.impl.PosterStorageServiceImpl;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class MovieServiceUnitTests {

    @Mock
    private PosterStorageServiceImpl posterStorageService;

    @Mock
    private MovieRepository movieRepository;

    @InjectMocks
    private MovieServiceImpl movieService;

    @Test
    public void shouldFindAll() {
        var page = PageRequest.of(0, 10);
        List<Movie> movieList = new ArrayList<>();
        for(var i = 0; i < 10; i++) {
            var movie = new Movie(1L, "name1", "description1", "director1", "posterUri1");
            movieList.add(movie);
        }
        var expected = new PageImpl<>(movieList, page, movieList.size());
        given(movieRepository.findAll(page)).willReturn(new PageImpl<>(movieList, page, movieList.size()));
        var result = movieService.findAll(page);
        assertEquals(result, expected);
    }

    @Test
    public void shouldCreateOneMovie() {
        var movie = new Movie(1L, "name", "description", "director", "/posterUri");
        given(movieRepository.save(movie)).willAnswer(invocation -> invocation.getArgument(0));
        var res = movieService.createOneMovie(movie);
        assertEquals(movie.getId(), res.getId());
        assertEquals(movie.getName(), res.getName());
        assertEquals(movie.getDescription(), res.getDescription());
        assertEquals(movie.getDirector(), res.getDirector());
        assertEquals(movie.getPosterUri(), res.getPosterUri());
    }

    @Test
    public void shouldDeleteById() {

        var inputId = 1L;
        var movie = new Movie(1L, "", "", "", "/posterUri");
        given(movieRepository.findById(inputId)).willReturn(java.util.Optional.of(movie));
        movieService.delete(inputId);
        verify(movieRepository).deleteById(inputId);
    }
}
