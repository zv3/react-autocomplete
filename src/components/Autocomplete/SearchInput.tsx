import { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';

interface InputProps {
  id: string;
  value: string;
  expanded: boolean;
  placeholder: string;
  onChange: ChangeEventHandler;
  onClick: MouseEventHandler;
  onKeyDown: KeyboardEventHandler;
}

function SearchInput({
  id,
  value,
  expanded: isExpanded,
  placeholder,
  onClick,
  onChange,
  onKeyDown,
}: InputProps) {
  return (
    <div className="autocomplete__input-wrapper">
      <input
        type="search"
        className="autocomplete__input"
        value={value}
        placeholder={placeholder}
        role="combobox"
        aria-autocomplete="list"
        aria-controls={`autocomplete-menu-${id}`}
        aria-expanded={isExpanded}
        data-testid="autocomplete-input"
        onChange={onChange}
        onClick={onClick}
        onKeyDown={onKeyDown}
      ></input>
    </div>
  );
}

export default SearchInput;
