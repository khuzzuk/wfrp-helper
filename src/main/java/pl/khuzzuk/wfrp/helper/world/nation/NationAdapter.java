package pl.khuzzuk.wfrp.helper.world.nation;

import org.mapstruct.Mapper;
import pl.khuzzuk.wfrp.helper.repo.Adapter;

@Mapper(componentModel = "spring")
public interface NationAdapter extends Adapter<NationDTO, Nation> {
}
