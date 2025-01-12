import Product from "./Product";
import { Carousel } from "./Carousel";

//TODO proveriti
export default function Farmer(props: any) {
  return (
    <div className="farmer farmer-products " key={props.record._id}>
      <h2 className="farmer-username ">USERNAME: {props.record.username}</h2>
      <Carousel>
        {props.record.products.map((product: any) => {
          return <Product product={product} />;
        })}
      </Carousel>
    </div>
  );
}
