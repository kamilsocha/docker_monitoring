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
import org.springframework.cloud.netflix.zuul.filters.post.LocationRewriteFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@EnableEurekaClient
@EnableZuulProxy
@Configuration
@SpringBootApplication
public class EdgeServiceApplication implements ApplicationRunner {

	private final Logger logger = LoggerFactory.getLogger(EdgeServiceApplication.class);

	@Value("${spring.cloud.config.username}")
	private String cloudUser;
	@Value("${spring.cloud.config.password}")
	private String cloudPassword;

	public static void main(String[] args) {
		SpringApplication.run(EdgeServiceApplication.class, args);
	}

	@Override
	public void run(ApplicationArguments args) throws Exception {
		logger.warn("username: " + cloudUser);
		logger.warn("password: " + cloudPassword);
	}

	@Bean
	public LocationRewriteFilter locationRewriteFilter() {
		return new LocationRewriteFilter();
	}
}
