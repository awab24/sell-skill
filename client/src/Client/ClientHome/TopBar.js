import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ImgSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <ImgSliderContainer>
      <BlueBorder />
      <Carousel {...settings}>
        <Wrap>
          <img src="/images/Slider1.png" alt="" />
        </Wrap>
        <Wrap>
          <img src="/images/Slider5.jpg" alt="" />
        </Wrap>
        <Wrap>
          <img src="/images/Slider7.jpg" alt="" />
        </Wrap>
        <Wrap>
          <img src="/images/Slider8.png" alt="" />
        </Wrap>
        <Wrap>
          <img src="/images/Slider9.webp" alt="" />
        </Wrap>
      </Carousel>
    </ImgSliderContainer>
  );
}

export default ImgSlider;

const ImgSliderContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const BlueBorder = styled.div`
  height: 5px;
  background-color: #007bff;
  margin-bottom: 20px;
`;

const Carousel = styled(Slider)`
  .slick-prev:before,
  .slick-next:before {
    color: #000;
  }
  ul li button {
    &:before {
      font-size: 10px;
      color: white;
    }
  }
  li.slick-active button:before {
    color: white;
  }
  .slick-list {
    overflow: hidden;
  }
  .slick-prev {
    left: 10px;
    z-index: 1;
  }
  .slick-next {
    right: 10px;
    z-index: 1;
  }
`;

const Wrap = styled.div`
  img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
`;
