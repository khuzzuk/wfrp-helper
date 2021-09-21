package pl.khuzzuk.wfrp.helper.security.user;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.userdetails.UserDetails;
import pl.javahello.DTO;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;
import pl.khuzzuk.wfrp.helper.security.role.Role;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

import static javax.persistence.FetchType.EAGER;

@Getter
@Setter
@Entity
@Table(schema = "security")
@DTO
public class User extends BaseEntity implements UserDetails {
  @NaturalId
  private @Length(min = 3, max = 100) String username;
  private @NotNull String password;
  @DTO.Exclude
  private boolean accountNonExpired = true;
  @DTO.Exclude
  private boolean accountNonLocked = true;
  @DTO.Exclude
  private boolean credentialsNonExpired = true;
  @DTO.Exclude
  private boolean enabled = true;
  @ManyToMany(fetch = EAGER)
  @JoinTable(schema = "security",
             name = "user_roles",
             inverseJoinColumns = @JoinColumn(name = "roles_id"))
  private Set<Role> authorities;
}
