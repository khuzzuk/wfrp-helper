package pl.khuzzuk.wfrp.helper.ui.crud;

public interface DeleteListener<T> {
    DeleteListener EMPTY = bean -> {};

    void onDelete(T bean);
}
