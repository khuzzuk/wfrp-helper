package pl.khuzzuk.wfrp.helper.model.world.nation;

import org.mapstruct.Mapper;
import pl.khuzzuk.wfrp.helper.repo.Adapter;

@Mapper(componentModel = "spring")
public interface NationDTOAdapter extends Adapter<Nation, NationDTO> {
}
