import { MenuItem } from './types';
import { Fragment } from 'react';

interface MenuItemProps {
  item: MenuItem;
  highlightedText: string;
  onClick: (option: MenuItem) => void;
  onFocusChange: (item?: MenuItem) => void;
}

function MenuListItem({ item, highlightedText, onFocusChange, onClick }: MenuItemProps) {
  const { isFocused, option } = item;

  const regExp = new RegExp(highlightedText, 'gi');
  const labelParts = option.label.split(regExp);
  const lastIndex = labelParts.length - 1;
  const buttonLabel = labelParts.map((part, currentIndex: number) => {
    return (
      <Fragment>
        {part}
        {currentIndex !== lastIndex && (
          <mark className="autocomplete__highlighted-string">{highlightedText}</mark>
        )}
      </Fragment>
    );
  });

  const classNames = ['menu__item', ...(isFocused ? ['menu__item--focused'] : [])].join(' ');

  const onClickHandler = () => onClick(item);
  const onMouseEnterHandler = () => onFocusChange(item);
  const onMouseLeaveHandler = () => onFocusChange(undefined);

  return (
    <button
      className={classNames}
      onClick={onClickHandler}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {buttonLabel}
    </button>
  );
}

export default MenuListItem;
