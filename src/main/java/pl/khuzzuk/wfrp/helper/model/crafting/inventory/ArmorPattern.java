package pl.khuzzuk.wfrp.helper.model.crafting.inventory;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Length;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.common.EnumType;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Entity
@Table(schema = "crafting")
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class ArmorPattern extends BaseEntity {
    private @Length(min = 3, max = 100) String name;
    private @Length(max = 500) String description;
    private float priceMultiplier = 1;
    private float weight;
    private float strength;
    @Type(type = EnumType.DEF)
    private @NotNull Availability availability = Availability.COMMON;
}
