package pl.khuzzuk.wfrp.helper.security.jwt;

import java.util.Set;
import lombok.Data;
import pl.khuzzuk.wfrp.helper.security.role.RoleDTO;

@Data
public class JwtAuthentication {
  private String token;
  private Set<RoleDTO> authorities;
  private boolean isOneTimePassword;
}
