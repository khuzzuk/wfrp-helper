import styled from "styled-components";
import Card from "theme/card.png";

export const PersonPane = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  height: 616px;
  width: 900px;

  background: url(${Card});
  background-size: contain;
  object-fit: contain;

  font-size: 11px;
  font-family: 'wfrp',serif;

  @media (min-width: 1800px) {
    font-size: 14px;
    height: 821px;
    width: 1200px;
  }
  @media (min-width: 2300px) {
    font-size: 20px;
    height: 1231px;
    width: 1800px;
  }
  @media (min-width: 3500px) {
    font-size: 26px;
    height: 1847px;
    width: 2700px;
  }
`;

export const PersonColumn1 = styled.div`
  position: relative;
  display: inline;
  border: 1px solid darkcyan;
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
  font-family: 'wfrp',serif;
`;
export const Input = styled.input`
  background-color: transparent;
  outline: none;
  font-family: 'wfrp',serif;
  height: 12px;
  font-size: 12px;
  border: none;
  padding-left: 3px;
  
  @media (min-width: 1800px) {
    font-size: 14px;
  }
  @media (min-width: 2300px) {
    font-size: 20px;
  }
  @media (min-width: 3500px) {
    font-size: 26px;
  }
`;
export const InputBox = styled.input`
  position: absolute;
  border: 1px solid dimgray;
  background-color: rgba(150, 50, 150, 0.2);
  outline: none;
  font-family: 'wfrp',serif;
  font-size: 16px;

  @media (min-width: 1800px) {
    font-size: 20px;
  }
  @media (min-width: 2300px) {
    font-size: 24px;
  }
  @media (min-width: 3500px) {
    font-size: 34px;
  }
`;
export const SelectBox = styled.select`
  position: absolute;
  border: 1px solid dimgray;
  background-color: rgba(150, 50, 150, 0.2);
  appearance: none;
  outline: none;
  font-family: 'wfrp',serif;
  font-size: 16px;

  @media (min-width: 1800px) {
    font-size: 20px;
  }
  @media (min-width: 2300px) {
    font-size: 24px;
  }
  @media (min-width: 3500px) {
    font-size: 34px;
  }
`;
export const RemoveIcon = styled.div`
  color: transparent;
  width: 9px;
  height: 14px;
  &:hover {
    color: gray;
  }
  &:after {
    content: "X";
  }

  @media (min-width: 1800px) {
    height: 16px;
    width: 10px;
  }
  @media (min-width: 2300px) {
    height: 20px;
    width: 11px;
  }
  @media (min-width: 3500px) {
    height: 24px;
    width: 14px;
  }
`;
export const Label = styled.div`
  display: flex;
  gap: 3px;
  font-family: 'wfrp',serif;
  cursor: default;
  font-size: 9px;
  
  @media (min-width: 1800px) {
    font-size: 11px;
  }
  @media (min-width: 2300px) {
    font-size: 14px;
  }
  @media (min-width: 3500px) {
    font-size: 20px;
  }
`;
export const LabelBox = styled(Box)`
  position: relative;
  display: flex;
  gap: 3px;
  font-family: 'wfrp',serif;
  cursor: default;
  font-size: 12px;
  
  @media (min-width: 1800px) {
    font-size: 16px;
  }
  @media (min-width: 2300px) {
    font-size: 20px;
  }
  @media (min-width: 3500px) {
    font-size: 26px;
  }
`;
export const SelectItemBox = styled(SelectBox)`
  position: relative;
  width: 100%;
  height: 16px;
  @media (min-width: 1800px) {
    height: 24px;
  }
  @media (min-width: 2300px) {
    height: 36px;
  }
  @media (min-width: 3500px) {
    height: 50px;
  }
`;
export const ItemStat = styled(LabelBox)`
  text-align: center;
  cursor: default;
`;

export const NameBox = styled(InputBox)`
  top: 2.5%;
  left: 3%;
  width: 23%;
  height: 2.75%;
`;
export const RaceBox = styled(SelectBox)`
  top: 3%;
  left: 27.5%;
  width: 15%;
  height: 2.75%;
`;
export const GenderBox = styled(SelectBox)`
  top: 3%;
  left: 43%;
  width: 7.5%;
  height: 2.75%;
`;
export const ClassBox = styled(SelectBox)`
  top: 3%;
  left: 52%;
  width: 26%;
  height: 2.75%;
`;
export const CharacterBox = styled(SelectBox)`
  top: 3%;
  left: 79.5%;
  width: 16.5%;
  height: 2.75%;
`;

export const AgeBox = styled(InputBox)`
  top: 8.75%;
  left: 3%;
  width: 8%;
  height: 2%;
`;
export const HeightBox = styled(InputBox)`
  top: 8.75%;
  left: 13.5%;
  width: 10.25%;
  height: 2%;
`;
export const WeightBox = styled(InputBox)`
  top: 8.75%;
  left: 27%;
  width: 9%;
  height: 2%;
`;
export const HairBox = styled(SelectBox)`
  top: 9%;
  left: 38.5%;
  width: 9.5%;
  height: 2.25%;
`;
export const EyesBox = styled(SelectBox)`
  top: 9%;
  left: 50%;
  width: 9%;
  height: 2.25%;
`;
export const SpecialFeaturesBox = styled(Box)`
  top: 6.25%;
  left: 61%;
  width: 35%;
  height: 5%;
`;
export const SpecialFeaturesSelect = styled(SelectBox)`
  position: static;
  width: 20%;
  height: 40%;
