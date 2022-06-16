import Input from "./Input";
import MenuList from "./MenuList";
import {ChangeEvent, KeyboardEventHandler, MouseEventHandler, useId, useState} from "react";
import {AutocompleteOption, MenuItem} from "./types";
import './styles.css';
import {noop} from "../../helpers/utils";

interface AutocompleteInput {
  options: AutocompleteOption[],
  searchText: string,
  placeholder: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onSelect: (option: AutocompleteOption) => void,
}

function Autocomplete({ onChange, options, searchText, placeholder, onSelect }: AutocompleteInput) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<number>(-1);
  const canRenderMenu = searchText.length > 0 && isExpanded;
  const id = useId();

  const menuItems: MenuItem[] = options.map((option, idx) => ({
    option,
    isFocused: idx === focusedOptionIndex,
  }));

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (searchText !== event.target.value) {
      setIsExpanded(true);
    }

    onChange(event);
  };

  const onSelectHandler = (item: MenuItem) => {
    setIsExpanded(false);
    setFocusedOptionIndex(-1);

    onSelect(item.option);
  };

  const onClickInputHandler: MouseEventHandler = () => {
    setIsExpanded(!isExpanded);
  };

  const onFocusChangeHandler = (focusedItem?: MenuItem) => {
    if (!focusedItem) {
      setFocusedOptionIndex(-1);

      return;
    }

    const itemIndex = menuItems.findIndex(item => item.option.value === focusedItem.option.value);

    setFocusedOptionIndex(itemIndex);
  };

  const keyHandlers: Record<string, () => void> = {
    ArrowUp: () => focusedOptionIndex < 0
      ? setFocusedOptionIndex(menuItems.length - 1)
      : setFocusedOptionIndex(focusedOptionIndex - 1),

    ArrowDown: () => {
      if (!isExpanded) {
        setIsExpanded(true);

        return;
      }

      if (focusedOptionIndex >= menuItems.length) {
        setFocusedOptionIndex(0)
      } else {
        setFocusedOptionIndex(focusedOptionIndex + 1);
      }
    },

    Enter: () => {
      const focusedItem = menuItems.at(focusedOptionIndex);
      if (!focusedItem) {
        return;
      }

      onSelectHandler(focusedItem);
    }
  };

  const onKeyDownHandler: KeyboardEventHandler = (event) => {
    const handler = keyHandlers[event.key] || noop;

    handler();
  };

  return (<div className="autocomplete">
    <Input
      id={id}
      value={searchText}
      expanded={isExpanded}
      placeholder={placeholder}
      onClick={onClickInputHandler}
      onChange={onChangeHandler}
      onKeyDown={onKeyDownHandler}
    />

    {canRenderMenu && <MenuList
      id={id}
      items={menuItems}
      highlightedText={searchText}
      onSelect={onSelectHandler}
      onFocusChange={onFocusChangeHandler}
    />}
  </div>);
}

export default Autocomplete;
