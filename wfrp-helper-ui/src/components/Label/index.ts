import styled from "styled-components";

export const Label = styled.span`
  font-size: 1em;
  padding: 1em;
  line-height: 2em;
  
  color: ${props => props.theme.colors.text.main};
`;

export const WarningLabel = styled(Label)`
  color: ${props => props.theme.colors.warning.main};
`;