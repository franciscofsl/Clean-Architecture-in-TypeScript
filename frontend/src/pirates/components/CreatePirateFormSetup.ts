import FormSetup from "../../generic-components/Forms/FormSetup";
import FormType from "../../generic-components/Forms/FormType";
import type { CreatePirateDto } from "../pirates.types";

class CreatePirateFormSetup extends FormSetup<CreatePirateDto> {

    constructor() {
        super();
        this.addField("name", FormType.Text);
    }

};

export default CreatePirateFormSetup;