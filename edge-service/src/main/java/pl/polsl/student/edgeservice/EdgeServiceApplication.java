package pl.polsl.student.edgeservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@EnableEurekaClient
@EnableZuulProxy
@SpringBootApplication
public class EdgeServiceApplication implements ApplicationRunner {

	@Value("${EUREKA_URI}")
	private String EUREKA_URI;

	private Logger logger = LoggerFactory.getLogger(EdgeServiceApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(EdgeServiceApplication.class, args);
	}

	@Override
	public void run(ApplicationArguments args) throws Exception {
		logger.warn("EUREKA_URI LOGGING");
		logger.warn("URI: " + EUREKA_URI);
	}
}
