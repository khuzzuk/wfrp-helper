package pl.khuzzuk.wfrp.helper.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.khuzzuk.wfrp.helper.model.Race;

interface RaceRepo extends JpaRepository<Race, Long> {
}
