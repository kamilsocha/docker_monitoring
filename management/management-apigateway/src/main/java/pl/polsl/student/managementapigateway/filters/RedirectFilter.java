package pl.polsl.student.managementapigateway.filters;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import static org.springframework.cloud.netflix.zuul.filters.support.FilterConstants.PRE_TYPE;

@Component
public class RedirectFilter extends ZuulFilter {

    private final Logger logger = LoggerFactory.getLogger(RedirectFilter.class);

    @Override
    public String filterType() {
        return PRE_TYPE;
    }

    @Override
    public int filterOrder() {
        return 0;
    }

    @Override
    public boolean shouldFilter() {
        String requestUri = RequestContext.getCurrentContext().getRequest().getRequestURI();
//        return requestUri.matches("/redirect");
        return true;
    }

    @Override
    public Object run() throws ZuulException {
        logger.debug("Running zuul redirect pre filter.");
        RequestContext ctx = RequestContext.getCurrentContext();

        return null;
    }
}
