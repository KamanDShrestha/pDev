import React from 'react';
import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import AddQuoteCard from '../../src/components/AddQuoteCard';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

describe('AddQuoteCard', () => {
  const queryClient = new QueryClient();
  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <AddQuoteCard />
      </QueryClientProvider>
    );
  it('should render all the text fields properly', () => {
    renderComponent();

    expect(screen.getByLabelText(/quote/i)).toBeInTheDocument(); // provides error if not found
    expect(screen.getByLabelText(/author/i)).toBeInTheDocument();
    const selectElements = screen.getAllByRole('combobox');
    expect(selectElements.length).toEqual(2);
    expect(screen.queryByLabelText(/newCategory/i)).not.toBeInTheDocument(); // provides null if not found
    expect(screen.getByRole('switch')).toBeInTheDocument();
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('should render new text field if the switch is clicked indicating new category', async () => {
    renderComponent();
    expect(screen.queryByLabelText(/newcategory/i)).not.toBeInTheDocument(); // provides null if not found
    const user = userEvent.setup();

    const newCategorySwitch = screen.getByRole('switch');
    await user.click(newCategorySwitch);
    expect(newCategorySwitch).toBeChecked();
    expect(screen.getByLabelText(/new category/i)).toBeInTheDocument(); // provides null if not found
  });
});
