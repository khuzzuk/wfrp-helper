package pl.khuzzuk.wfrp.helper.security;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import pl.khuzzuk.wfrp.helper.security.jwt.JwtRequestFilter;
import pl.khuzzuk.wfrp.helper.security.oauth2.OAuth2AuthenticationSuccessHandler;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  private final JwtRequestFilter jwtRequestFilter;
  private final OAuth2AuthenticationSuccessHandler successHandler;

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  AuthenticationManager providedAuthenticationManager() throws Exception {
    return authenticationManager();
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    //@formatter:off
    http.csrf().disable().cors()
          .and()
        .formLogin().disable()
        .httpBasic().disable()
        .sessionManagement().sessionCreationPolicy(STATELESS)
          .and()
        .authorizeRequests()
          .antMatchers((HttpMethod) null, "/login*", "/static/**", "/*.{js,html,css,json}")
            .permitAll()
          .antMatchers("/auth/**", "/oauth2/**")
            .permitAll()
          .anyRequest()
            .hasAnyRole("USER")
          .and()
        .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
        .oauth2Login()
          .authorizationEndpoint()
            .baseUri("/oauth2/authorize")
            .and()
          .redirectionEndpoint()
            .baseUri("/oauth2/callback/*")
          .and()
        .successHandler(successHandler)
    ;//@formatter:on
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration corsConfiguration = new CorsConfiguration();
    corsConfiguration.setAllowedOrigins(List.of("*"));
    corsConfiguration.setAllowedMethods(List.of("HEAD", "GET", "POST", "PUT", "DELETE"));
    corsConfiguration.setAllowedHeaders(List.of("Content-Type"));

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", corsConfiguration);
    return source;
  }
}
