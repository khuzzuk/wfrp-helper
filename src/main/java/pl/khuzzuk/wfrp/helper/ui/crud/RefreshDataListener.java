package pl.khuzzuk.wfrp.helper.ui.crud;

public interface RefreshDataListener {
    RefreshDataListener EMPTY = type -> {};

    void onRefreshData(Class<?> type);
}
