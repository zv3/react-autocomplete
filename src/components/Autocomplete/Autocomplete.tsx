import SearchInput from './SearchInput';
import MenuList from './MenuList';
import { ChangeEvent, KeyboardEventHandler, MouseEventHandler, useId, useState } from 'react';
import { AutocompleteOption, MenuItem } from './types';
import { noop } from '../../helpers/utils';
import './Autocomplete.css';

export interface AutocompleteInputProps {
  options: AutocompleteOption[];
  searchText: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelect: (option: AutocompleteOption) => void;
}

enum KeyboardEventKey {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  Enter = 'Enter',
}

function Autocomplete({
  onChange,
  options,
  searchText,
  placeholder,
  onSelect,
}: AutocompleteInputProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>(-1);
  const canRenderMenu = searchText.length > 0 && isExpanded;
  const id = useId();

  const menuItems: MenuItem[] = options.map((option, idx) => ({
    option,
    isFocused: idx === focusedOptionIndex,
  }));

  const onSelectItemHandler = (item: MenuItem) => {
    // Close the menu list and reset the focused item when clicking on one.
    setIsExpanded(false);
    setFocusedOptionIndex(-1);

    onSelect(item.option);
  };

  const onFocusChangeItemHandler = (focusedItem?: MenuItem) => {
    if (!focusedItem) {
      setFocusedOptionIndex(-1);

      return;
    }

    const itemIndex = menuItems.findIndex((item) => item.option.value === focusedItem.option.value);

    setFocusedOptionIndex(itemIndex);
  };

  const keyHandlers: Record<KeyboardEventKey, () => void> = {
    [KeyboardEventKey.ArrowUp]: () =>
      focusedOptionIndex < 0
        ? setFocusedOptionIndex(menuItems.length - 1)
        : setFocusedOptionIndex(focusedOptionIndex - 1),

    [KeyboardEventKey.ArrowDown]: () => {
      if (!isExpanded) {
        setIsExpanded(true); // Display the menu when pressing the arrow-down key.

        return;
      }

      // Cycle through the menu list if it's up.
      if (focusedOptionIndex >= menuItems.length) {
        setFocusedOptionIndex(0);
      } else {
        setFocusedOptionIndex(focusedOptionIndex + 1);
      }
    },

    [KeyboardEventKey.Enter]: () => {
      const focusedItem = menuItems.at(focusedOptionIndex);
      if (!isExpanded || !focusedItem) {
        return; // Ignore the key press if the menu isn't up.
      }

      onSelectItemHandler(focusedItem);
    },
  };

  const onKeyDownInputHandler: KeyboardEventHandler = (event) => {
    const keyHandler = keyHandlers[event.key as KeyboardEventKey] || noop;

    keyHandler();
  };

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (searchText !== event.target.value) {
      setIsExpanded(true); // Display the menu if the search input has changed.
    }

    onChange(event);
  };

  const onClickInputHandler: MouseEventHandler = () => {
    setIsExpanded(!isExpanded); // Display/hide the menu when clicking on the input box.
  };

  return (
    <div className="autocomplete" data-testid="autocomplete">
      <SearchInput
        id={id}
        value={searchText}
        expanded={isExpanded}
        placeholder={placeholder}
        onClick={onClickInputHandler}
        onChange={onChangeInputHandler}
        onKeyDown={onKeyDownInputHandler}
      />

      {canRenderMenu && (
        <MenuList
          id={id}
          items={menuItems}
          highlightedText={searchText}
          onSelect={onSelectItemHandler}
          onFocusChange={onFocusChangeItemHandler}
        />
      )}
    </div>
  );
}

export default Autocomplete;
