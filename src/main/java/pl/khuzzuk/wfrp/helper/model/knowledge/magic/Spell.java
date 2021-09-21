package pl.khuzzuk.wfrp.helper.model.knowledge.magic;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import pl.javahello.RemoteEntity;
import pl.javahello.RemoteEntity.SecuredService;
import pl.khuzzuk.wfrp.helper.model.crafting.inventory.MiscItem;
import pl.khuzzuk.wfrp.helper.model.rule.ActionTime;
import pl.khuzzuk.wfrp.helper.repo.BaseEntity;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@Entity
@Table(schema = "magic")
@RemoteEntity(transactional = true, stomp = true)
@SecuredService(allowRead = true)
public class Spell extends BaseEntity {
  private @Length(min = 3, max = 64) String name;
  private @Length(max = 500) String description;
  private @NotNull @Length(min = 3, max = 500) String effect;
  private @Min(0) int level;
  private @Min(0) int manaCost;
  private @Min(0) int range;

  @Embedded
  @AttributeOverrides({@AttributeOverride(name = "type", column = @Column(name = "prepare_type")),
                       @AttributeOverride(name = "amount",
                                          column = @Column(name = "prepare_amount"))})
  private ActionTime prepareTime;

  @Embedded
  @AttributeOverrides({@AttributeOverride(name = "type", column = @Column(name = "duration_type")),
                       @AttributeOverride(name = "amount",
                                          column = @Column(name = "duration_amount"))})
  private ActionTime durationTime;

  @ManyToOne(fetch = FetchType.EAGER)
  private SpellSchool spellSchool;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "spell_ingredients",
             schema = "magic",
             joinColumns = @JoinColumn(name = "spell_id"),
             inverseJoinColumns = @JoinColumn(name = "ingrediend_id"))
  private List<MiscItem> ingredients;
}
