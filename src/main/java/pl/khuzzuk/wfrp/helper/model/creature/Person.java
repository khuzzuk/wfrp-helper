package pl.khuzzuk.wfrp.helper.model.creature;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;
import org.hibernate.envers.Audited;
import org.hibernate.envers.RelationTargetAuditMode;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.remote.RemoteEntity;
import pl.khuzzuk.wfrp.helper.edit.Filter;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.Armor;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MeleeWeapon;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MiscItem;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.RangedWeapon;
import pl.khuzzuk.wfrp.helper.model.knowledge.Skill;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.Spell;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchool;
import pl.khuzzuk.wfrp.helper.model.professions.Profession;
import pl.khuzzuk.wfrp.helper.model.professions.ProfessionClass;

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
import javax.persistence.MapKeyJoinColumn;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Getter
@Setter
@EqualsAndHashCode(of = "name")
@Entity
@Table(schema = "creature")
@Audited
@RemoteEntity
public class Person {
    @Id
    @SequenceGenerator(name = "person_seq_gen", schema = "creature", sequenceName = "person_id_seq", allocationSize = 1)
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
    @JoinTable(schema = "creature")
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private List<PhysicalFeature> physicalFeatures;
    private @Length(max = 500) String description;
    private @Length(max = 4096) String history;

    @Embedded
    private @NotNull PersonDeterminants determinants = PersonDeterminants.empty();

    @ManyToOne
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private @NotNull ProfessionClass professionClass;

    @ManyToOne(fetch = FetchType.EAGER)
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private @NotNull Profession currentProfession;
    @ManyToMany
    @JoinTable(name = "person_professions",
            schema = "creature",
            joinColumns = @JoinColumn(name = "person_id"),
            inverseJoinColumns = @JoinColumn(name = "profession_id"))
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private List<Profession> professions;

    @ManyToMany
    @JoinTable(schema = "creature")
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private List<Skill> skills;

    @ElementCollection
    @JoinTable(schema = "creature")
    @Column(name = "amount")
    @MapKeyJoinColumn(name = "item_id")
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private Map<MiscItem, Integer> inventory;

    @ManyToMany
    @JoinTable(schema = "creature", inverseJoinColumns = @JoinColumn(name = "item_id"))
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private List<MeleeWeapon> meleeWeapons;

    @ManyToMany
    @JoinTable(schema = "creature", inverseJoinColumns = @JoinColumn(name = "item_id"))
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private List<RangedWeapon> rangedWeapons;

    @ManyToMany
    @JoinTable(schema = "creature", inverseJoinColumns = @JoinColumn(name = "item_id"))
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private List<Armor> armor;

    @ElementCollection
    @JoinTable(schema = "creature")
    @Column(name = "level")
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private Map<SpellSchool, Integer> spellSchools;

    @ManyToMany
    @JoinTable(schema = "creature")
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private List<Spell> spells;

    @ManyToMany
    @JoinTable(schema = "creature")
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private Set<Animal> animals;
}
