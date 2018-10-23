package pl.khuzzuk.wfrp.helper.ui.crud;

public interface SaveListener<T> {
    SaveListener EMTPY = bean -> {};

    void onSave(T bean);
}
