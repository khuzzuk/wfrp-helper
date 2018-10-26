package pl.khuzzuk.wfrp.helper.security;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByName(String name);

    boolean getUser_oneTimePasswordByName(String name);
}
