import styled from "styled-components";

export const Button = styled.button`
  color: ${props => props.theme.colors.text.main};
  background: ${props => props.theme.colors.secondary.main};
  border: none;
  border-radius: 0.25rem;
  transition: 0.3s;
  font-size: 2rem;
  line-height: 3.5rem;
  padding: 0 1rem;
  
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