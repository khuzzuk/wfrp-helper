import styled from "styled-components";

export const Button = styled.button<{small?: boolean}>`
  color: ${props => props.theme.colors.text.main};
  background: ${props => props.theme.colors.secondary.main};
  border: none;
  border-radius: 0.25vh;
  transition: 0.3s;
  font-size: ${({small}) => small ? '2vh' : '4vh'};
  line-height: ${({small}) => small ? '3vh' : '6vh'};
  padding: 0 0.5vw;
  
  &:hover {
    background: ${props => props.theme.colors.secondary.light};
    color: ${props => props.theme.colors.text.dark};
  }
  &:active {
    background: ${props => props.theme.colors.secondary.main};
    box-shadow: inset 0 0 15px ${props => props.theme.colors.primary.main};
    transition: 0s;
  }
`;

export default Button;