package pl.polsl.student.javadockerapibroker.security;

import com.google.common.base.Strings;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import pl.polsl.student.javadockerapibroker.domain.User;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final JwtUserDetailsService userDetailsService;

    private final JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader(jwtUtils.getAuthorizationHeader());
        if (Strings.isNullOrEmpty(authorizationHeader) || !authorizationHeader.startsWith(jwtUtils.getTokenPrefix())) {
            filterChain.doFilter(request, response);
            return;
        }
        String token = jwtUtils.extractTokenFromHeader(authorizationHeader);
        try {
            Claims claims = jwtUtils.extractAllClaims(token);
            String username = claims.getSubject();
            User user = (User) userDetailsService.loadUserByUsername(username);
            var authorities = (List<Map<String, String>>) claims.get("authorities");
            Set<SimpleGrantedAuthority> simpleGrantedAuthorities = authorities
                                                            .stream()
                                                            .map(m -> new SimpleGrantedAuthority(m.get("authority")))
                                                            .collect(Collectors.toCollection(LinkedHashSet::new));
            SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken(user, null, simpleGrantedAuthorities)
            );
        } catch (ExpiredJwtException e) {
            jwtUtils.createErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Access token expired!");
            return;
        } catch (JwtException e) {
            jwtUtils.createErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "Invalid access token!");
            return;
        } catch (UsernameNotFoundException e) {
            jwtUtils.createErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED, "This is a token for non-existing user!");
            return;
        }
        filterChain.doFilter(request, response);
    }
}
