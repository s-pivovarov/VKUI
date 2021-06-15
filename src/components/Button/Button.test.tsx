import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { baselineComponent } from '../../testing/utils';
import Button from './Button';

const button = () => screen.getByTestId('custom-btn');

describe('Button', () => {
  baselineComponent(Button);

  it('a11y: hasFocusVisible manages focus visible class properly', () => {
    const { rerender } = render(<Button data-testid="custom-btn">hasFocusVisible TRUE</Button>);
    expect(button()).toHaveClass('Tappable--focus-visible-outline');

    rerender(<Button hasFocusVisible={false} data-testid="custom-btn">hasFocusVisible FALSE</Button>);
    expect(button()).not.toHaveClass('Tappable--focus-visible-outline');
  });

  it('a11y: custom button has role="button" and tabindex', () => {
    render(<Button Component="div" data-testid="custom-btn">Кнопка #1</Button>);

    expect(button()).toHaveAttribute('role', 'button');
    expect(button()).toHaveAttribute('tabindex', '0');
  });

  it('a11y: custom button gets focused on tab', () => {
    render(<Button Component="div" data-testid="custom-btn">Кнопка #1</Button>);

    userEvent.tab();
    expect(button()).toHaveFocus();
  });
});
