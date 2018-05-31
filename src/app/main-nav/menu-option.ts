export interface MenuOption {
  title: string;
  url?: string;
  children?: Array<MenuOption>;
}
