package pl.khuzzuk.wfrp.helper.service.determinant;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import pl.khuzzuk.remote.Adapter;
import pl.khuzzuk.wfrp.helper.model.rule.Determinant;
import pl.khuzzuk.wfrp.helper.model.rule.DeterminantDTO;

@AllArgsConstructor
@RestController
@RequestMapping("determinant")
public class DeterminantRemoteService {
    private DeterminantService determinantService;
    private Adapter<Determinant, DeterminantDTO> determinantDTOAdapter;
    private Adapter<DeterminantDTO, Determinant> determinantAdapter;

    @PostMapping("addExperienceExtension")
    public DeterminantDTO addExperienceExtension(@RequestBody DeterminantDTO determinantDTO) {
        Determinant determinant = determinantAdapter.map(determinantDTO);
        Determinant extendedDeterminant = determinantService.addExperienceExtension(determinant);
        DeterminantDTO extendedDeterminantDTO = determinantDTOAdapter.map(extendedDeterminant);
        return extendedDeterminantDTO;
    }

    public DeterminantDTO removeExperienceExtension(@RequestBody DeterminantDTO determinantDTO) {
        Determinant determinant = determinantAdapter.map(determinantDTO);

    }
}
