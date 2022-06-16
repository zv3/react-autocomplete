import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Autocomplete, { AutocompleteInputProps } from './components/Autocomplete/Autocomplete';

function renderAutocomplete(props: Partial<AutocompleteInputProps> = {}) {
  const defaultProps: AutocompleteInputProps = {
    onChange: () => {},
    onSelect: () => {},
    placeholder: 'Default placeholder',
    options: [
      {
        label: 'Hey',
        value: 'hey',
      },
      {
        label: 'Ho',
        value: 'ho',
      },
    ],
    searchText: '',
  };

  return render(<Autocomplete {...defaultProps} {...props} />);
}

describe('App', () => {
  test('renders the `Autocomplete` component', async () => {
    renderAutocomplete();

    const autocomplete = await screen.findByTestId('autocomplete');

    expect(autocomplete).toContainHTML('data-testid="autocomplete-input"');
  });

  test('runs the `onSelect` event handler passed in as prop', async () => {
    const onSelect = jest.fn();

    const options = [
      {
        label: 'Go',
        value: 'go',
      },
      {
        label: 'Ruby',
        value: 'ruby',
      },
    ];

    renderAutocomplete({ options, onSelect, searchText: 'ruby' });

    const input = screen.getByTestId('autocomplete-input');
    userEvent.click(input); // Click on the input expand the menu.

    const menuButton = screen.getByTestId('item-ruby');
    userEvent.click(menuButton);

    expect(onSelect).toBeCalledWith({
      label: 'Ruby',
      value: 'ruby',
    });
  });
});
