import styled from "styled-components";
import Card from "theme/card.png";

export const PersonPane = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  //justify-items: stretch;
  //align-items: stretch;

  height: 616px;
  width: 900px;

  background: url(${Card});
  background-size: contain;
  object-fit: contain;

  font-size: 11px;
  font-family: 'wfrp';

  @media (min-width: 1800px) {
    height: 821px;
    width: 1200px;
  }
  @media (min-width: 2300px) {
    height: 1231px;
    width: 1800px;
  }
  @media (min-width: 3500px) {
    height: 1847px;
    width: 2700px;
  }
`;

export const PersonColumn1 = styled.div`
  position: relative;
  display: inline;
  border: 1px solid green;
  background-color: rgba(100, 100, 0, 0);
`;
export const PersonColumn2 = styled.div`
  border: 1px solid green;
  background-color: rgba(100, 50, 0, 0.05);
`;

export const Box = styled.div`
  position: absolute;
  border: 1px solid rosybrown;
  background-color: rgba(150, 50, 150, 0.25);
`;
export const InputBox = styled.input`
  position: absolute;
  border: 1px solid dimgray;
  background-color: rgba(150, 50, 150, 0.2);
  outline: none;
`;
export const SelectBox = styled.select`
  position: absolute;
  border: 1px solid dimgray;
  background-color: rgba(150, 50, 150, 0.2);
`;

export const NameBox = styled(InputBox)`
  top: 2.5%;
  left: 3%;
  width: 23%;
  height: 2.75%;
`;

export const RaceBox = styled(SelectBox)`
  top: 2.5%;
  left: 27%;
  width: 15%;
  height: 2.75%;
`;

export const GenderBox = styled(SelectBox)`
  top: 2.5%;
  left: 43%;
  width: 7.5%;
  height: 2.75%;
`;
export const ClassBox = styled(SelectBox)`
  top: 2.5%;
  left: 52%;
  width: 26%;
  height: 2.75%;
`;
export const CharacterBox = styled(Box)`
  top: 2.5%;
  left: 79%;
  width: 19%;
  height: 2.75%;
`;

export const AgeBox = styled(InputBox)`
  top: 8.5%;
  left: 3%;
  width: 8%;
  height: 2%;
`;

export const HeightBox = styled(InputBox)`
  top: 8.5%;
  left: 13.5%;
  width: 10.25%;
  height: 2%;
`;

export const WeightBox = styled(InputBox)`
  top: 8.5%;
  left: 27%;
  width: 9%;
  height: 2%;
`;

export const HairBox = styled(SelectBox)`
  top: 8.5%;
  left: 38.5%;
  width: 9.5%;
  height: 2.25%;
`;

export const EyesBox = styled(SelectBox)`
  top: 8.5%;
  left: 50%;
  width: 9%;
  height: 2.25%;
`;

export const SpecialFeaturesBox = styled(SelectBox)`
  top: 6.25%;
  left: 68%;
  width: 28%;
  height: 5%;
`;

export const ProfessionBox = styled(SelectBox)`
  top: 14.25%;
  left: 3%;
  width: 25%;
  height: 3%;
`;

export const CareerBox = styled(Box)`
  top: 14.25%;
  left: 30%;
  width: 37%;
  height: 2.75%;
`;

export const NextProfessionsBox = styled(Box)`
  top: 14.25%;
  left: 69%;
  width: 27%;
  height: 2.75%;
`;
