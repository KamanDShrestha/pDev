import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import JournalCard from '../../src/components/JournalCard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import userEvent from '@testing-library/user-event';

// make a fake data for this
// _id: string;
//     entryDate: string;
//     journalCategory: string;
//     journalContent: string;
//     journalTitle: string;

describe('JournalCard', () => {
  const queryClient = new QueryClient();
  const journal = {
    _id: '65e5ee8f44da8183d334f284',
    entryDate: '2021-09-09T00:00:00.000Z',
    journalCategory: 'Mindfulness',
    journalContent: 'This is a test journal',
    journalTitle: 'Test Journal',
  };

  const user = userEvent.setup();
  const renderComponent = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <JournalCard journal={journal} />
      </QueryClientProvider>
    );
  };

  it('should render all the content effectively.', () => {
    renderComponent();
    screen.debug();

    expect(
      screen.getAllByText(new RegExp(journal.journalTitle, 'i')).length
    ).toBeGreaterThan(0);

    expect(
      screen.getAllByText(new RegExp(journal.journalContent, 'i')).length
    ).toBeGreaterThan(0);

    expect(screen.getByText(journal.journalCategory)).toBeInTheDocument();
  });

  it('should open a dialog for rendering all the content of the journal', async () => {
    renderComponent();

    await user.click(screen.getByRole('button'));

    expect(
      screen.queryByRole('button', { name: 'Delete' })
    ).toBeInTheDocument();
    expect(screen.queryByText('Close')).toBeInTheDocument();

    screen.debug();
  });
});
