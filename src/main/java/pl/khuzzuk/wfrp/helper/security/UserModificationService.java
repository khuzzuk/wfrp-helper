package pl.khuzzuk.wfrp.helper.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.ui.security.CurrentUserService;

@Slf4j
@RequiredArgsConstructor
@Component
public class UserModificationService {
    private final UserRepo userRepo;
    private final Bus<Event> bus;
    private final PasswordEncoder passwordEncoder;
    private final String allowedCharacters = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    private final CurrentUserService currentUserService;

    public void save(User user) {
        String password = RandomStringUtils.random(8, allowedCharacters);
        user.setPassword(passwordEncoder.encode(password));
        user.setOneTimePassword(true);
        log.info("Password for user {} is {}", user.getName(), password);
        userRepo.save(user);
        refreshUsers();
    }

    public void delete(User user) {
        user.setDeleted(true);
        userRepo.save(user);
        refreshUsers();
    }

    public void changePassword(String newPassword) {
        User currentUser = currentUserService.getCurrentUser();
        currentUser.setOneTimePassword(false);
        currentUser.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(currentUser);
    }

    private void refreshUsers() {
        bus.message(Event.FIND_ALL).withContent(User.class).send();
    }
}
