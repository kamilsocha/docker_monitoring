package pl.polsl.student.javadockerapibroker.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.function.Function;

@Component
@PropertySource("classpath:application.yml")
public class JwtUtils {

    @Value("${application.security.jwt.prefix}")
    private String TOKEN_PREFIX;

    @Value("${application.security.jwt.secret}")
    private String SECRET_KEY;

    @Value("${application.security.jwt.access.header}")
    private String AUTHORIZATION_HEADER;

    @Value("${application.security.jwt.access.expiration}")
    private Long JWT_ACCESS_TOKEN_EXPIRATION;

    @Value("${application.security.jwt.access.header}")
    private String REFRESH_TOKEN_HEADER;

    @Value("${application.security.jwt.access.expiration}")
    private Long JWT_REFRESH_TOKEN_EXPIRATION;

    public String getTokenPrefix() {
        return this.TOKEN_PREFIX;
    }

    public String getAuthorizationHeader() {
        return this.AUTHORIZATION_HEADER;
    }

    public String getRefreshTokenHeader() { return this.REFRESH_TOKEN_HEADER; }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public Date extractExpirationDate(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractTokenFromHeader(String headerString) {
        return headerString.startsWith(TOKEN_PREFIX) ? headerString.substring(TOKEN_PREFIX.length()) : null;
    }

    public String generateAccessToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("authorities", userDetails.getAuthorities())
                .setIssuedAt(new Date())
                .setExpiration(Date.from(ZonedDateTime.now().plusMinutes(JWT_ACCESS_TOKEN_EXPIRATION).toInstant()))
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
                .compact();
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("authorities", userDetails.getAuthorities())
                .setIssuedAt(new Date())
                .setExpiration(Date.from(ZonedDateTime.now().plusMinutes(JWT_REFRESH_TOKEN_EXPIRATION).toInstant()))
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
                .compact();
    }


    public void createErrorResponse(HttpServletResponse response, int status, String msg) throws IOException {
        response.getOutputStream()
                .print("Security Error: " + msg);
        response.setStatus(status);
    }

}
