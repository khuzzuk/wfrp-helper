package pl.khuzzuk.wfrp.helper.multimedia;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import javax.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import pl.javahello.Adapter;
import pl.khuzzuk.wfrp.helper.model.world.Place;
import pl.khuzzuk.wfrp.helper.model.world.Scenario;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("picture")
public class PictureRemoteService {

  private PictureRepo pictureRepo;
  private JpaRepository<Place, Long> placeRepo;
  private JpaRepository<Scenario, Long> scenarioRepo;
  private Adapter<SavedImage, SavedImageDTO> savedImageDTOAdapter;

  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public SavedImage uploadFile(@RequestParam MultipartFile file) throws IOException {
    log.info("Saving image to database");
    Picture picture = new Picture();
    picture.setName(file.getOriginalFilename());
    picture.setImage(file.getBytes());

    Picture persistedPicture = pictureRepo.save(picture);
    log.info("Saved image to database: {}", persistedPicture.getId());
    return SavedImage.builder()
                     .id(persistedPicture.getId())
                     .name(persistedPicture.getName())
                     .build();
  }

  @GetMapping
  @Transactional
  public List<SavedImageDTO> imageList() {
    List<SavedImage> savedImages = pictureRepo.findAllBy();
    return savedImageDTOAdapter.list(savedImages);
  }

  @GetMapping("{id}")
  @Transactional
  public void getImage(@PathVariable long id, HttpServletResponse response) throws IOException {
    if (!pictureRepo.existsById(id)) {
      log.info("Requested image id: {}", id);
      response.setStatus(HttpStatus.NOT_FOUND.value());
    }

    Picture picture = pictureRepo.findById(id).orElseThrow();

    response.setContentType("image/jpeg, image/jpg, image/png");
    response.getOutputStream().write(picture.getImage());
  }

  @PostMapping
  @Transactional
  public void updatePicture(@RequestBody @Valid UpdateImageRequest updates) {
    Picture picture = pictureRepo.getOne(updates.id);
    picture.setName(updates.name);
    if (updates.placeId != null) {
      picture.setPlace(placeRepo.getOne(updates.placeId));
    }
  }

  @DeleteMapping
  public void deletePicture(@RequestBody @Valid SavedImage image) {
    pictureRepo.deleteById(image.getId());
  }

  @Transactional
  @GetMapping("scenario/{id}")
  public List<Long> getPicturesForScenario(@PathVariable long id) {
    Scenario scenario = scenarioRepo.getOne(id);
    return scenario.getPlaces()
                   .stream()
                   .map(place -> pictureRepo.getAllByPlace(place))
                   .flatMap(Collection::stream)
                   .map(SavedImage::getId)
                   .collect(Collectors.toList());
  }

  @Data
  static class UpdateImageRequest {
    private long id;
    private String name;
    private Long placeId;
  }
}
