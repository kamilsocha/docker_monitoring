package pl.polsl.student.managementapigateway.filters;

import com.netflix.zuul.context.RequestContext;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Collections;

@Component
@RequiredArgsConstructor
@PropertySource("classpath:application.yml")
public class FilterHelper {

    private final RestTemplate restTemplate;

    @Value("${api.username}")
    private String username;

    @Value("${api.password}")
    private String password;

    public HttpEntity<String> rewriteHeaders(HttpServletRequest request) {
        var headerNames = request.getHeaderNames();
        var headerNamesList = Collections.list(headerNames);
        var headers = new HttpHeaders();
        for(var header : headerNamesList) {
            var value = request.getHeader(header);
            headers.add(header, value);
        }

        return new HttpEntity<>(null, headers);
    }

    public String authHeader() {
        String auth = username + ":" + password;
        byte[] encodedAuth = Base64.encodeBase64(
                auth.getBytes(StandardCharsets.US_ASCII)
        );
        return "Basic " + new String(encodedAuth);
    }

    public void exchange(String url) {
        var request = RequestContext.getCurrentContext().getRequest();

        ResponseEntity<?> response;

        response = restTemplate.exchange(url, HttpMethod.GET, rewriteHeaders(request), String.class);

        if(response.getStatusCode() == HttpStatus.OK) {
            RequestContext ctx = RequestContext.getCurrentContext();
            ctx.addZuulRequestHeader("Authorization", authHeader());
        }
    }
}
