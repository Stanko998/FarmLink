//TODO refaktorisati kod
export default function Product(props: any): any {
  return (
    <div className={"carouselItem"} key={props.product.index}>
      <img
        src={props.product.image}
        alt={props.product.title}
        className={"productImage"}
      />
      <h3>{props.product.title}</h3>
      <div className="productDetails">
        <span className="productPrice">{props.product.unit}</span>
        <span>${props.product.price}</span>
      </div>
    </div>
  );
}
