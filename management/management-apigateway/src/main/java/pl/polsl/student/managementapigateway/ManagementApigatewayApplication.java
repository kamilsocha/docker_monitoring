package pl.polsl.student.managementapigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@EnableZuulProxy
@SpringBootApplication
public class ManagementApigatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ManagementApigatewayApplication.class, args);
	}

}
