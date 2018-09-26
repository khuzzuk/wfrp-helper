package pl.khuzzuk.wfrp.helper.repo;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Collection;

@AllArgsConstructor
@Getter
public class QueryAllResult<T> {
    private Class<T> type;
    private Collection<T> items;
}
