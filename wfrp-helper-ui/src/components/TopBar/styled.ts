import styled from "styled-components";

export const TopBarWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  justify-self: flex-start;
  width: 100%;
  height: 3em;
  gap: 1em;
  
  background-color: ${props => props.theme.colors.secondary.light};
  box-shadow: 0 2px 8px ${props => props.theme.colors.secondary.dark};
  
  font-size: 2em;
  line-height: 3em;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 0 0 1em;
  height: 3em;
`;

export const LanguageIcon = styled.div`
  display: flex;
  //position: absolute;
  //right: 50px;
  //top: 10px;
  width: 2em;
  height: 2em;
  border-radius: 2em;
  padding: 0.25em;
  transition: 0.3s;
  
  &:hover {
    background: ${props => props.theme.colors.secondary.dark};
  }
`;