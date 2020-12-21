package pl.polsl.student.movieservice.configuration;

import io.swagger.models.Path;
import io.swagger.models.Swagger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponents;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.swagger.common.HostNameProvider;
import springfox.documentation.swagger2.web.SwaggerTransformationContext;
import springfox.documentation.swagger2.web.WebMvcSwaggerTransformationFilter;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 1000)
public class SwaggerBasePathTransformationFilter implements WebMvcSwaggerTransformationFilter {

    @Override
    public Swagger transform(SwaggerTransformationContext<HttpServletRequest> context) {
        Swagger swagger = context.getSpecification();
        context.request().ifPresent(servletRequest -> {
            UriComponents uriComponents = HostNameProvider.componentsFrom(servletRequest, swagger.getBasePath());

            swagger.host(uriComponents.getHost() + (uriComponents.getPort() > 0 ? ":" + uriComponents.getPort() : ""));

            String basePath = StringUtils.isEmpty(uriComponents.getPath()) ? "/" : uriComponents.getPath();
            swagger.basePath(basePath);

            final Map<String, Path> newPaths = swagger.getPaths().entrySet().stream().collect(Collectors.toMap(
                    entry -> entry.getKey().replaceAll("^" + basePath, ""), Map.Entry::getValue));
            swagger.setPaths(newPaths);
        });
        return swagger;
    }

    @Override
    public boolean supports(DocumentationType delimiter) {
        return delimiter == DocumentationType.SWAGGER_2;
    }

}
