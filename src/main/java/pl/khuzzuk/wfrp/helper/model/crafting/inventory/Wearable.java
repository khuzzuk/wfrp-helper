package pl.khuzzuk.wfrp.helper.model.crafting.inventory;

import lombok.Getter;
import lombok.Setter;
import pl.khuzzuk.wfrp.helper.model.crafting.resource.Resource;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.Set;

@Getter
@Setter
@Entity
abstract class Wearable extends Item {
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "item_determinants",
            joinColumns = @JoinColumn(name = "item_id"),
            inverseJoinColumns = @JoinColumn(name = "determinants_id"))
    private Set<Determinant> determinants;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "primary_resource_id")
    private Resource primaryResource;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "secondary_resource_id")
    private Resource secondaryResource;
}
