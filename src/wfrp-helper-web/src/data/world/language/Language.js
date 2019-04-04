import Entity from "../../../crud/Entity";
import Nation from "../nation/Nation";

class Language extends Entity {
    name: string;
    description: string;
    nations: Nation[];
}

export default Language;