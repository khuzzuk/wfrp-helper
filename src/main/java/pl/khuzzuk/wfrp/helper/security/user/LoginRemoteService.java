package pl.khuzzuk.wfrp.helper.security.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.javahello.Adapter;
import pl.khuzzuk.wfrp.helper.security.LoginResponse;
import pl.khuzzuk.wfrp.helper.security.role.Role;
import pl.khuzzuk.wfrp.helper.security.role.RoleDTO;
import pl.khuzzuk.wfrp.helper.security.role.RoleRepo;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Slf4j
@RestController
public class LoginRemoteService {

  private final UserModificationService userModificationService;
  private final AuthenticationManager authenticationManager;
  private final UserRepo userRepo;
  private final Adapter<Role, RoleDTO> roleDTOAdapter;
  private final Adapter<User, UserDTO> userDTOAdapter;

  @PostMapping("login")
  public LoginResponse login(@RequestBody UserDTO userDTO) {
    UsernamePasswordAuthenticationToken authentication =
        new UsernamePasswordAuthenticationToken(userDTO.getUsername(), userDTO.getPassword());
    authenticationManager.authenticate(authentication);
    SecurityContextHolder.getContext().setAuthentication(authentication);

    User user = userRepo.findByUsername(userDTO.getUsername()).orElseThrow();

    LoginResponse response = new LoginResponse();
    response.setAuthorities(roleDTOAdapter.set(user.getAuthorities()));
    response.setOneTimePassword(!user.isCredentialsNonExpired());
    return response;
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

  @GetMapping("user")
  @Secured(RoleRepo.ROLE_ADMIN)
  @Transactional
  public List<UserDTO> getUsers() {
    return userDTOAdapter.list(userRepo.findAll());
  }

  @PostMapping("user")
  @Secured(RoleRepo.ROLE_ADMIN)
  @Transactional
  public UserDTO updateUser(@RequestBody UserDTO userDTO) {
    userModificationService.updateUserRoles(userDTO);
    return userDTO;
  }

  @GetMapping("authorities")
  public Set<RoleDTO> getAuthorities(@CurrentUser User user) {
    return roleDTOAdapter.set(user.getAuthorities());
  }

  @PostMapping("password")
  public void updatePassword(@CurrentUser User user, @RequestBody UserDTO userDTO) {
    userModificationService.changePassword(userDTO.getPassword(), user);
  }
}
