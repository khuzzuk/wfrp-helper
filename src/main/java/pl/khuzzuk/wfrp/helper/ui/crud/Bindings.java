package pl.khuzzuk.wfrp.helper.ui.crud;

import com.vaadin.flow.component.HasValue;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.data.converter.Converter;
import pl.khuzzuk.wfrp.helper.repo.QueryAllResult;

import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodType;
import java.util.function.Consumer;

public interface Bindings<T> {
    MethodHandles.Lookup LOOKUP = MethodHandles.publicLookup();
    MethodType CONSTRUCTOR_TYPE = MethodType.methodType(void.class);

    <E> void bind(HasValue<?, E> component, String name);
    <E, P> void bind(HasValue<?, P> component, String name, Converter<P, E> converter);

    T createNewInstance();

    void update(T bean);

    T read();

    void addFieldsTo(Dialog form);

    void onData(QueryAllResult<?> allResult);

    void registerDataListener(Consumer<QueryAllResult<?>> dataConsumer);
}
