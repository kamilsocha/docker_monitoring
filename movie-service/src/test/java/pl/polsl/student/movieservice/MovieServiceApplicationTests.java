package pl.polsl.student.movieservice;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import pl.polsl.student.movieservice.controllers.MovieController;


@ActiveProfiles("test")
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT,
		properties = {"/bootstrap.yml", "/application.yml"},
		classes = {MovieServiceApplication.class})
class MovieServiceApplicationTests {

	@Autowired
	private MovieController movieController;

	Logger logger = LoggerFactory.getLogger(MovieServiceApplication.class);

	@Test
	void shouldFindAllTest() {
	}

}
