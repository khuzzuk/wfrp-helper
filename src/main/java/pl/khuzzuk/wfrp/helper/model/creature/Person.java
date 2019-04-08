package pl.khuzzuk.wfrp.helper.model.creature;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import org.hibernate.envers.Audited;
import org.hibernate.envers.RelationTargetAuditMode;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.wfrp.helper.edit.Filter;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.Armor;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MeleeWeapon;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MiscItem;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.RangedWeapon;
import pl.khuzzuk.wfrp.helper.model.knowledge.Skill;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.Spell;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchool;
import pl.khuzzuk.wfrp.helper.model.professions.Profession;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Data
@EqualsAndHashCode(of = "name")
@Entity
@Audited
public class Person {
    @Id
    @SequenceGenerator(name = "person_seq_gen", sequenceName = "person_seq", allocationSize = 1)
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
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private @NotNull HairColor hairColor;
    @ManyToOne(fetch = FetchType.EAGER)
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private @NotNull EyeColor eyeColor;
    @ManyToMany
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private List<PhysicalFeature> physicalFeatures;
    private @Length(max = 500) String description;
    private @Length(max = 4096) String history;

    @Embedded
    private @NotNull PersonDeterminants determinants = PersonDeterminants.empty();

    @ManyToOne(fetch = FetchType.EAGER)
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private @NotNull Profession currentProfession;
    @ManyToMany
    @JoinTable(name = "person_professions",
            joinColumns = @JoinColumn(name = "person_id"),
            inverseJoinColumns = @JoinColumn(name = "profession_id"))
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private List<Profession> professions;

    @ManyToMany
    @JoinTable(name = "person_skills",
            joinColumns = @JoinColumn(name = "person_id"),
            inverseJoinColumns = @JoinColumn(name = "skills_id"))
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private List<Skill> skills;

    @ManyToMany
    @JoinTable(name = "person_inventory",
            joinColumns = @JoinColumn(name = "person_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private List<MiscItem> inventory;

    @ManyToMany
    @JoinTable(name = "person_melee_weapons",
            joinColumns = @JoinColumn(name = "person_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private List<MeleeWeapon> weapons;

    @ManyToMany
    @JoinTable(name = "person_ranged_weapons",
            joinColumns = @JoinColumn(name = "person_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private List<RangedWeapon> rangedWeapons;

    @ManyToMany
    @JoinTable(name = "person_ranged_weapons",
            joinColumns = @JoinColumn(name = "person_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private List<Armor> armors;

    @ElementCollection
    @Column(name = "level")
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private Map<SpellSchool, Integer> spellSchools;

    @ManyToMany
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private List<Spell> spells;

    @ManyToMany
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private Set<Animal> animals;
}
