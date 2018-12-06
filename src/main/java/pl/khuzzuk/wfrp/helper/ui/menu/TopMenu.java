package pl.khuzzuk.wfrp.helper.ui.menu;

import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.spring.annotation.UIScope;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.security.Role;
import pl.khuzzuk.wfrp.helper.security.User;
import pl.khuzzuk.wfrp.helper.security.UserModificationService;
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
public class TopMenu extends WebComponent implements InitializingBean {
    private static final String ROLE_ADMIN = "ROLE_ADMIN";
    private final MainContent content;
    private final ChangePasswordForm changePasswordForm;
    private final UserModificationService userModificationService;

    @UIProperty
    @CSS(classNames = {"button", "menu-button"}, id = "logout-button")
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

    private Dialog dialog = new Dialog();

    @Override
    public void afterPropertiesSet() {
        dialog.add(changePasswordForm);
    }

    private void refreshView() {
        remove(usersButton, rolesButton);
        content.removeAll();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.isAuthenticated() && isAdmin(authentication.getAuthorities())) {
            add(usersButton, rolesButton);
            rolesButton.addClickListener(event -> showCrud(roleCrud));
            usersButton.addClickListener(event -> showCrud(userCrud));
        }

        changePasswordForm.setOnPasswordChange(newPassword -> {
            userModificationService.changePassword(newPassword);
            dialog.close();
        });

        currentUserButton.addClickListener(event -> {
            content.removeAll();
            content.add(changePasswordButton);
            changePasswordButton.addClickListener(e -> dialog.open());
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

    @Override
    protected void onAttach(AttachEvent attachEvent) {
        super.onAttach(attachEvent);
        refreshView();
    }
}
