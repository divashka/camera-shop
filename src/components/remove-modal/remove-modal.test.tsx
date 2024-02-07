import { render, screen } from '@testing-library/react';
import ProductRemoveModal from './remove-modal';

describe('Component ProductRemoveModal', () => {

  describe('should render correctly', () => {

    it('should render title remove', () => {
      render(<ProductRemoveModal />);

      expect(screen.getByText(/удалить этот товар/i)).toBeInTheDocument();
    });

    it('should render remove button and continue button link', () => {
      render(<ProductRemoveModal />);

      expect(screen.getByRole('link', { name: /продолжить покупки/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /удалить/i })).toBeInTheDocument();
    });

  });

});
