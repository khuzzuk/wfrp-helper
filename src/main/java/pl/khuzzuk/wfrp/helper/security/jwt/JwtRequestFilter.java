package pl.khuzzuk.wfrp.helper.security.jwt;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import pl.khuzzuk.wfrp.helper.security.user.User;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Component
public class JwtRequestFilter extends OncePerRequestFilter {

  private static final String TOKEN_PREFIX = "Bearer ";

  private final JwtTokenProvider tokenProvider;

  @Override
  protected void doFilterInternal(HttpServletRequest request,
                                  HttpServletResponse response,
                                  FilterChain filterChain) throws ServletException, IOException {
    String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    if (StringUtils.startsWith(authHeader, TOKEN_PREFIX)) {
      String token = authHeader.replaceFirst(TOKEN_PREFIX, "");
      tokenProvider.getUser(token).ifPresent(user -> authenticateUser(user, request));
    }

    filterChain.doFilter(request, response);
  }

  private void authenticateUser(User user, HttpServletRequest request) {
    AbstractAuthenticationToken authentication =
        new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    SecurityContextHolder.getContext().setAuthentication(authentication);
  }
}
