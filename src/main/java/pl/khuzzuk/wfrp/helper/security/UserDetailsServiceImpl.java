package pl.khuzzuk.wfrp.helper.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepo userRepo;
    private final CurrentUserService currentUserService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByName(username).orElseThrow(() -> new UsernameNotFoundException(username));
        currentUserService.setCurrentUser(user);
        return new org.springframework.security.core.userdetails.User(user.getName(), user.getPassword(),
                mapRoles(user.getRoles()));
    }

    private static Set<GrantedAuthority> mapRoles(Set<Role> roles) {
        return roles.stream()
                .map(Role::getName)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toSet());
    }
}
