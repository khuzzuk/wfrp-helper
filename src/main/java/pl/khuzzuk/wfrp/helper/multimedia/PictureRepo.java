package pl.khuzzuk.wfrp.helper.multimedia;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.khuzzuk.wfrp.helper.model.world.Place;
import pl.khuzzuk.wfrp.helper.multimedia.PictureRemoteService.SavedImage;

@Repository
public interface PictureRepo extends JpaRepository<Picture, Long> {
  List<SavedImage> findAllBy();

  List<SavedImage> getAllByPlace(Place place);
}
