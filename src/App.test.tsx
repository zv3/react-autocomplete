import React from 'react';
import { render } from '@testing-library/react';
import Autocomplete, { AutocompleteInputProps } from './components/Autocomplete/Autocomplete';
import App from './App';

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
    ],
    searchText: '',
  };

  return render(<Autocomplete {...defaultProps} {...props} />);
}

describe('App', () => {
  test('renders the `Autocomplete` component', async () => {
    const { findByTestId } = renderAutocomplete();

    const autocomplete = await findByTestId('autocomplete');

    expect(autocomplete).toContainHTML('data-testid="autocomplete-input"');
  });
});
