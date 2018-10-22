package pl.khuzzuk.wfrp.helper;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.khuzzuk.wfrp.helper.security.Role;
import pl.khuzzuk.wfrp.helper.security.RoleRepo;
import pl.khuzzuk.wfrp.helper.security.User;
import pl.khuzzuk.wfrp.helper.security.UserRepo;

import java.util.Set;

@SpringBootApplication
public class WfrpHelperApplication {
    public static void main(String[] args) {
        SpringApplication.run(WfrpHelperApplication.class, args);
    }

    @Bean
    public CommandLineRunner registerAdmin(UserRepo userRepo, RoleRepo roleRepo, PasswordEncoder passwordEncoder) {
        return args -> {
            if (!userRepo.findByName("admin").isPresent()) {
                User user = new User();
                user.setName("admin");
                user.setPassword(passwordEncoder.encode("admin"));
                Role role_admin = roleRepo.findByName("ROLE_ADMIN").orElseThrow(RuntimeException::new);
                Role role_user = roleRepo.findByName("ROLE_USER").orElseThrow(RuntimeException::new);
                user.setRoles(Set.of(role_admin, role_user));
                userRepo.save(user);
            }
        };
    }
}
