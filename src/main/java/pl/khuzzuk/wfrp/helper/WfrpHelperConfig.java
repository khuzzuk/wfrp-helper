package pl.khuzzuk.wfrp.helper;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "app")
public class WfrpHelperConfig {
  private Auth auth;
  private Oauth2 oauth2;

  @Data
  public static class Auth {
    private String tokenSecret;
    private int tokenExpirationSeconds;
  }

  @Data
  static class Oauth2 {
    private String authorizedRedirectUris;
  }
}
