package pl.polsl.student.javadockerapibroker.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pl.polsl.student.javadockerapibroker.domain.User;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
public class JwtUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    private final JwtUtils jwtUtils;

    private final JwtUserDetailsService userDetailsService;

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
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        User principal = (User) authResult.getPrincipal();
        String accessToken = jwtUtils.generateAccessToken(principal);
        response.addHeader(jwtUtils.getAuthorizationHeader(), jwtUtils.getTokenPrefix() + accessToken);
        response.addHeader("AccessTokenExpiration", jwtUtils.extractExpirationDate(accessToken).toString());
    }
}