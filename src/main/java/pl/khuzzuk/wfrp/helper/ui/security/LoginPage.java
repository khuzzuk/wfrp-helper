package pl.khuzzuk.wfrp.helper.ui.security;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.page.Push;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.spring.annotation.UIScope;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.khuzzuk.wfrp.helper.security.User;
import pl.khuzzuk.wfrp.helper.security.UserRepo;
import pl.khuzzuk.wfrp.helper.ui.HomeView;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;

@Slf4j
@RequiredArgsConstructor
@Route("login")
@Push
@UIScope
public class LoginPage extends WebComponent {
    private final AuthenticationManager authenticationManager;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final ChangePasswordForm changePasswordForm;

    @UIProperty
    private TextField username = new TextField("Username");
    @UIProperty
    private PasswordField password = new PasswordField("Password");
    @UIProperty
    private Button loginButton = new Button("Login");


    @Override
    public void afterPropertiesSet() {
        super.afterPropertiesSet();
        loginButton.addClickListener(event -> {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username.getValue(), password.getValue()));
            User user = userRepo.findByName(username.getValue()).get();
            if (user.isOneTimePassword()) {
                showChangePasswordDialog(user, authentication);
            } else {
                performAuthentication(authentication);
            }
        });
    }

    private void showChangePasswordDialog(User user, Authentication authentication) {
        changePasswordForm.setCurrentUser(user);
        changePasswordForm.setOnPasswordChange(pass -> {
            user.setPassword(passwordEncoder.encode(pass));
            user.setOneTimePassword(false);
            userRepo.save(user);
            performAuthentication(authentication);
        });
        Dialog changePasswordDialog = new Dialog(changePasswordForm);
        changePasswordDialog.open();
    }

    private void performAuthentication(Authentication authentication) {
        SecurityContextHolder.getContext().setAuthentication(authentication);
        getUI().ifPresent(ui -> ui.navigate(HomeView.class));
    }
}
