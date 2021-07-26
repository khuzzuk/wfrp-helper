import styled from "styled-components";

export const Table = styled.div`
  width: 95%;
  height: 90vh;
  overflow: hidden;
`;

export const TableHead = styled.div<{ cols: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.cols}, 1fr);

  background: ${props => props.theme.colors.primary.main};
  border-bottom: 2px solid ${props => props.theme.colors.secondary.main};
  color: ${props => props.theme.colors.text.main};
  height: 5vh;
  line-height: 5vh;
  font-size: 2vh;
  font-weight: bold;
  text-transform: capitalize;
`;

export const TableBody = styled.div`
  height: 85vh;
  width: 100%;
  overflow: auto;
  scroll-behavior: smooth;
`;

export const TableRow = styled.div<{ selected?: boolean, cols: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.cols}, 1fr);

  background: ${props => props.selected ? props.theme.colors.secondary.main : props.theme.colors.primary.main};
  border-bottom: 1px solid ${props => props.theme.colors.secondary.light};

  transition: 0.3s;
  user-select: none;

  &:nth-child(odd) {
    background: ${props => props.selected ? props.theme.colors.secondary.main : props.theme.colors.primary.dark};
  }
`;

export const TableCell = styled.div`
  padding: 0.25em;
  border-right: 1px solid ${props => props.theme.colors.secondary.light};

  &:nth-child(1) {
    //border-left: 1px solid ${props => props.theme.colors.secondary.light};
  }
  &:last-child {
    border-right: none;
  }
`;
