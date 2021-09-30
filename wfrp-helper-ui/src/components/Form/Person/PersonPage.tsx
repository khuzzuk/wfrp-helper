import withModel from "state/model/modelSelector";
import {
    AgeBox, CareerBox,
    CharacterBox,
    ClassBox,
    EyesBox,
    GenderBox,
    HairBox,
    HeightBox,
    NameBox, NextProfessionsBox,
    PersonColumn1,
    PersonColumn2,
    PersonPane, ProfessionBox,
    RaceBox,
    SpecialFeaturesBox,
    WeightBox
} from "./style";
import {ChangeEvent} from "react";
import {ModelType} from "model/ModelConfig";
import {toOptions} from "./SelectUtils";

interface PersonPageProps {
    entity: any;
    model: { [key in ModelType]: any[] };
}

function PersonPage({entity, model}: PersonPageProps) {
    const updateStringProp = (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
        entity[prop] = event.target.value;
    }

    return <PersonPane>
        <PersonColumn1>
            <NameBox onChange={updateStringProp('name')}/>
            <RaceBox>{toOptions(model.RACE)}</RaceBox>
            <GenderBox></GenderBox>
            <ClassBox></ClassBox>
            <CharacterBox></CharacterBox>
            <AgeBox></AgeBox>
            <HeightBox></HeightBox>
            <WeightBox></WeightBox>
            <HairBox></HairBox>
            <EyesBox></EyesBox>
            <SpecialFeaturesBox></SpecialFeaturesBox>
            <ProfessionBox></ProfessionBox>
            <CareerBox></CareerBox>
            <NextProfessionsBox></NextProfessionsBox>
        </PersonColumn1>


        <PersonColumn2>

        </PersonColumn2>
    </PersonPane>
}

export default withModel(PersonPage);