package pl.khuzzuk.wfrp.helper.model.world.nation;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.khuzzuk.remote.RemoteService;
import pl.khuzzuk.wfrp.helper.repo.Adapter;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("nation")
public class NationService implements RemoteService<NationDTO> {
    private NationRepo nationRepo;
    private Adapter<NationDTO, Nation> nationAdapter;
    private Adapter<Nation, NationDTO> nationDTOAdapter;

    @PostMapping
    @Override
    public NationDTO save(@Valid @RequestBody NationDTO nationDTO) {
        Nation nation = nationAdapter.map(nationDTO);
        Nation persisted = nationRepo.save(nation);
        return nationDTOAdapter.map(persisted);
    }

    @DeleteMapping
    @Override
    public void delete(@Valid @RequestBody NationDTO nationDTO) {
        Nation nation = nationAdapter.map(nationDTO);
        nationRepo.delete(nation);
    }

    @GetMapping
    @Override
    public List<NationDTO> findAll() {
        return nationDTOAdapter.list(nationRepo.findAll());
    }
}
