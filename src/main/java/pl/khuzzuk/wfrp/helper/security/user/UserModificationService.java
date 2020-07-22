package pl.khuzzuk.wfrp.helper.security.user;

import java.util.Set;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.javahello.Adapter;
import pl.khuzzuk.wfrp.helper.security.role.Role;
import pl.khuzzuk.wfrp.helper.security.role.RoleDTO;
import pl.khuzzuk.wfrp.helper.security.role.RoleRepo;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserModificationService {

  private final UserRepo userRepo;
  private final RoleRepo roleRepo;
  private final Adapter<RoleDTO, Role> roleAdapter;
  private final PasswordEncoder passwordEncoder;
  private final String allowedCharacters =
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";

  public void save(UserDTO userDTO) {
    User user = new User();
    user.setUsername(userDTO.getUsername());

    final boolean oneTimePassword = StringUtils.isNotBlank(userDTO.getPassword());
    String password =
        oneTimePassword ? userDTO.getPassword() : RandomStringUtils.random(8, allowedCharacters);

    user.setPassword(passwordEncoder.encode(password));
    user.setOneTimePassword(true);
    user.setOneTimePassword(oneTimePassword);
    user.setAuthorities(Set.of(roleRepo.findByAuthority(RoleRepo.ROLE_USER).orElseThrow(),
                               roleRepo.findByAuthority(RoleRepo.ROLE_PLAYER).orElseThrow()));

    userRepo.save(user);
  }

  @Transactional
  void updateUserRoles(UserDTO userDTO) {
    User user = userRepo.getOne(userDTO.getId());
    user.setAuthorities(roleAdapter.set(userDTO.getAuthorities()));
  }

  @Transactional
  @Secured(RoleRepo.ROLE_ADMIN)
  public void delete(UserDTO userDTO) {
    User user = userRepo.findByUsername(userDTO.getUsername()).orElseThrow();
    user.setEnabled(false);
  }

  public void changePassword(String newPassword, @CurrentUser User user) {
    user.setOneTimePassword(false);
    user.setPassword(passwordEncoder.encode(newPassword));
    userRepo.save(user);
  }
}
