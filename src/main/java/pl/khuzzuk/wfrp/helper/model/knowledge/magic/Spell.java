package pl.khuzzuk.wfrp.helper.model.knowledge.magic;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.remote.RemoteEntity;
import pl.khuzzuk.wfrp.helper.edit.EditorType;
import pl.khuzzuk.wfrp.helper.edit.Filter;
import pl.khuzzuk.wfrp.helper.edit.FormElement;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MiscItem;
import pl.khuzzuk.wfrp.helper.model.rule.ActionTime;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
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
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@EqualsAndHashCode(of = "name")
@Entity
@RemoteEntity
public class Spell {
    @Id
    @SequenceGenerator(name = "spell_seq_gen", sequenceName = "spell_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "spell_seq_gen")
    private Long id;
    @NaturalId
    private @Length(min = 3, max = 64) String name;
    private @Length(max = 500) String description;
    private @NotNull @Length(min = 3, max = 500) String effect;
    private @Min(0) int level;
    private @Min(0) int manaCost;
    private @Min(0) int range;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "type", column = @Column(name = "prepare_type")),
            @AttributeOverride(name = "amount", column = @Column(name = "prepare_amount"))
    })
    private ActionTime prepareTime;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "type", column = @Column(name = "duration_type")),
            @AttributeOverride(name = "amount", column = @Column(name = "duration_amount"))
    })
    private ActionTime durationTime;

    @ManyToOne(fetch = FetchType.EAGER)
    private SpellSchool spellSchool;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "spell_ingredients",
            joinColumns = @JoinColumn(name = "spell_id"),
            inverseJoinColumns = @JoinColumn(name = "ingrediend_id"))
    private List<MiscItem> ingredients;
}
