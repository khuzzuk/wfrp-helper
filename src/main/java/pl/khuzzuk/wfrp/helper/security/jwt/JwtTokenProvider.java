package pl.khuzzuk.wfrp.helper.security.jwt;

import static java.nio.charset.StandardCharsets.UTF_8;
import static java.time.ZoneOffset.UTC;
import static org.springframework.http.HttpHeaders.EMPTY;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import pl.khuzzuk.wfrp.helper.WfrpHelperConfig;
import pl.khuzzuk.wfrp.helper.common.date.CurrentDateTimeService;
import pl.khuzzuk.wfrp.helper.security.user.User;
import pl.khuzzuk.wfrp.helper.security.user.UserRepo;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

  private final CurrentDateTimeService currentDateTimeService;
  private final UserRepo userRepo;
  private final WfrpHelperConfig config;

  public String getToken(Authentication authentication) {
    User user = userRepo.findByUsername((String) authentication.getPrincipal())
                        .orElseThrow(() -> HttpClientErrorException.create(HttpStatus.UNAUTHORIZED,
                                                                           "Unauthenticated",
                                                                           EMPTY,
                                                                           null,
                                                                           UTF_8));
    LocalDateTime tokenIssueTime = currentDateTimeService.now();
    LocalDateTime tokenExpirationTime =
        tokenIssueTime.plusSeconds(config.getAuth().getTokenExpirationSeconds());

    return Jwts.builder()
               .setSubject(String.valueOf(user.getId()))
               .setIssuedAt(Date.from(tokenExpirationTime.toInstant(UTC)))
               .setExpiration(Date.from(tokenExpirationTime.toInstant(UTC)))
               .signWith(SignatureAlgorithm.HS512, config.getAuth().getTokenSecret())
               .compact();
  }

  @Transactional
  public Optional<User> getUser(String token) {
    try {
      Claims claims = Jwts.parser()
                          .setSigningKey(config.getAuth().getTokenSecret())
                          .parseClaimsJws(token)
                          .getBody();

      if (claims.getExpiration().after(Date.from(currentDateTimeService.now().toInstant(UTC)))) {
        return userRepo.findById(Long.parseLong(claims.getSubject()));
      }
    } catch (Exception e) {
      log.warn("Invalid token", e);
    }
    return Optional.empty();
  }
}
