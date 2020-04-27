package pl.khuzzuk.wfrp.helper.service.determinant;

import java.util.stream.Collectors;
import javax.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.khuzzuk.wfrp.helper.model.creature.CreatureDeterminants;
import pl.khuzzuk.wfrp.helper.model.world.Race;
import pl.khuzzuk.wfrp.helper.model.world.RaceRepo;

@Service
@AllArgsConstructor
public class CreatureDeterminantService {

  private RaceRepo raceRepo;
  private DeterminantService determinantService;

  @Transactional
  CreatureDeterminants generateDeterminants(long raceId) {
    Race race = raceRepo.getOne(raceId);
    CreatureDeterminants determinants = new CreatureDeterminants();
    determinants.setDeterminants(race.getDeterminants()
                                     .stream()
                                     .map(determinant -> determinantService.resolveRolls(determinant))
                                     .collect(Collectors.toList()));
    return determinants;
  }
}
