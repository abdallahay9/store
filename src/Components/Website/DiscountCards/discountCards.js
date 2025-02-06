import "./discountCards.css";
import DiscountCard from "./DiscountCard/discountCard.js";
import image from "./../../../Images/category.svg";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, TOPRATED } from "../../../Api/api.js";
import CardSiteLoading from "../../Loading/cardSiteLoading.js";
import Skeleton from "react-loading-skeleton";
export default function () {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}/${TOPRATED}`)
      .then((data) => {
        setProducts(data.data);
      })
      .catch(() =>
        setErr(
          "Failed to load products. Please try again later or contact support if the issue persists."
        )
      )
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    const time = setTimeout(() => {
      setErr("");
    }, 2400);
    return () => clearTimeout(time);
  }, [err]);
  return (
    <div>
      {
        loading ?
        <div style={{ height: "350px" }}>
        <Skeleton
          style={{ height: "100%" }}
          baseColor="#666666"
          highlightColor="#888888"
        />
      </div>
      : 
      products.length > 0 &&
      <div className="discountLabel">
        <div>
          <div className="discountLabel-title">
            <FontAwesomeIcon
              icon={faStar}
              className="complexProductCard_goldStar"
            />
            Top Rated
          </div>
          <div className="line"></div>
          <div className="discountLabel-p">
            Discover the top-rated products chosen by our customers! Exceptional
            quality, outstanding performance, and unforgettable experiences—all
            waiting for you. Get the best in the world of shopping now!
          </div>
        </div>
        <img src={image} />
      </div>
      }
      <div className="discountCard-container">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <CardSiteLoading key={i} />)
          : products.map((item) => {
              return (
                <DiscountCard
                  key={item.id}
                  id={item.id}
                  discount={item.discount}
                  title={item.title}
                  description={item.description}
                  rating={item.rating}
                  price={item.price}
                  image={item.images[0]?.image}
                />
              );
            })}
      </div>
      {err != "" && <span className="error error-dash">{err}</span>}
    </div>
  );
}
