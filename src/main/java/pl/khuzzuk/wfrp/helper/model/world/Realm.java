package pl.khuzzuk.wfrp.helper.model.world;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;
import pl.khuzzuk.remote.RemoteEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import java.util.List;

@Getter
@Setter
@Entity
@RemoteEntity
public class Realm {
    @SequenceGenerator(name = "realm_id_seq_gen", schema = "world", sequenceName = "realm_id_seq")
    @GeneratedValue
    @Id
    private Long id;
    @NaturalId
    private String name;
    private List<Nation> nations;
}
