import type FormType from "./FormType";

abstract class FormSetup<_TItemType> {
    private fields: FormField[] = [];
    constructor() { }

    public addField(name: string, type: FormType): void {
        const field = new FormField(name, type);
        this.fields.push(field);
    }

    public getFields(): ReadonlyArray<FormField> {
        return this.fields;
    }

};

class FormField {
    public name: string;
    public type: FormType;

    constructor(name: string, type: FormType) {
        this.name = name;
        this.type = type;
    }
}


export default FormSetup;