package pl.khuzzuk.wfrp.helper.repo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import pl.khuzzuk.wfrp.helper.common.ReflectionUtils;

import java.util.List;

@SuppressWarnings("ClassIndependentOfModule")
@Slf4j
@RequiredArgsConstructor
@Configuration
class RepoDispatcherConfigurer {
    private final RepoDispatcher repoDispatcher;

    @SuppressWarnings({"unchecked", "RawTypeCanBeGeneric"})
    @Autowired
    void registerRepositories(@NonNull List<JpaRepository<?, Long>> repositories) {
        for (JpaRepository<?, Long> repository : repositories) {
            Class entityType = ReflectionUtils.getGenericParameterFromInterfaces(repository.getClass(), JpaRepository.class, 0);
            log.info("Registering repository for entity: {}", entityType);
            repoDispatcher.registerDispatching(entityType, repository);
        }
    }
}
