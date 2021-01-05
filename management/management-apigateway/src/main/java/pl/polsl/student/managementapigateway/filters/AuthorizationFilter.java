package pl.polsl.student.managementapigateway.filters;

//@Component
//@PropertySource("classpath:application.yml")
//public class AuthorizationFilter extends ZuulFilter {
//
//    @Value("${api.username}")
//    private String username;
//
//    @Value("${api.password}")
//    private String password;
//
//    @Override
//    public String filterType() {
//
//        return PRE_TYPE;
//    }
//
//    @Override
//    public int filterOrder() {
//
//        return 0;
//    }
//
//    @Override
//    public boolean shouldFilter() {
//
//        return RequestContext.getCurrentContext().getRequest().getRequestURI().startsWith("/api");
//    }
//
//    @Override
//    public Object run() throws ZuulException {
//
//        RequestContext ctx = RequestContext.getCurrentContext();
//        ctx.addZuulRequestHeader("Authorization", authHeader());
//
//        return null;
//    }
//
//    private String authHeader() {
//        String auth = username + ":" + password;
//        byte[] encodedAuth = Base64.encodeBase64(
//                auth.getBytes(StandardCharsets.US_ASCII)
//        );
//        return "Basic " + new String(encodedAuth);
//    }
//}

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import static org.springframework.cloud.netflix.zuul.filters.support.FilterConstants.PRE_TYPE;

@Component
@RequiredArgsConstructor
@PropertySource("classpath:application.yml")
public class AuthorizationFilter extends ZuulFilter {

    @Value("${zuul.routes.auth-service.url}")
    private String authServiceUri;

    private final FilterHelper filterHelper;

    @Override
    public String filterType() {

        return PRE_TYPE;
    }

    @Override
    public int filterOrder() {

        return 1;
    }

    @Override
    public boolean shouldFilter() {

        boolean shouldFilter = false;
        final String requestUri = RequestContext.getCurrentContext().getRequest().getRequestURI();

        if(requestUri.startsWith("/api") && !requestUri.contains("auth") && !requestUri.contains("admin")) {
            shouldFilter = true;
        }

        return shouldFilter;
    }

    @Override
    public Object run() throws ZuulException {

        filterHelper.exchange(authServiceUri + "/verify");

        return null;
    }

}
