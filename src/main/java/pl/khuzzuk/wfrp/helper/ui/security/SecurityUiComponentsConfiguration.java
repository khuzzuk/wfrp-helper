package pl.khuzzuk.wfrp.helper.ui.security;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.spring.annotation.UIScope;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.context.SecurityContextHolder;

@Configuration
public class SecurityUiComponentsConfiguration {
    @Bean
    @UIScope
    Button logoutButton() {
        Button logout = new Button("Logout");
        logout.addClickListener(event -> {
            SecurityContextHolder.clearContext();
            logout.getUI().ifPresent(ui -> ui.navigate(LoginPage.class));
        });
        return logout;
    }
}
