import CardItem from '../card-item/card-item';
import { Product } from '../../types/types';

type CardsListProps = {
  products: Product[];
}

function CardsList({ products }: CardsListProps): JSX.Element {

  return (
    <div className="cards catalog__cards">
      {
        products.map((product) => (
          <CardItem key={product.id} product={product}></CardItem>
        ))
      }
    </div>
  );
}

export default CardsList;
