package pl.khuzzuk.wfrp.helper.world.nation;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.khuzzuk.wfrp.helper.remote.RemoteService;
import pl.khuzzuk.wfrp.helper.repo.Adapter;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("nation")
@CrossOrigin
public class NationService implements RemoteService<NationDTO> {
    private NationRepo nationRepo;
    private Adapter<NationDTO, Nation> nationAdapter;
    private Adapter<Nation, NationDTO> nationDTOAdapter;

    @PostMapping
    @Override
    public NationDTO save(NationDTO nationDTO) {
        Nation nation = nationAdapter.map(nationDTO);
        Nation persisted = nationRepo.save(nation);
        return nationDTOAdapter.map(persisted);
    }

    @GetMapping
    @Override
    public List<NationDTO> findAll() {
        return nationDTOAdapter.list(nationRepo.findAll());
    }
}
