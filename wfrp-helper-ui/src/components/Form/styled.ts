import styled from "styled-components";

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;
  gap: 2em;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  position: fixed;
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

export const ListElement = styled.div<{active: boolean}>`
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
