import styled, {keyframes} from "styled-components";

export const MainPaneWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1em;

  width: 100vw;
  height: 100vh;
`;

export const PrimaryBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-self: flex-start;
  width: 20vw;
  height: 99.25vh;
  gap: min(1vh, 1vw);
  padding: 0.5vh 0;

  background-color: ${props => props.theme.colors.primary.main};
  box-shadow: 2px 0 8px ${props => props.theme.colors.secondary.dark};

  font-size: 2em;
  line-height: 3em;
`;

export const PrimaryBarCell = styled.div<{ selected: boolean }>`
  background-color: ${props => props.theme.colors.primary.main};
  border-left: min(1vh, 1vw) solid ${props => props.selected ?
          props.theme.colors.secondary.main :
          props.theme.colors.primary.main};
  
  width: calc(100% - 10px);
  text-align: center;
  user-select: none;

  transition: 0.3s;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary.dark};
  }
  &:active {
    background-color: ${props => props.theme.colors.secondary.main};
  }
`;

export const InnerPane = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const SecondaryBar = styled.div`
  display: flex;
  height: 10vh;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.colors.primary.dark};
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
  width: 2em;
  height: 2em;
  border-radius: 2em;
  padding: 0.25em;
  transition: 0.3s;

  &:hover {
    background: ${props => props.theme.colors.secondary.dark};
  }
`;

const IndicatorAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingIndicator = styled.div<{ hide: boolean }>`
  display: flex;
  width: 1.5em;
  height: 1.5em;
  border-top: 2px solid ${props => props.hide ? 'transparent' : props.theme.colors.secondary.dark};
  border-radius: 1.5em;
  animation: ${IndicatorAnimation} 2s linear infinite;
`;
