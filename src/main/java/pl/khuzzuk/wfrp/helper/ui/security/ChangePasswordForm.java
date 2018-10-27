package pl.khuzzuk.wfrp.helper.ui.security;

import com.vaadin.flow.component.AttachEvent;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.data.binder.Binder.Binding;
import com.vaadin.flow.spring.annotation.UIScope;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.security.User;
import pl.khuzzuk.wfrp.helper.ui.WebComponent;
import pl.khuzzuk.wfrp.helper.ui.initialize.UIProperty;

import java.util.function.Consumer;

@RequiredArgsConstructor
@UIScope
@Component
public class ChangePasswordForm extends WebComponent {
    private final PasswordEncoder passwordEncoder;
    private final CurrentUserService currentUserService;

    @UIProperty
    private PasswordField oldPassword = new PasswordField("Old password");
    @UIProperty
    private PasswordField newPassword = new PasswordField("New password");
    @UIProperty
    private PasswordField retypePassword = new PasswordField("Retype password");
    @UIProperty
    private Button changeButton = new Button("Change Password");

    @Setter
    private Consumer<String> onPasswordChange;

    @Override
    public void afterPropertiesSet() {
        super.afterPropertiesSet();
        Binder<ChangePasswordRequest> binder = new Binder<>(ChangePasswordRequest.class);

        binder.forField(oldPassword).withValidator(password -> {
                    User user = currentUserService.getCurrentUser();
                    return user != null && passwordEncoder.matches(password, user.getPassword());
                }, "Wrong password")
                .bind(ChangePasswordRequest::getOldPassword, ChangePasswordRequest::setOldPassword);

        binder.forField(newPassword).bind(ChangePasswordRequest::getNewPassword, ChangePasswordRequest::setNewPassword);

        Binding<ChangePasswordRequest, String> retypePasswordBinding = binder.forField(retypePassword).withValidator(password ->
                password == null || password.equals(newPassword.getValue()), "New password does not match")
                .bind(ChangePasswordRequest::getNewPassword, ChangePasswordRequest::setNewPassword);

        newPassword.addValueChangeListener(event -> {
                    if (retypePassword.getValue() != null) {
                        retypePasswordBinding.validate();
                    }
                }
        );
        binder.setBean(new ChangePasswordRequest());
        retypePassword.addValueChangeListener(event -> retypePasswordBinding.validate());
        changeButton.addClickListener(e -> onPasswordChange.accept(binder.getBean().getNewPassword()));
    }

    @Override
    protected void onAttach(AttachEvent attachEvent) {
        super.onAttach(attachEvent);
        oldPassword.clear();
        newPassword.clear();
        retypePassword.clear();
    }
}
