package pl.khuzzuk.wfrp.helper

class Property<T> {
    private T property

    synchronized void clear() {
        property = null
    }

    synchronized T getProperty() {
        return property
    }

    synchronized void setProperty(T property) {
        this.property = property
    }
}
