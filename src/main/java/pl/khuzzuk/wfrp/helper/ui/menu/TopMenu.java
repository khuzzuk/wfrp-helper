package pl.khuzzuk.wfrp.helper.ui.menu;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.spring.annotation.UIScope;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import pl.khuzzuk.messaging.Bus;
import pl.khuzzuk.wfrp.helper.event.Event;
import pl.khuzzuk.wfrp.helper.security.Role;
import pl.khuzzuk.wfrp.helper.security.User;
import pl.khuzzuk.wfrp.helper.ui.MainContent;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;
import pl.khuzzuk.wfrp.helper.ui.crud.Crud;
import pl.khuzzuk.wfrp.helper.ui.initialize.CSS;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;
import pl.khuzzuk.wfrp.helper.ui.security.ChangePasswordForm;

import java.util.Collection;

@RequiredArgsConstructor
@UIScope
@Component
@Tag("TopMenu")
public class TopMenu extends WebComponent {
    private static final String ROLE_ADMIN = "ROLE_ADMIN";
    private final MainContent content;
    private final ChangePasswordForm changePasswordForm;
    private final Bus<Event> bus;

    @UIProperty
    @CSS(classNames = {"button", "menu-button"})
    private final Button logoutButton;
    @UIProperty
    @CSS(classNames = {"button", "menu-button"})
    private Button currentUserButton = new Button("Settings");
    @CSS(classNames = {"button", "menu-button"})
    private Button usersButton = new Button("Users");
    @CSS(classNames = {"button", "menu-button"})
    private Button rolesButton = new Button("Roles");
    @CSS(classNames = {"button", "menu-button"})
    private Button changePasswordButton = new Button("Change password");

    @CSS(classNames = {"crud", "content"})
    private final Crud<Role> roleCrud;
    @CSS(classNames = {"crud", "content"})
    private final Crud<User> userCrud;

    @Override
    public void afterPropertiesSet() {
        super.afterPropertiesSet();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated() && isAdmin(authentication.getAuthorities())) {
            add(usersButton, rolesButton);
            rolesButton.addClickListener(event -> showCrud(roleCrud));
            usersButton.addClickListener(event -> showCrud(userCrud));
        }

        Dialog dialog = new Dialog();
        changePasswordForm.setOnPasswordChange(newPassword -> {
            bus.message(Event.SECURITY_CHANGE_PASSWORD).withContent(newPassword).send();
            dialog.close();
        });

        currentUserButton.addClickListener(event -> {
            content.removeAll();
            content.add(changePasswordButton);
            changePasswordButton.addClickListener(e -> {
                dialog.add(changePasswordForm);
                dialog.open();
            });
        });
    }

    private void showCrud(Crud<?> crud) {
        content.removeAll();
        content.add(crud);
    }

    private static boolean isAdmin(Collection<? extends GrantedAuthority> authorities) {

        return authorities.stream()
                .filter(grantedAuthority -> grantedAuthority instanceof SimpleGrantedAuthority)
                .map(SimpleGrantedAuthority.class::cast)
                .map(SimpleGrantedAuthority::getAuthority)
                .anyMatch(ROLE_ADMIN::equals);
    }
}
