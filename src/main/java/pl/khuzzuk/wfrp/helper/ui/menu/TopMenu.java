package pl.khuzzuk.wfrp.helper.ui.menu;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.spring.annotation.UIScope;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.security.Role;
import pl.khuzzuk.wfrp.helper.ui.MainContent;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;
import pl.khuzzuk.wfrp.helper.ui.crud.Crud;
import pl.khuzzuk.wfrp.helper.ui.initialize.CSS;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;

import java.util.Collection;

@RequiredArgsConstructor
@UIScope
@Component
@Tag("TopMenu")
public class TopMenu extends WebComponent {
    private static final String ROLE_ADMIN = "ROLE_ADMIN";
    private final MainContent content;
    @UIProperty
    @CSS(classNames = {"button", "menu-button"})
    private Button currentUserButton = new Button("Settings");
    @CSS(classNames = {"button", "menu-button"})
    private Button usersButton = new Button("Users");
    @CSS(classNames = {"button", "menu-button"})
    private Button rolesButton = new Button("Roles");

    @CSS(classNames = {"crud", "content"})
    private final Crud<Role> roleCrud;

    @Override
    public void afterPropertiesSet() {
        super.afterPropertiesSet();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated() && isAdmin(authentication.getAuthorities())) {
            add(usersButton, rolesButton);
            rolesButton.addClickListener(event -> {
                content.removeAll();
                content.add(roleCrud);
            });
        }
    }

    private static boolean isAdmin(Collection<? extends GrantedAuthority> authorities) {

        return authorities.stream()
                .filter(grantedAuthority -> grantedAuthority instanceof SimpleGrantedAuthority)
                .map(SimpleGrantedAuthority.class::cast)
                .map(SimpleGrantedAuthority::getAuthority)
                .anyMatch(ROLE_ADMIN::equals);
    }
}
