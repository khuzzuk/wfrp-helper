package pl.khuzzuk.wfrp.helper.security.role;

import lombok.Data;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.GrantedAuthority;
import pl.javahello.DTO;

import javax.persistence.*;

@Data
@Entity
@Table(schema = "security")
@DTO
public class Role implements GrantedAuthority {
    @Id
    @SequenceGenerator(name = "role_seq_gen", sequenceName = "role_id_seq", schema = "security", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_seq_gen")
    private Long id;
    @NaturalId
    private @Length(min = 3, max = 100) String authority;
}
