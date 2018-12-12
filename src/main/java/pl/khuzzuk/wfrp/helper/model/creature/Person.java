package pl.khuzzuk.wfrp.helper.model.creature;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.wfrp.helper.edit.Filter;
import pl.khuzzuk.wfrp.helper.model.inventory.Armor;
import pl.khuzzuk.wfrp.helper.model.inventory.MeleeWeapon;
import pl.khuzzuk.wfrp.helper.model.inventory.MiscItem;
import pl.khuzzuk.wfrp.helper.model.inventory.RangedWeapon;
import pl.khuzzuk.wfrp.helper.model.knowledge.Skill;
import pl.khuzzuk.wfrp.helper.model.magic.Spell;
import pl.khuzzuk.wfrp.helper.model.magic.SpellSchool;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.validation.constraints.Min;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Data
@EqualsAndHashCode(of = "name")
@Entity
public class Person {
    @Id
    @SequenceGenerator(name = "person_seq_gen", sequenceName = "person_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "person_seq_gen")
    private Long id;
    @NaturalId
    @Filter
    private @Length(min = 3, max = 255) String name;
    private Gender gender;
    private @Min(0) int age;
    private @Min(0) int height;
    private @Min(0) float weight;
    @ManyToOne(fetch = FetchType.EAGER)
    private HairColor hairColor;
    @ManyToOne(fetch = FetchType.EAGER)
    private EyeColor eyeColor;
    @ManyToMany
    private List<PhysicalFeature> physicalFeatures;
    private @Length(max = 500) String description;
    private @Length(max = 4096) String history;

    @Embedded
    private PersonDeterminants determinants = PersonDeterminants.empty();

    @ManyToMany
    private Set<Skill> skills;

    @ManyToMany
    @JoinTable(name = "person_inventory",
            joinColumns = @JoinColumn(name = "person_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    private List<MiscItem> inventory;

    @ManyToMany
    @JoinTable(name = "person_melee_weapons",
            joinColumns = @JoinColumn(name = "person_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    private List<MeleeWeapon> weapons;

    @ManyToMany
    @JoinTable(name = "person_ranged_weapons",
            joinColumns = @JoinColumn(name = "person_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    private List<RangedWeapon> rangedWeapons;

    @ManyToMany
    @JoinTable(name = "person_ranged_weapons",
            joinColumns = @JoinColumn(name = "person_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    private List<Armor> armors;

    @ElementCollection
    @Column(name = "level")
    private Map<SpellSchool, Integer> spellSchools;

    @ManyToMany
    private List<Spell> spells;

    @ManyToMany
    private Set<Animal> animals;
}
