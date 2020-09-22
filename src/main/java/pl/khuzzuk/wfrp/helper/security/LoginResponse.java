package pl.khuzzuk.wfrp.helper.security;

import java.util.Set;
import lombok.Data;
import pl.khuzzuk.wfrp.helper.security.role.RoleDTO;

@Data
public class LoginResponse {
  private Set<RoleDTO> authorities;
  private boolean isOneTimePassword;
}
