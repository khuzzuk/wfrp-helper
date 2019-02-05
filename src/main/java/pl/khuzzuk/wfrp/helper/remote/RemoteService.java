package pl.khuzzuk.wfrp.helper.remote;

import java.util.List;

public interface RemoteService<T> {
    T save(T t);

    List<T> findAll();
}
