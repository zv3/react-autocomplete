export interface AutocompleteOption {
  label: string;
  value: string;
}

// Type to be used internally by the `Autocomplete` component.
export interface MenuItem {
  option: AutocompleteOption;
  isFocused: boolean;
}
