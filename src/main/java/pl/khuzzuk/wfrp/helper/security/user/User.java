package pl.khuzzuk.wfrp.helper.security.user;

import static javax.persistence.FetchType.EAGER;

import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.userdetails.UserDetails;
import pl.javahello.DTO;
import pl.khuzzuk.wfrp.helper.security.role.Role;

@Data
@Entity
@Table(schema = "security")
@DTO
public class User implements UserDetails {

  @Id
  @SequenceGenerator(name = "user_seq_gen",
                     sequenceName = "user_id_seq",
                     schema = "security",
                     allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq_gen")
  private Long id;
  @NaturalId
  private @Length(min = 3, max = 100) String username;
  private @NotNull String password;
  private boolean oneTimePassword = true;
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
