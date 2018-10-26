package pl.khuzzuk.wfrp.helper.ui.security;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;
import pl.khuzzuk.wfrp.helper.security.User;

@Component
@SessionScope
@Setter(AccessLevel.PACKAGE)
@Getter
public class CurrentUserService {
    private User currentUser;
}
