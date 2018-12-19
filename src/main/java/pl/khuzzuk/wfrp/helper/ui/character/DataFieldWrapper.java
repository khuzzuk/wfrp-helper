package pl.khuzzuk.wfrp.helper.ui.character;

import com.vaadin.flow.data.provider.ListDataProvider;
import com.vaadin.flow.server.Command;
import lombok.Getter;

import java.util.Collection;
import java.util.function.Consumer;

public class DataFieldWrapper<T> {
    private ListDataProvider<T> dataProvider;
    @Getter
    private Command refresher;
    private Consumer<Collection<T>> process;

    public DataFieldWrapper(ListDataProvider<T> dataProvider) {
        this.dataProvider = dataProvider;
        refresher = () -> dataProvider.refreshAll();
        process = data -> {
            dataProvider.getItems().clear();
            dataProvider.getItems().addAll(data);
        };
    }

    public DataFieldWrapper(Command refresher, Consumer<Collection<T>> process) {
        this.refresher = refresher;
        this.process = process;
    }

    public void setData(Collection<T> data) {
        process.accept(data);
    }
}
