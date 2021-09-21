package pl.khuzzuk.wfrp.helper.security.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
@Repository
public interface UserRepo extends JpaRepository<User, Long> {

  Optional<User> findByUsername(String name);

  /**
   * This duplicates {@link JpaRepository#getOne(Object)} since default methods ignores eager
   * loading on hibernate annotations.
   */
  Optional<User> findById(Long id);

  boolean existsByUsername(String username);

  boolean getUser_oneTimePasswordByUsername(String name);
}
