package pl.khuzzuk.wfrp.helper.security.user;

import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.khuzzuk.wfrp.helper.security.jwt.JwtAuthentication;
import pl.khuzzuk.wfrp.helper.security.jwt.JwtTokenProvider;
import pl.khuzzuk.wfrp.helper.security.role.Role;
import pl.khuzzuk.wfrp.helper.security.role.RoleRepo;

@RequiredArgsConstructor
@Slf4j
@RestController
public class LoginRemoteService {

  private final UserModificationService userModificationService;
  private final AuthenticationManager authenticationManager;
  private final JwtTokenProvider jwtTokenProvider;
  private final UserRepo userRepo;

  @PostMapping("login")
  public JwtAuthentication login(@RequestBody UserDTO userDTO) {
    UsernamePasswordAuthenticationToken authentication =
        new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword());
    authenticationManager.authenticate(authentication);
    SecurityContextHolder.getContext().setAuthentication(authentication);

    User user = userRepo.findByUsername(userDTO.getUsername()).orElseThrow();

    JwtAuthentication jwtAuth = new JwtAuthentication();
    jwtAuth.setToken(jwtTokenProvider.getToken((String) authentication.getPrincipal()));
    jwtAuth.setAuthorities(user.getAuthorities()
                               .stream()
                               .map(Role::getAuthority)
                               .collect(Collectors.toSet()));
    return jwtAuth;
  }

  @PostMapping("login/signup")
  public void signUp(@RequestBody UserDTO userDTO) {
    userModificationService.save(userDTO);
  }

  @DeleteMapping("user")
  @Secured(RoleRepo.ROLE_ADMIN)
  public void deleteUser(@RequestBody UserDTO userDTO) {
    userModificationService.delete(userDTO);
  }

  @GetMapping("authorities")
  public Set<String> getAuthorities(@CurrentUser User user) {
    return user.getAuthorities().stream().map(Role::getAuthority).collect(Collectors.toSet());
  }
}
