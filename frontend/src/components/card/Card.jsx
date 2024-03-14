const Card = ({ children, cardClass }) => {
  return <div className={`card ${cardClass}`}>{children}</div>;
};

export default Card;

/* <Card cardClass="my-custom-class">
  {/* Card content }
</Card>
*/