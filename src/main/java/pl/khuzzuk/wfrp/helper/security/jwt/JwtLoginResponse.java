package pl.khuzzuk.wfrp.helper.security.jwt;

import lombok.Data;
import pl.khuzzuk.wfrp.helper.security.LoginResponse;

@Data
public class JwtLoginResponse extends LoginResponse {
  private String token;
}
