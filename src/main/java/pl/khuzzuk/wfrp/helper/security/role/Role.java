package pl.khuzzuk.wfrp.helper.security.role;

import lombok.Data;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import org.springframework.security.core.GrantedAuthority;
import pl.khuzzuk.remote.DTO;

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
