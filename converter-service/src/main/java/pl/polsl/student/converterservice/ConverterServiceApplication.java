package pl.polsl.student.converterservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class ConverterServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConverterServiceApplication.class, args);
	}

}
