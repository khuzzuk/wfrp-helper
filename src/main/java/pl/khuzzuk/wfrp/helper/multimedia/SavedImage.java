package pl.khuzzuk.wfrp.helper.multimedia;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import pl.javahello.DTO;
import pl.khuzzuk.wfrp.helper.model.world.Place;

@Data // getters/setters for json mapping
@AllArgsConstructor // for projection query
@Builder
@DTO
class SavedImage {

  private long id;
  private String name;
  private Place place;
}
