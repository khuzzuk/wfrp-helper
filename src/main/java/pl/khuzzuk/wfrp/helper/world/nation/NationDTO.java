package pl.khuzzuk.wfrp.helper.world.nation;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import pl.khuzzuk.wfrp.helper.repo.ListableDTO;

@Getter
@Setter
public class NationDTO extends ListableDTO {
    private Long id;
    private @Length(min = 3, max = 64) String name;
    private @Length(max = 500) String description;
}
