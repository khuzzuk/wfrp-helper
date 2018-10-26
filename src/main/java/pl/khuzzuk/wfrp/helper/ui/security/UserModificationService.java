package pl.khuzzuk.wfrp.helper.ui.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.security.User;
import pl.khuzzuk.wfrp.helper.security.UserRepo;

@Slf4j
@RequiredArgsConstructor
@Component
public class UserModificationService implements InitializingBean {
    private final UserRepo userRepo;
    private final Bus<Event> bus;
    private final PasswordEncoder passwordEncoder;
    private final String allowedPasswordCharacters = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    private final CurrentUserService currentUserService;

    @Override
    public void afterPropertiesSet() {
        bus.subscribingFor(Event.SECURITY_SAVE_USER).accept(this::save).subscribe();
        bus.subscribingFor(Event.SECURITY_DELETE_USER).accept(this::delete).subscribe();
        bus.subscribingFor(Event.SECURITY_CHANGE_PASSWORD).accept(this::changePassword).subscribe();
    }

    private void save(User user) {
        String password = RandomStringUtils.random(8, allowedPasswordCharacters);
        user.setPassword(passwordEncoder.encode(password));
        user.setOneTimePassword(true);
        log.info("Password for user {} is {}", user.getName(), password);
        userRepo.save(user);
    }

    private void delete(User user) {
        user.setDeleted(true);
        userRepo.save(user);
    }

    private void changePassword(String newPassword) {
        User currentUser = currentUserService.getCurrentUser();
        currentUser.setOneTimePassword(false);
        currentUser.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(currentUser);
    }
}
