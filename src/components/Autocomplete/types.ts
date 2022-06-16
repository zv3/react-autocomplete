export interface AutocompleteOption {
  label: string;
  value: string;
}

export interface MenuItem {
  option: AutocompleteOption;
  isFocused: boolean;
}
