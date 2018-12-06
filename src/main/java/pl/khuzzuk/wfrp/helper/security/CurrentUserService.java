package pl.khuzzuk.wfrp.helper.security;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

@Component
@SessionScope(proxyMode = ScopedProxyMode.TARGET_CLASS)
@Setter(AccessLevel.PACKAGE)
@Getter
public class CurrentUserService {
    private User currentUser;
}
