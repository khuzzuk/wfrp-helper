package pl.khuzzuk.wfrp.helper.security;

import lombok.Data;
import pl.khuzzuk.wfrp.helper.security.role.RoleDTO;

import java.util.Set;

@Data
public class LoginResponse {
  private Set<RoleDTO> authorities;
  private boolean isOneTimePassword;
}
