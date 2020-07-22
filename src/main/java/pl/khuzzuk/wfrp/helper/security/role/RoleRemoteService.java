package pl.khuzzuk.wfrp.helper.security.role;

import java.util.List;
import javax.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.javahello.Adapter;

@RestController
@RequestMapping("role")
@AllArgsConstructor
public class RoleRemoteService {
  private RoleRepo roleRepo;
  private Adapter<Role, RoleDTO> roleDTOAdapter;

  @GetMapping
  @Transactional
  public List<RoleDTO> getRoles() {
    return roleDTOAdapter.list(roleRepo.findAll());
  }
}
