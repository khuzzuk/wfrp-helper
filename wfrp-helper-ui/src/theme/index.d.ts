export interface Color {
  main: string;
  light: string;
  dark: string;
}

export default interface Theme {
  colors: {
    primary: Color;
    secondary: Color;
    text: Color;
    warning: Color;
  }
}