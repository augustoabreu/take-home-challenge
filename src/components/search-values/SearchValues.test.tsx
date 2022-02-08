import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchValues } from './SearchValues';

it('should render with based on term', () => {
  render(<SearchValues term="valhalla/dis 12" onSelect={jest.fn()} />);
  expect(screen.getAllByText(/valhalla\//)).toHaveLength(4);
});

it('should call onSelect when clicking on a result', () => {
  const handleOnSelect = jest.fn();
  render(<SearchValues term="valhalla/dis 12" onSelect={handleOnSelect} />);
  const results = screen.getAllByText(/valhalla\//);
  userEvent.click(results[0]);
  expect(handleOnSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'valhalla/distilbart-mnli-12-3' }))
});

it('should allow user to navigate using arrows up-down', () => {
  const { container } = render(<SearchValues term="valhalla/dis 12" onSelect={jest.fn()} />);
  const arrowDownEvent = {
    key: 'ArrowDown'
  };
  const arrowUpEvent = {
    key: 'ArrowUp'
  };
  fireEvent.keyDown(container, arrowDownEvent);
  expect(document.activeElement).toBe(screen.getAllByRole('button')[0]);

  fireEvent.keyDown(container, arrowUpEvent);
  // should keep first item focused
  expect(document.activeElement).toBe(screen.getAllByRole('button')[0]);

  fireEvent.keyDown(container, arrowDownEvent);
  expect(document.activeElement).toBe(screen.getAllByRole('button')[1]);
  fireEvent.keyDown(container, arrowDownEvent);
  expect(document.activeElement).toBe(screen.getAllByRole('button')[2]);
  fireEvent.keyDown(container, arrowDownEvent);
  expect(document.activeElement).toBe(screen.getAllByRole('button')[3]);
  fireEvent.keyDown(container, arrowDownEvent);
  // should keep last item focused
  expect(document.activeElement).toBe(screen.getAllByRole('button')[3]);

  fireEvent.keyDown(container, arrowUpEvent);
  // should go one item up
  expect(document.activeElement).toBe(screen.getAllByRole('button')[2]);
});
