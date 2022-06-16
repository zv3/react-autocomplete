import MenuListItem from './MenuListItem';
import { MenuItem } from './types';

interface MenuListProps {
  id: string;
  items: MenuItem[];
  highlightedText: string;
  onSelect: (item: MenuItem) => void;
  onFocusChange: (item?: MenuItem) => void;
}

const MenuList = (props: MenuListProps) => {
  const { id, items, highlightedText, onSelect, onFocusChange } = props;

  const menuOptions = items.map((item: MenuItem) => (
    <MenuListItem
      key={item.option.value}
      item={item}
      highlightedText={highlightedText}
      onClick={onSelect}
      onFocusChange={onFocusChange}
    />
  ));

  console.log(menuOptions);
  return (
    <div id={`autocomplete-menu-${id}`} className="menu" data-testid="autocomplete-menu">
      {menuOptions}
    </div>
  );
};

export default MenuList;
