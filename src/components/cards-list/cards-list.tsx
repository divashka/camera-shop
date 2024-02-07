import CardItem from '../card-item/card-item';
import { Product } from '../../types';

type CardsListProps = {
  products: Product[];
}

function CardsList({ products }: CardsListProps): JSX.Element {
  return (
    <div className="cards catalog__cards" data-testid="cardsListWrapper">
      {
        products.map((product) => (
          <CardItem key={product.id} product={product}></CardItem>
        ))
      }
    </div>
  );
}

export default CardsList;
