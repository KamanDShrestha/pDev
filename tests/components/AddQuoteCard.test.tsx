import React from 'react';
import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import AddQuoteCard from '../../src/components/AddQuoteCard';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

describe('AddQuoteCard', () => {
  const queryClient = new QueryClient();
  const user = userEvent.setup();

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <AddQuoteCard />
      </QueryClientProvider>
    );

  it('should render all the text fields properly', () => {
    renderComponent();

    // testing for the presence of the text fields
    expect(screen.getByLabelText(/quote/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/author/i)).toBeInTheDocument();
    const selectElements = screen.getAllByRole('combobox');
    expect(selectElements.length).toEqual(2);
    expect(screen.queryByLabelText(/newCategory/i)).not.toBeInTheDocument();
    expect(screen.getByRole('switch')).toBeInTheDocument();
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('should render new text field if the switch is clicked indicating new category', async () => {
    renderComponent();

    // testing for the presence of the new category text field
    expect(screen.queryByLabelText(/newcategory/i)).not.toBeInTheDocument();

    const newCategorySwitch = screen.getByRole('switch');
    await user.click(newCategorySwitch);
    expect(newCategorySwitch).toBeChecked();

    // testing for the presence of the new category text field after the switch is clicked
    expect(screen.getByLabelText(/new category/i)).toBeInTheDocument();
  });

  it('should render multiple categories if the combobox is clicked', async () => {
    renderComponent();

    // testing for the presence of the options in the combobox
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    const categoryComboBoxes = screen.getAllByRole('combobox');
    expect(categoryComboBoxes.length).toBeGreaterThan(1);

    const categoryComboBox = categoryComboBoxes[0];

    // interact with the combobox
    await userEvent.click(categoryComboBox);

    // testing for the presence of the options in the combobox
    const optionElements = await screen.findAllByRole('listbox');
    expect(optionElements.length).toBeGreaterThan(0);
  });
});
