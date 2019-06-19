package pl.khuzzuk.wfrp.helper.model.creature;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;
import org.hibernate.envers.RelationTargetAuditMode;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.remote.RemoteEntity;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.Armor;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MeleeWeapon;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MiscItem;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.RangedWeapon;
import pl.khuzzuk.wfrp.helper.model.knowledge.Skill;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.Spell;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchoolLevel;
import pl.khuzzuk.wfrp.helper.model.professions.Profession;
import pl.khuzzuk.wfrp.helper.model.professions.ProfessionClass;
import pl.khuzzuk.wfrp.helper.model.world.Race;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.List;
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
    private @Length(min = 3, max = 255) String name;
    @ManyToOne
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private Race race;
    private Gender gender;
    private @Min(0) int age;
    private @Min(0) int height;
    private @Min(0) float weight;
    @ManyToOne
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private @NotNull HairColor hairColor;
    @ManyToOne
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private @NotNull EyeColor eyeColor;
    @ManyToMany
    @JoinTable(schema = "creature")
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private List<PhysicalFeature> physicalFeatures;
    @ManyToOne
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private Character personality;
    private @Length(max = 500) String description;
    private @Length(max = 4096) String history;

    @Embedded
    private @NotNull PersonDeterminants determinants = PersonDeterminants.empty();

    @ManyToOne(fetch = FetchType.LAZY)
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private @NotNull ProfessionClass professionClass;

    @ManyToOne(fetch = FetchType.LAZY)
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private @NotNull Profession currentProfession;
    @ManyToMany(fetch = FetchType.LAZY)
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

    @ManyToMany
    @JoinTable(schema = "creature", name = "person_inventory",
            joinColumns = @JoinColumn(name = "person_id"),
            inverseJoinColumns = @JoinColumn(name = "item_id"))
    @NotAudited
    private List<MiscItem> inventory;

    @ManyToMany
    @JoinTable(schema = "creature", inverseJoinColumns = @JoinColumn(name = "item_id"))
    @NotAudited
    private List<MeleeWeapon> meleeWeapons;

    @ManyToMany
    @JoinTable(schema = "creature", inverseJoinColumns = @JoinColumn(name = "item_id"))
    @NotAudited
    private List<RangedWeapon> rangedWeapons;

    @ManyToMany
    @JoinTable(schema = "creature", inverseJoinColumns = @JoinColumn(name = "item_id"))
    @NotAudited
    private List<Armor> armor;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "person_id")
    @Audited
    private List<SpellSchoolLevel> spellSchools;

    @ManyToMany
    @JoinTable(schema = "creature")
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private List<Spell> spells;

    @ManyToMany
    @JoinTable(schema = "creature")
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private Set<Animal> animals;
}
