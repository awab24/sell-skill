import React from 'react';
import styled from "styled-components";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ImgSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  return (
    <ImgSliderContainer>
      <BlueBorder />
      <Carousel {...settings}>
        <Wrap>
          <img src="/images/Slider1.png" alt="" />
        </Wrap>
        <Wrap>
          <img src="/images/Slider5.png" alt="" />
        </Wrap>

        <Wrap>
          <img src="/images/Slider7.png" alt="" />
        </Wrap>
        <Wrap>
          <img src="/images/Slider8.jpg" alt="" />
        </Wrap>

        <Wrap>
          <img src="/images/Slider9.jpg" alt="" />
        </Wrap>
      </Carousel>
    </ImgSliderContainer>
  );
}

export default ImgSlider;

const ImgSliderContainer = styled.div`
  position: relative;
  margin-top: 20px;
`;

const BlueBorder = styled.div`
  height: 5px;
  background-color: blue;
`;

const Carousel = styled(Slider)`
  position: relative;
  margin: 20px auto;
  width: 90%;
  max-width: 1130px;
  height: 500px;
  overflow: hidden;

  ul li button {
    &:before {
      font-size: 10px;
      color: white;
    }
  }

  li.slick-active button::before {
    color: white;
  }

  .slick-list {
    overflow: visible;
  }

  button {
    z-index: 1;
  }

  .slick-prev, .slick-next {
    width: 50px;
    height: 50px;
  }
`;

const Wrap = styled.div`
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;

  img {
    border: 6px solid transparent;
    border-radius: 7px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition-duration: 300ms;

    &:hover {
      border: 4px solid rgba(249, 249, 249, 0.8);
    }
  }
`;
