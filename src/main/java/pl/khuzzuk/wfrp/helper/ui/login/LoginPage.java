package pl.khuzzuk.wfrp.helper.ui.login;

import com.vaadin.flow.component.button.Button;
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
import pl.khuzzuk.wfrp.helper.ui.HomeView;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;

@Slf4j
@RequiredArgsConstructor
@Route("login")
@UIScope
public class LoginPage extends WebComponent {
    private final AuthenticationManager authenticationManager;

    @UIProperty
    private TextField username = new TextField("Username");
    @UIProperty
    private PasswordField password = new PasswordField("Password");
    @UIProperty
    private Button loginButton = new Button("Login");


    @Override
    public void afterPropertiesSet() throws Exception {
        super.afterPropertiesSet();
        loginButton.addClickListener(event -> {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username.getValue(), password.getValue()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            getUI().ifPresent(ui -> ui.navigate(HomeView.class));
        });
    }
}