`;
export const SpecialFeaturesList = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25em;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export const ProfessionBox = styled(SelectBox)`
  top: 14.25%;
  left: 3%;
  width: 25%;
  height: 3%;
`;
export const CareerBox = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25em;
  top: 14.25%;
  left: 30%;
  width: 37%;
  height: 2.75%;
  overflow: auto;
`;
export const NextProfessionsBox = styled(Box)`
  top: 14.25%;
  left: 69%;
  width: 27%;
  height: 2.75%;
`;

export const StatsBox = styled(Box)`
  top: 21%;
  left: 1%;
  width: 97%;
  height: 12%;
`;
export const StatsInnerBox = styled(Box)`
  top: 0;
  left: 24.5%;
  width: 75.5%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
export const StatsRow = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;
`;
export const Stat = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 140%;
  user-select: none;
  cursor: pointer;
`;
export const StatsGenerateBox = styled(Box)`
  top: 1%;
  left: 1%;
  width: 20%;
  height: 100%;
`;

export const MeleeWeaponBox = styled(Box)`
  top: 35%;
  left: 5.5%;
  width: 44%;
  height: 17%;
  overflow: auto;
`;
export const MeleeWeaponItem = styled(LabelBox)`
  display: grid;
  grid-template-columns: 95px 25px 27px 25px 22px;
  width: 99.5%;
  height: 14px;
  @media (min-width: 1800px) {
    height: 18px;
    grid-template-columns: 95px 25px 27px 25px 22px;
  }
  @media (min-width: 2300px) {
    height: 24px;
    grid-template-columns: 187px 50px 48px 48px 45px;
  }
  @media (min-width: 3500px) {
    height: 34px;
    grid-template-columns: 95px 25px 27px 25px 22px;
  }
`;

export const RangeWeaponBox = styled(Box)`
  top: 53.5%;
  left: 3.5%;
  width: 45.5%;
  height: 18%;
  overflow: auto;
`;
export const RangedWeaponItem = styled(LabelBox)`
  display: grid;
  gap: 0;
  grid-template-columns: 95px 8px 18px 18px 18px 20px 25px;
  position: relative;
  width: 99.5%;
  height: 12px;
  @media (min-width: 1800px) {
    height: 18px;
    grid-template-columns: 95px 8px 18px 18px 18px 20px 25px;
  }
  @media (min-width: 2300px) {
    height: 24px;
    grid-template-columns: 194px 14px 38px 38px 38px 36px 46px;
  }
  @media (min-width: 3500px) {
    height: 34px;
    grid-template-columns: 95px 8px 18px 18px 18px 20px 25px;
  }
`;
export const AmmunitionItem = styled(LabelBox)`
  display: grid;
  gap: 0;
  align-items: center;
  grid-template-columns: 95px 8px 54px 20px 25px;
  position: relative;
  width: 100%;
  height: 12px;
  @media (min-width: 1800px) {
    height: 18px;
    grid-template-columns: 95px 8px 54px 20px 25px;
  }
  @media (min-width: 2300px) {
    height: 28px;
    grid-template-columns: 154px 14px 150px 36px 45px;
  }
  @media (min-width: 3500px) {
    height: 34px;
    grid-template-columns: 95px 8px 54px 20px 25px;
  }
`;

export const ArmorSelectBox = styled(Box)`
  top: 73%;
  left: 4%;
  width: 45%;
  height: 21%;
  overflow: auto;
`;
export const ArmorItem = styled(LabelBox)`
  position: relative;
  display: grid;
  grid-template-columns: 65px 8px 105px 25px;
  text-wrap: nowrap;
  @media (min-width: 1800px) {
    height: 18px;
    grid-template-columns: 65px 8px 105px 25px;
  }
  @media (min-width: 2300px) {
    height: 28px;
    grid-template-columns: 145px 12px 190px 25px;
  }
  @media (min-width: 3500px) {
    height: 34px;
    grid-template-columns: 65px 8px 105px 25px;
  }
`;

export const ArmorStatsBox = styled(Box)`
  top: 72%;
  left: 51.5%;
  width: 20.25%;
  height: 20.25%;
`;
const ArmorStat = styled(Box)`
  width: 20%;
  height: 20%;
  text-align: center;
  font-size: 18px;
`;
export const ShieldStat = styled(ArmorStat)`
  top: 0;
  left: 62%;
`;
export const HeadStat = styled(ArmorStat)`
  top: 5%;
  left: 0;
`;
export const RightHandStat = styled(ArmorStat)`
  top: 35%;
  left: 0;
`;
export const RightLegStat = styled(ArmorStat)`
  top: 83%;
  left: 0;
`;
export const LeftHandStat = styled(ArmorStat)`
  top: 32%;
  left: 79%;
`;
export const TorsoStat = styled(ArmorStat)`
  top: 57%;
  left: 79%;
`;
export const LeftLegStat = styled(ArmorStat)`
  top: 83%;
  left: 79%;
`;

export const SkillFirstBox = styled(Box)`
  top: 35%;
  left: 51.5%;
  width: 20.25%;
  height: 28.25%;
  overflow: auto;
`;
export const SkillSecondBox = styled(Box)`
  top: 35%;
  left: 75%;
  width: 20.25%;
  height: 58.5%;
  overflow: auto;
`;
export const SkillItem = styled(Box)`
  position: relative;
  display: flex;
  justify-content: space-between;
`;

export const ContextMenu = styled(Box)<{show: boolean}>`
  display: ${({show}) => show ? 'inline' : 'none'};
  top: 0;
  left: 0;
`;
