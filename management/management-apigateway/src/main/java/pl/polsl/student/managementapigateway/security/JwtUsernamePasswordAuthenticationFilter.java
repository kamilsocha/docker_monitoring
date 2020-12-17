package pl.polsl.student.managementapigateway.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pl.polsl.student.managementapigateway.domain.User;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;

@RequiredArgsConstructor
public class JwtUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    private final JwtUtils jwtUtils;

    private final JwtUserDetailsService userDetailsService;

    private static final String datePattern = "yyyy-MM-dd HH:mm:ss";

    private final SimpleDateFormat simpleDateFormat = new SimpleDateFormat(datePattern);

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            UsernamePasswordAuthenticationRequest authenticationRequest = new ObjectMapper()
                    .readValue(request.getInputStream(), UsernamePasswordAuthenticationRequest.class);
            User authenticatedUser = (User) userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticatedUser, authenticationRequest.getPassword()
            ));
        } catch (IOException e) {
            throw new AuthenticationException("Invalid Credentials.") {};
        } catch(UsernameNotFoundException e) {
            throw new UsernameNotFoundException("User not found");
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        User principal = (User) authResult.getPrincipal();
        String accessToken = jwtUtils.generateAccessToken(principal);
        response.addHeader(jwtUtils.getAuthorizationHeader(), jwtUtils.getTokenPrefix() + accessToken);
        response.addHeader("AccessTokenExpiration", simpleDateFormat.format(jwtUtils.extractExpirationDate(accessToken)));
        response.addHeader("Expires", simpleDateFormat.format(jwtUtils.extractExpirationDate(accessToken)));
    }
}
