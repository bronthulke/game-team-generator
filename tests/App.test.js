import { render, fireEvent } from '@testing-library/svelte';
import App from '../src/App.svelte';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
vi.stubGlobal('localStorage', localStorageMock);

// Helper to clear localStorage before each test
beforeEach(() => {
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.clear.mockClear();
  localStorageMock.getItem.mockReturnValue(null);
});

describe('Game Team Randomizer - Unit Tests', () => {
  describe('Basic Rendering', () => {
    it('renders the main UI elements', () => {
      const { getByText } = render(App);
      expect(getByText('Game Team Randomizer')).toBeTruthy();
      expect(getByText('Player Management')).toBeTruthy();
      expect(getByText('Team Generation')).toBeTruthy();
    });

    it('shows empty state initially', () => {
      const { getByText } = render(App);
      expect(getByText('No players yet.')).toBeTruthy();
    });
  });

  describe('Player Management Logic', () => {
    it('can add a player via button', async () => {
      const { getByPlaceholderText, getByText } = render(App);
      const input = getByPlaceholderText('Add player name');
      const addButton = getByText('Add');
      
      await fireEvent.input(input, { target: { value: 'Alice' } });
      await fireEvent.click(addButton);
      
      expect(getByText('Alice')).toBeTruthy();
    });

    it('can add a player via Enter key', async () => {
      const { getByPlaceholderText, getByText } = render(App);
      const input = getByPlaceholderText('Add player name');
      
      await fireEvent.input(input, { target: { value: 'Bob' } });
      await fireEvent.keyDown(input, { key: 'Enter' });
      
      expect(getByText('Bob')).toBeTruthy();
    });

    it('can select and deselect individual players', async () => {
      const { getByPlaceholderText, getByLabelText } = render(App);
      const input = getByPlaceholderText('Add player name');
      
      await fireEvent.input(input, { target: { value: 'Charlie' } });
      await fireEvent.keyDown(input, { key: 'Enter' });
      
      const checkbox = getByLabelText('Charlie');
      expect(checkbox.checked).toBe(false);
      
      await fireEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);
      
      await fireEvent.click(checkbox);
      expect(checkbox.checked).toBe(false);
    });
  });

  describe('Team Generation Logic', () => {
    it('can generate basic teams', async () => {
      const { getByPlaceholderText, getByText, getByLabelText } = render(App);
      const input = getByPlaceholderText('Add player name');
      
      // Add players
      await fireEvent.input(input, { target: { value: 'Alice' } });
      await fireEvent.keyDown(input, { key: 'Enter' });
      await fireEvent.input(input, { target: { value: 'Bob' } });
      await fireEvent.keyDown(input, { key: 'Enter' });
      
      // Select players
      await fireEvent.click(getByLabelText('Alice'));
      await fireEvent.click(getByLabelText('Bob'));
      
      // Generate teams
      const button = getByText('Generate Teams');
      await fireEvent.click(button);
      
      expect(getByText('Team 1')).toBeTruthy();
    });

    it('can use select all functionality', async () => {
      const { getByPlaceholderText, getByText, getByLabelText } = render(App);
      const input = getByPlaceholderText('Add player name');
      
      // Add players
      await fireEvent.input(input, { target: { value: 'Alice' } });
      await fireEvent.keyDown(input, { key: 'Enter' });
      await fireEvent.input(input, { target: { value: 'Bob' } });
      await fireEvent.keyDown(input, { key: 'Enter' });
      
      // Use select all
      await fireEvent.click(getByText('Select All'));
      
      expect(getByLabelText('Alice').checked).toBe(true);
      expect(getByLabelText('Bob').checked).toBe(true);
    });
  });
});
