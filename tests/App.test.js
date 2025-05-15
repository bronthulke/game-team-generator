import { render, fireEvent } from '@testing-library/svelte';
import App from '../src/App.svelte';
import { describe, it, expect, beforeEach } from 'vitest';

// Helper to clear localStorage before each test
beforeEach(() => {
  localStorage.clear();
});

describe('Game Team Randomizer', () => {
  it('renders the main UI', () => {
    const { getByText } = render(App);
    expect(getByText('Game Team Randomizer')).toBeTruthy();
    expect(getByText('Player Management')).toBeTruthy();
    expect(getByText('Team Generation')).toBeTruthy();
  });

  it('can add a player', async () => {
    const { getByPlaceholderText, getByText } = render(App);
    const input = getByPlaceholderText('Add player name');
    await fireEvent.input(input, { target: { value: 'Alice' } });
    await fireEvent.keyDown(input, { key: 'Enter' });
    expect(getByText('Alice')).toBeTruthy();
  });

  it('can select and deselect a player', async () => {
    const { getByPlaceholderText, getByText, getByLabelText } = render(App);
    const input = getByPlaceholderText('Add player name');
    await fireEvent.input(input, { target: { value: 'Bob' } });
    await fireEvent.keyDown(input, { key: 'Enter' });
    const checkbox = getByLabelText('Bob');
    expect(checkbox.checked).toBe(false);
    await fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    await fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  it('can generate teams', async () => {
    const { getByPlaceholderText, getByText, getByLabelText, getByRole } = render(App);
    const input = getByPlaceholderText('Add player name');
    await fireEvent.input(input, { target: { value: 'Alice' } });
    await fireEvent.keyDown(input, { key: 'Enter' });
    await fireEvent.input(input, { target: { value: 'Bob' } });
    await fireEvent.keyDown(input, { key: 'Enter' });
    await fireEvent.click(getByLabelText('Alice'));
    await fireEvent.click(getByLabelText('Bob'));
    const button = getByText('Generate Teams');
    await fireEvent.click(button);
    expect(getByText('Team 1')).toBeTruthy();
  });
});
