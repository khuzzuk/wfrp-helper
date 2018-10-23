package pl.khuzzuk.wfrp.helper.ui.crud;

public interface UpdateListener<T> {
    UpdateListener EMPTY = bean -> {};

    void onUpdate(T bean);
}
