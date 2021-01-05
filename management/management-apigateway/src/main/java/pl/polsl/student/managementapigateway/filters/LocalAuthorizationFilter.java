package pl.polsl.student.managementapigateway.filters;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;

import static org.springframework.cloud.netflix.zuul.filters.support.FilterConstants.PRE_TYPE;


@Component
@RequiredArgsConstructor
@PropertySource("classpath:application.yml")
public class LocalAuthorizationFilter extends ZuulFilter {

    @Value("${zuul.routes.auth-service.url}")
    private String authServiceUri;

    private final FilterHelper filterHelper;

    @Override
    public String filterType() {
        return PRE_TYPE;
    }

    @Override
    public int filterOrder() {
        return 2;
    }

    @Override
    public boolean shouldFilter() {
        return RequestContext.getCurrentContext().getRequest().getRequestURI().startsWith("/routes");
    }

    @Override
    public Object run() throws ZuulException {

        var request = RequestContext.getCurrentContext().getRequest();
        String path = authServiceUri;
        if(request.getMethod().equals(HttpMethod.DELETE.name())) {
            path += "/verifyAdmin";
        } else {
            path += "/verify";
        }
        filterHelper.exchange(path);

        return null;
    }
}
