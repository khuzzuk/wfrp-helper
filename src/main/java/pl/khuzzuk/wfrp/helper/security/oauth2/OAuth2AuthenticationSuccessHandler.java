package pl.khuzzuk.wfrp.helper.security.oauth2;

import static pl.khuzzuk.wfrp.helper.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

import java.io.IOException;
import java.util.Set;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import pl.khuzzuk.wfrp.helper.WfrpHelperConfig;
import pl.khuzzuk.wfrp.helper.common.CookieUtils;
import pl.khuzzuk.wfrp.helper.security.jwt.JwtTokenProvider;
import pl.khuzzuk.wfrp.helper.security.role.RoleRepo;
import pl.khuzzuk.wfrp.helper.security.user.User;
import pl.khuzzuk.wfrp.helper.security.user.UserRepo;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  private final JwtTokenProvider jwtTokenProvider;
  private final HttpCookieOAuth2AuthorizationRequestRepository cookieOAuth2Repository;
  private final WfrpHelperConfig config;
  private final UserRepo userRepo;
  private final RoleRepo roleRepo;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request,
                                      HttpServletResponse response,
                                      Authentication authentication) throws IOException {

    if (response.isCommitted()) {
      log.warn("Unable to redirect oauth2 authentication");
      return;
    }

    String uriTemplate = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                                    .map(Cookie::getValue)
                                    .orElseGet(this::getDefaultTargetUrl);
/*
    if (!config.getOauth2().getAuthorizedRedirectUris().contains(uriTemplate)) {
      return;
    }
*/

    OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
    String email = (String) oauthUser.getAttributes().get("email");
    if (!userRepo.existsByUsername(email)) {
      createNewOauthUser(email);
    }

    String token = jwtTokenProvider.getToken(email);
    String redirectUri = UriComponentsBuilder.fromUriString(uriTemplate)
                                             .queryParam("token", token)
                                             .build()
                                             .toUriString();

    clearAuthenticationAttributes(request);
    getRedirectStrategy().sendRedirect(request, response, redirectUri);
  }

  private void createNewOauthUser(String email) {
    User user = new User();
    user.setUsername(email);
    user.setAuthorities(Set.of(roleRepo.findByAuthority(RoleRepo.ROLE_USER).orElseThrow()));
    user.setOneTimePassword(false);
    user.setPassword("oauth2");

    userRepo.save(user);
  }
}
