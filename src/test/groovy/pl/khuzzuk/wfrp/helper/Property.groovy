package pl.khuzzuk.wfrp.helper

class Property<T> {
    private T value

    synchronized void clear() {
        value = null
    }

    synchronized T getValue() {
        return value
    }

    synchronized void setValue(T value) {
        this.value = value
    }

    synchronized boolean hasValue() {
        value != null
    }
}
