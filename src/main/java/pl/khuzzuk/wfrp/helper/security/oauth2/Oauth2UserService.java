package pl.khuzzuk.wfrp.helper.security.oauth2;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import pl.khuzzuk.wfrp.helper.security.role.RoleRepo;
import pl.khuzzuk.wfrp.helper.security.user.User;
import pl.khuzzuk.wfrp.helper.security.user.UserRepo;

import java.util.Set;

@RequiredArgsConstructor
@Service
public class Oauth2UserService extends DefaultOAuth2UserService {

  private final UserRepo userRepo;
  private final RoleRepo roleRepo;

  @Override
  public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    OAuth2User oAuth2User = super.loadUser(userRequest);

    String email = oAuth2User.getAttributes().get("email").toString();
    User user = userRepo.findByUsername(email).orElseGet(() -> createNewOauthUser(email));

    return GoogleOauth2User.create(oAuth2User.getAttributes(), user);
  }

  private User createNewOauthUser(String email) {
    User user = new User();
    user.setUsername(email);
    user.setAuthorities(Set.of(roleRepo.findByAuthority(RoleRepo.ROLE_USER).orElseThrow()));
    user.setCredentialsNonExpired(true);

    return userRepo.save(user);
  }
}
