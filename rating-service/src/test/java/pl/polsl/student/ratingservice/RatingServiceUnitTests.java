package pl.polsl.student.ratingservice;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.polsl.student.ratingservice.domain.Rating;
import pl.polsl.student.ratingservice.exceptions.RatingNotFoundException;
import pl.polsl.student.ratingservice.repositories.RatingRepository;
import pl.polsl.student.ratingservice.services.RatingServiceImpl;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;


@ExtendWith(MockitoExtension.class)
public class RatingServiceUnitTests {

    @Mock
    private RatingRepository ratingRepository;

    @InjectMocks
    private RatingServiceImpl ratingService;

    @Test
    public void shouldCreateRatingTest() {
        var rating = new Rating();
        rating.setMovieId(1L);
        rating.setUserId(1L);
        rating.setRating(9D);
        given(ratingRepository.save(any(Rating.class))).willAnswer(invocation -> invocation.getArgument(0));
        var res = ratingService.createRating(rating);
        assertEquals(res.getMovieId(), rating.getMovieId());
        assertEquals(res.getUserId(), rating.getUserId());
        assertEquals(res.getRating(), rating.getRating());
    }

    @Test
    public void shouldUpdateRatingTest() {
        var id = 1L;
        var newRating = 9D;
        var ratingEntity = new Rating();
        ratingEntity.setId(id);
        ratingEntity.setRating(8D);
        given(ratingRepository.findById(any())).willReturn(java.util.Optional.of(ratingEntity));
        given(ratingRepository.save(any(Rating.class))).willAnswer(invocation -> invocation.getArgument(0));

        var res = ratingService.updateRating(id, newRating);
        assertEquals(res.getRating(), newRating);
    }

    @Test
    public void shouldUpdateThrowRatingNotFoundTest() {
        var id = 1L;
        given(ratingRepository.findById(anyLong())).willReturn(Optional.empty());
        assertThrows(RatingNotFoundException.class, () -> {
            ratingService.updateRating(id, 8D);
        });
    }

    @Test
    public void shouldDeleteRatingTest() {
        var id = 1L;
        ratingService.deleteRating(id);
        verify(ratingRepository).deleteById(id);
    }
}
