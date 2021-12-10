package pl.khuzzuk.wfrp.helper.service.determinant;

import javax.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.javahello.Adapter;
import pl.khuzzuk.wfrp.helper.model.creature.CreatureDeterminants;
import pl.khuzzuk.wfrp.helper.model.creature.CreatureDeterminantsDTO;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;
import pl.khuzzuk.wfrp.helper.model.rule.DeterminantDTO;
import pl.khuzzuk.wfrp.helper.security.authorities.PersonAuthority;
import pl.khuzzuk.wfrp.helper.security.authorities.RaceAuthority;
import pl.khuzzuk.wfrp.helper.security.authorities.UserAuthority;

@AllArgsConstructor
@RestController
@RequestMapping(value = "determinant", produces = "application/json")
public class DeterminantRemoteService {

  private DeterminantService determinantService;
  private CreatureDeterminantService creatureDeterminantService;
  private Adapter<Determinant, DeterminantDTO> determinantDTOAdapter;
  private Adapter<DeterminantDTO, Determinant> determinantAdapter;
  private Adapter<CreatureDeterminants, CreatureDeterminantsDTO> creatureDeterminantsDTOAdapter;

  @PostMapping("addExperienceExtension")
  @Transactional
  public DeterminantDTO addExperienceExtension(@RequestBody DeterminantDTO determinantDTO) {
    Determinant determinant = determinantAdapter.map(determinantDTO);
    Determinant extendedDeterminant = determinantService.addExperienceExtension(determinant);
    return determinantDTOAdapter.map(extendedDeterminant);
  }

  @PostMapping("removeExperienceExtension")
  @Transactional
  public DeterminantDTO removeExperienceExtension(@RequestBody DeterminantDTO determinantDTO) {
    Determinant determinant = determinantAdapter.map(determinantDTO);
    Determinant afterRemove = determinantService.removeExperienceExtension(determinant);
    return determinantDTOAdapter.map(afterRemove);
  }

  @UserAuthority
  @RaceAuthority
  @PersonAuthority
  @GetMapping(value = "generateDeterminants/{raceId}", produces = "application/json")
  @Transactional
  public CreatureDeterminantsDTO generateDeterminants(@PathVariable long raceId) {
    CreatureDeterminants determinants = creatureDeterminantService.generateDeterminants(raceId);
      return creatureDeterminantsDTOAdapter.map(determinants);
  }
}
