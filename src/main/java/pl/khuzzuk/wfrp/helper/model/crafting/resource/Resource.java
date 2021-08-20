package pl.khuzzuk.wfrp.helper.model.crafting.resource;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Length;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.common.EnumType;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.Availability;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@EqualsAndHashCode(of = "name", callSuper = false)
@Entity
@Table(schema = "crafting")
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class Resource extends BaseEntity {
    @Id
    @SequenceGenerator(name = "resource_seq_gen", schema = "crafting", sequenceName = "resource_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "resource_seq_gen")
    private Long id;
    @NaturalId
    private @Length(min = 3, max = 100) String name;
    private @Length(max = 500) String description;
    private float priceMultiplier = 1;
    private float weight;
    private float durability;
    private float strength;
    @Type(type = EnumType.DEF)
    private @NotNull Availability availability = Availability.COMMON;
}
