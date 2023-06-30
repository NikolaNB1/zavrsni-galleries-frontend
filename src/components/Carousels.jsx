import Carousel from "react-bootstrap/Carousel";
const Carousels = ({ urls }) => {
  return (
    <>
      <Carousel>
        {urls.map((url, index) => (
          <Carousel.Item key={index}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <img
                className="d-block w-100"
                src={url}
                alt={`Slide ${index}`}
                width="300"
                height="300"
              />
            </a>
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};
export default Carousels;
