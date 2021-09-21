package pl.khuzzuk.wfrp.helper.security.oauth2;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import pl.khuzzuk.wfrp.helper.security.user.User;

import java.util.Collection;
import java.util.Map;

@Getter
public class GoogleOauth2User implements OAuth2User, UserDetails {
  private Map<String, Object> attributes;
  private User user;

  public static GoogleOauth2User create(Map<String, Object> attributes, User user) {
    GoogleOauth2User googleOauth2User = new GoogleOauth2User();
    googleOauth2User.attributes = attributes;
    googleOauth2User.user = user;
    return googleOauth2User;
  }

  @Override
  public String getPassword() {
    return user.getPassword();
  }

  @Override
  public String getUsername() {
    return user.getUsername();
  }

  @Override
  public boolean isAccountNonExpired() {
    return user.isAccountNonExpired();
  }

  @Override
  public boolean isAccountNonLocked() {
    return user.isAccountNonLocked();
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return user.isCredentialsNonExpired();
  }

  @Override
  public boolean isEnabled() {
    return user.isEnabled();
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return user.getAuthorities();
  }

  @Override
  public Map<String, Object> getAttributes() {
    return attributes;
  }

  @Override
  public String getName() {
    return (String) attributes.get("name");
  }

  public String getEmail() {
    return (String) attributes.get("email");
  }

  public String getImageUrl() {
    return (String) attributes.get("picture");
  }
}
