package pl.khuzzuk.wfrp.helper.security.oauth2;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.stereotype.Repository;
import pl.khuzzuk.wfrp.helper.common.CookieUtils;

/**
 * Uses a state parameter to prevent CSRF attacks. The application sends state in the authorization
 * request during authentication. OAuth2 provider (google) returns it in the OAuth2 callback. On
 * callback this repository compares the value of the state parameter returned from the OAuth2
 * provider with the value that it had sent initially.
 * <p>
 * Stateless api needs to store the state parameter somewhere. This repository will be storing the
 * state as well as the redirect_uri in a short-lived cookie. The following class provides
 * functionality for storing the authorization request in cookies and retrieving it.
 */
@Repository
public class HttpCookieOAuth2AuthorizationRequestRepository implements
    AuthorizationRequestRepository<OAuth2AuthorizationRequest> {

  public static final String OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME = "oauth2_auth_request";
  public static final String REDIRECT_URI_PARAM_COOKIE_NAME = "redirect_uri";
  private static final int cookieExpireSeconds = 180;

  @Override
  public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {
    return CookieUtils.deserialize(request,
                                   OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME,
                                   OAuth2AuthorizationRequest.class).orElse(null);
  }

  @Override
  public void saveAuthorizationRequest(OAuth2AuthorizationRequest authorizationRequest,
                                       HttpServletRequest request,
                                       HttpServletResponse response) {
    if (authorizationRequest == null) {
      CookieUtils.deleteCookie(request, response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME);
      CookieUtils.deleteCookie(request, response, REDIRECT_URI_PARAM_COOKIE_NAME);
    }

    CookieUtils.addCookie(response,
                          OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME,
                          CookieUtils.serialize(authorizationRequest),
                          cookieExpireSeconds);

    String redirectUri = request.getParameter(REDIRECT_URI_PARAM_COOKIE_NAME);
    if (StringUtils.isNotBlank(redirectUri)) {
      CookieUtils.addCookie(response,
                            REDIRECT_URI_PARAM_COOKIE_NAME,
                            redirectUri,
                            cookieExpireSeconds);
    }
  }

  @Override
  public OAuth2AuthorizationRequest removeAuthorizationRequest(HttpServletRequest request) {
    return this.loadAuthorizationRequest(request);
  }

  public void removeAuthorizationFromRequest(HttpServletRequest request,
                                             HttpServletResponse response) {
    CookieUtils.deleteCookie(request, response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME);
    CookieUtils.deleteCookie(request, response, REDIRECT_URI_PARAM_COOKIE_NAME);
  }
}
