import { render, screen } from '@testing-library/react';
import Banner from './banner';
import { withHistory } from '../../utils/with-history';

describe('Component Banner', () => {

  describe('should render correctly', () => {

    it('should render slides', () => {
      const preparedComponent = withHistory(<Banner />);

      render(preparedComponent);

      const slides = screen.getAllByTestId(/slide/i);
      const slidesImg = screen.getAllByAltText(/баннер/i);

      expect(slides).toHaveLength(3);
      expect(slidesImg).toHaveLength(3);
    });

  });

});
