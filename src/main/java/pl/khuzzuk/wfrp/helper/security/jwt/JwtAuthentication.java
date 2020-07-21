package pl.khuzzuk.wfrp.helper.security.jwt;

import java.util.Set;
import lombok.Data;

@Data
public class JwtAuthentication {
  private String token;
  private Set<String> authorities;
}
