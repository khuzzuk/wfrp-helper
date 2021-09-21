package pl.khuzzuk.wfrp.helper.model.creature;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;
import org.hibernate.envers.RelationTargetAuditMode;
import org.hibernate.validator.constraints.Length;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.Armor;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.Inventory;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MeleeWeapon;
import pl.khuzzuk.wfrp.helper.model.knowledge.Skill;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.Spell;
import pl.khuzzuk.wfrp.helper.model.knowledge.magic.SpellSchoolLevel;
import pl.khuzzuk.wfrp.helper.model.money.Money;
import pl.khuzzuk.wfrp.helper.model.professions.Profession;
import pl.khuzzuk.wfrp.helper.model.professions.ProfessionClass;
import pl.khuzzuk.wfrp.helper.model.world.Nation;
import pl.khuzzuk.wfrp.helper.model.world.Race;
import pl.khuzzuk.wfrp.helper.model.world.Religion;
import pl.khuzzuk.wfrp.helper.model.world.WorldLanguage;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(schema = "creature")
@Audited
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class Person extends BaseEntity {
    private @Length(min = 3, max = 255) String name;
    @ManyToOne
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private Race race;
    private Gender gender;
    private @Min(0) int age;
    private @Min(0) int height;
    private @Min(0) float weight;
    private @Min(0) int fatePoints;
    private @Min(0) int mana;
    private @Min(0) int currentMana;
    private @Min(0) int sanityPoints;
    private @Min(0) int totalExperience;
    private @Min(0) int experience;
    private String health;
    private String birthplace;
    private String parents;
    private String family;

    @ManyToOne
    @JoinColumn
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private Nation nation;
    @ManyToOne
    @JoinColumn
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private Religion religion;
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
    private @NotNull CreatureDeterminants determinants = CreatureDeterminants.empty();

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

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "person_id")
    private List<Inventory> inventory;

    @ManyToMany
    @JoinTable(schema = "creature", inverseJoinColumns = @JoinColumn(name = "item_id"))
    @NotAudited
    private List<MeleeWeapon> meleeWeapons;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "person_id")
    @NotAudited
    private List<PersonalRangedWeapon> rangedWeapons;

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

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "person_id")
    @Audited
    private List<Money> money;

    @ManyToMany
    @JoinTable(schema = "creature", inverseJoinColumns = @JoinColumn(name = "language_id"))
    @Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
    private List<WorldLanguage> languages;
}
