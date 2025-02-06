import './siteProducts.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function ProductCard({ id, title, description, rating, price, image , discount }) {
    return (
        <div className='siteProductCard'>
            <div className='image' style={{ backgroundImage: `url(${image})` }}></div>
            <h1 className='title'>{title}</h1>
            <p className='des'>{description}</p>
            <div className='divider'></div>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='rating'>
                    <FontAwesomeIcon icon={faStar} className='goldStar' />
                    <span className='ratingValue'>{rating}</span>
                </div>
                <div className='product-discount'>
                    {discount != 0 ? `-${Math.ceil(discount * 100/ price)}%` : ""}
                </div>
            </div>
            <div className='priceAndBuy'>
                <div className='price'>${price}</div>
                <Link to={`/product/${id}`} className='buy'>
                    <FontAwesomeIcon icon={faShoppingCart} /> Buy Now
                </Link>
            </div>
        </div>
    );
}
