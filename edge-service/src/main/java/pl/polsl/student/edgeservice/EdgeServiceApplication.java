package pl.polsl.student.edgeservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.cloud.netflix.zuul.filters.post.LocationRewriteFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@EnableEurekaClient
@EnableZuulProxy
@SpringBootApplication
public class EdgeServiceApplication {


	public static void main(String[] args) {
		SpringApplication.run(EdgeServiceApplication.class, args);
	}

	@Bean
	public LocationRewriteFilter locationRewriteFilter() {
		return new LocationRewriteFilter();
	}
}
