package pl.khuzzuk.wfrp.helper.repo;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public interface Adapter<S, R> {
    R map(S source);

    default List<R> list(List<S> sources) {
        return sources.stream().map(this::map).collect(Collectors.toList());
    }

    default Set<R> set(Set<S> sources) {
        return sources.stream().map(this::map).collect(Collectors.toSet());
    }
}
