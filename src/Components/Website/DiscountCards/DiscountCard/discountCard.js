import './discountCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function ProductCard({ id, title, description, rating, price, image, discount }) {
    return (
        <div className='complexProductCard_container'>
            <div className='complexProductCard_image' style={{ backgroundImage: `url(${image})` }}></div>
            <div className='complexProductCard_details'>
                <h1 className='complexProductCard_title'>{title}</h1>
                <p className='complexProductCard_description'>{description}</p>
                <div className='complexProductCard_divider'></div>
                <div className='complexProductCard_ratingDiscount'>
                    <div className='complexProductCard_rating'>
                        <FontAwesomeIcon icon={faStar} className='complexProductCard_goldStar' />
                        <span className='complexProductCard_ratingValue'>{rating}</span>
                    </div>
                    <div className='complexProductCard_discount'>
                        {discount !== 0 ? `-${Math.ceil(discount * 100/ price)}%` : ""}
                    </div>
                </div>
                <div className='complexProductCard_priceAndBuy'>
                    <div className='complexProductCard_price'>${price}</div>
                    <Link to={`/product/${id}`} className='complexProductCard_buy'>
                        <FontAwesomeIcon icon={faShoppingCart} /> Buy Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
