package pl.khuzzuk.wfrp.helper.repo;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import java.lang.reflect.ParameterizedType;

@SuppressWarnings("ClassIndependentOfModule")
@RequiredArgsConstructor
@Component
class RepoDispatcherConfigurer implements BeanPostProcessor {
    private final RepoDispatcher repoDispatcher;

    @Override
    @SuppressWarnings({"unchecked", "RawTypeCanBeGeneric"})
    public Object postProcessAfterInitialization(@NonNull Object bean, String beanName) {
        if (bean instanceof JpaRepository) {
            //noinspection rawtypes
            ParameterizedType genericInterface = (ParameterizedType) bean.getClass().getGenericInterfaces()[0];

            Class entityType = (Class) genericInterface.getActualTypeArguments()[0];
            repoDispatcher.registerDispatching(entityType, (JpaRepository<?, Long>) bean);
        }
        return bean;
    }
}
