package pl.khuzzuk.wfrp.helper.ui;

import org.springframework.stereotype.Component;
import pl.khuzzuk.wfrp.helper.repo.QueryAllResult;
import pl.khuzzuk.wfrp.helper.ui.crud.Crud;

import java.lang.ref.Reference;
import java.lang.ref.WeakReference;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class CrudsDataListenerList {
    private List<WeakReference<Crud>> cruds = new LinkedList<>();

    public synchronized void addCrud(Crud crud) {
        cruds.add(new WeakReference<>(crud));
    }

    @SuppressWarnings("unchecked")
    public synchronized void onUpdate(QueryAllResult result) {
        cruds.stream()
                .map(Reference::get)
                .filter(Objects::nonNull)
                .forEach(crud -> crud.refresh(result));
        cruds.removeAll(cruds.stream().filter(ref -> ref.get() == null).collect(Collectors.toList()));
    }
}
