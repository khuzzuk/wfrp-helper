interface EntityEditor {
    createNew(): any;

    edit(toEdit: any): any;

    save(toSave: any): any;
}

export default EntityEditor;