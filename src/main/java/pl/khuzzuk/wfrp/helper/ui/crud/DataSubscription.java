package pl.khuzzuk.wfrp.helper.ui.crud;

import lombok.RequiredArgsConstructor;
import lombok.Setter;
import pl.khuzzuk.wfrp.helper.repo.QueryAllResult;

import javax.validation.constraints.NotNull;
import java.util.Collection;
import java.util.function.Consumer;

@RequiredArgsConstructor
public class DataSubscription<T> {
    private final Class<T> dataType;
    @Setter
    private @NotNull Consumer<Collection<T>> onRefresh = c -> {};

    public void accept(QueryAllResult<T> data) {
        if (data.getType().equals(dataType)) {
            onRefresh.accept(data.getItems());
        }
    }
}
