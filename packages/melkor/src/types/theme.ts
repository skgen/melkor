export type Themes = string[];

export type SystemTheme = 'light' | 'dark';

export interface ThemeInstance {
  preference: string;
  value: string;
}
