package pl.khuzzuk.wfrp.helper.edit;

public enum EditorType {
    /** will mark a field for choosing item from existing ones, combobox for reference and add from list to list for collection*/
    CHOOSE,
    /** will inline all fields to editor of this object */
    EMBEDDED,
    /** will activate child editor for object in the field inside parent editor*/
    DELEGATED,
    NONE
}
