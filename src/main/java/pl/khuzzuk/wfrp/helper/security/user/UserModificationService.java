package pl.khuzzuk.wfrp.helper.security.user;

import java.util.Set;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.khuzzuk.wfrp.helper.security.jwt.JwtAuthentication;
import pl.khuzzuk.wfrp.helper.security.jwt.JwtTokenProvider;
import pl.khuzzuk.wfrp.helper.security.role.RoleRepo;

@Slf4j
@RequiredArgsConstructor
@RestController
public class UserModificationService {

  private final UserRepo userRepo;
  private final RoleRepo roleRepo;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtTokenProvider jwtTokenProvider;
  private final String allowedCharacters =
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";

  @PostMapping("login/signup")
  public void save(UserDTO userDTO) {
    User user = new User();
    user.setUsername(user.getUsername());

    final boolean oneTimePassword = StringUtils.isNotBlank(userDTO.getPassword());
    String password =
        oneTimePassword ? userDTO.getPassword() : RandomStringUtils.random(8, allowedCharacters);

    user.setPassword(passwordEncoder.encode(password));
    user.setOneTimePassword(true);
    user.setOneTimePassword(oneTimePassword);
    user.setAuthorities(Set.of(roleRepo.findByAuthority(RoleRepo.ROLE_USER).orElseThrow()));

    log.info("Password for user {} is {}", user.getUsername(), password);
    userRepo.save(user);
  }

  @PostMapping("login")
  public JwtAuthentication login(@RequestBody UserDTO userDTO) {
    UsernamePasswordAuthenticationToken authentication =
        new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword());
    authenticationManager.authenticate(authentication);
    SecurityContextHolder.getContext().setAuthentication(authentication);

    JwtAuthentication jwtAuth = new JwtAuthentication();
    jwtAuth.setToken(jwtTokenProvider.getToken((String) authentication.getPrincipal()));
    return jwtAuth;
  }

  @Transactional
  @Secured(RoleRepo.ROLE_ADMIN)
  @DeleteMapping("admin/deleteUser")
  public void delete(UserDTO userDTO) {
    User user = userRepo.findByUsername(userDTO.getUsername()).orElseThrow();
    user.setEnabled(false);
    userRepo.save(user);
  }

  public void changePassword(String newPassword, @CurrentUser User user) {
    user.setOneTimePassword(false);
    user.setPassword(passwordEncoder.encode(newPassword));
    userRepo.save(user);
  }
}
