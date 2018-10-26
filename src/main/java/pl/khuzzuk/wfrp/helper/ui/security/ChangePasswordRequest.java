package pl.khuzzuk.wfrp.helper.ui.security;

import lombok.Data;

@Data
public class ChangePasswordRequest {
    private String oldPassword;
    private String newPassword;
    private String retypePassword;
}
