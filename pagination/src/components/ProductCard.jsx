const ProductCard = ({ image, title }) => {
  return (
    <div
      style={{
        width: "400px",
        height: "500px",
        border: "1px solid black",
      }}
    >
      <img src={image[0]} width="300" height="300" />
      <h1 style={{ fontSize: "2rem" }}>{title}</h1>
    </div>
  );
};
export default ProductCard;
