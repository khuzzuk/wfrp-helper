import styled from "styled-components";

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: start;
  gap: 2em;
  padding: 2em;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  gap: 0.25em;
`;

export const Label = styled.div`
  font-size: 1em;
  line-height: 1.4em;
  font-weight: bolder;
`;

export const TextFieldStyled = styled.input`
  color: ${props => props.theme.colors.text.main};
  background: ${props => props.theme.colors.primary.main};

  border: 2px solid ${props => props.theme.colors.secondary.light};
  border-radius: 0.5em;

  font-size: 1em;
  line-height: 1.25em;
  padding: 0 1em;
  width: 100%;
`;

export const Dropdown = styled.div`
  display: flex;
  border: 1px solid ${props => props.theme.colors.secondary.light};
  width: 50vw;
  padding: 1vh 1vw;
  border-radius: 0.5em;
  outline: none;
  font-size: 1em;
  line-height: 1.25em;
`;

export const SelectedElements = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
`;

export const DropdownButton = styled.div`
  border-left: 1px solid ${props => props.theme.colors.secondary.light};
  transition: 0.3s;

  &:hover {
    background: ${props => props.theme.colors.secondary.light};
  }
`;

export const SelectedElement = styled.div`
  display: flex;
  gap: 0.1em;
  align-items: center;
`;

export const SelectableList = styled.div`
  position: absolute;
  background: ${props => props.theme.colors.primary.main};
  border: 1px solid ${props => props.theme.colors.secondary.main};
  border-radius: 1vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 8px ${props => props.theme.colors.secondary.dark};
  height: 20vh;
  width: 40vw;
  overflow: auto;
`;

export const ListElement = styled.div<{ active: boolean }>`
  background-color: ${props => props.active ? props.theme.colors.secondary.main : props.theme.colors.primary.main};
  user-select: none;
  transition: 0.3s;

  &:hover {
    background: ${props => props.theme.colors.secondary.main};
  }
`;

export const DropdownSearch = styled.input`
  padding: 0.1em;
  border: none;
  outline: none;
`;

export const DeterminantButton = styled.div<{present?: boolean}>`
  background: ${props => props.present ? props.theme.colors.secondary.light : props.theme.colors.primary.main};;
  border: 1px solid ${props => props.present ? props.theme.colors.secondary.main : props.theme.colors.secondary.light};
  border-radius: 0.25em;
  font-size: 1em;
  line-height: 1.25em;
  width: 100%;
  min-width: 1.5em;
  text-align: center;
  height: 1.25em;
  transition: 0.3s;
  user-select: none;
  
  &:hover {
    background: ${props => props.theme.colors.secondary.light};
  }
  &:active {
    background: ${props => props.theme.colors.secondary.dark};
  }
`;

export const DeterminantInput = styled.input`
  border: 1px solid ${props => props.theme.colors.secondary.light};
  border-radius: 0.25em;
  font-size: 0.9em;
  width: 85%;
  height: 1.25em;
`;

export const DeterminantRow = styled.div`
  display: flex;
  padding: 0.1em;
  gap: 0.25em;
`;

export const DeterminantColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.1em;
  //border: 1px solid ${props => props.theme.colors.secondary.light};
  gap: 0.25em;
`;
