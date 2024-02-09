import { render, screen } from '@testing-library/react';
import Loading from './loading';

describe('Component Loading', () => {

  describe('should render correctly', () => {

    it('should render spinner wrapper', () => {
      render(<Loading />);
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

  });

});
