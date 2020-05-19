package pl.khuzzuk.wfrp.helper;

import static pl.khuzzuk.wfrp.helper.security.role.RoleRepo.ROLE_ADMIN;
import static pl.khuzzuk.wfrp.helper.security.role.RoleRepo.ROLE_USER;

import java.util.Set;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import pl.khuzzuk.wfrp.helper.security.role.Role;
import pl.khuzzuk.wfrp.helper.security.role.RoleRepo;
import pl.khuzzuk.wfrp.helper.security.user.User;
import pl.khuzzuk.wfrp.helper.security.user.UserRepo;

@SpringBootApplication
@EnableTransactionManagement
@EnableConfigurationProperties(WfrpHelperConfig.class)
public class WfrpHelperApplication {

  public static void main(String[] args) {
    SpringApplication.run(WfrpHelperApplication.class, args);
  }

  @Bean
  public CommandLineRunner registerAdmin(UserRepo userRepo,
                                         RoleRepo roleRepo,
                                         PasswordEncoder passwordEncoder) {
    return args -> {
      if (userRepo.findByUsername("admin").isEmpty()) {
        User user = new User();
        user.setUsername("admin");
        user.setPassword(passwordEncoder.encode("admin"));
        Role role_admin = roleRepo.findByAuthority(ROLE_ADMIN).orElseThrow(RuntimeException::new);
        Role role_user = roleRepo.findByAuthority(ROLE_USER).orElseThrow(RuntimeException::new);
        user.setAuthorities(Set.of(role_admin, role_user));
        userRepo.save(user);
      }
    };
  }
}
