package pl.khuzzuk.wfrp.helper.multimedia;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.khuzzuk.wfrp.helper.model.world.Place;

import java.util.List;

@Repository
public interface PictureRepo extends JpaRepository<Picture, Long> {
  List<SavedImage> findAllBy();

  List<SavedImage> getAllByPlace(Place place);
}
