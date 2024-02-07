import { render, screen } from '@testing-library/react';
import ButtonScrollUp from './button-scroll-up';

describe('Component ButtonScrollUp', () => {

  describe('should render correctly', () => {

    it('should render button scroll up', () => {
      render(<ButtonScrollUp />);

      expect(screen.getByTestId(/scroll up/i)).toBeInTheDocument();
    });

  });

});
