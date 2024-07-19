import React, { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  height: 100vh;
  background-color: #f0f8ff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OuterCard = styled(Card)`
  background-color: #000;
  color: #00f;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 800px;
`;

const InnerCard = styled(Card)`
  background-color: #00f;
  color: #000;
  border-radius: 20px;
  padding: 20px;
`;

const Title = styled(Card.Title)`
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  width: 150px;
  margin: 5px;
  background-color: ${(props) => (props.selected ? '#00f' : '#000')};
  border-color: #000;
  color: ${(props) => (props.selected ? '#000' : '#fff')};
`;

const Input = styled(Form.Control)`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
`;

const NextButton = styled(Button)`
  display: block;
  width: 100%;
  background-color: #000;
  border-color: #000;
  color: #fff;
  border-radius: 5px;
`;

function TypeOfWork() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [others, setOthers] = useState('');

  const handleNextClick = async () => {
    navigate("/letter");
    console.log('categories ===> ' + category);
    await axios.post('https://sell-skill.com/api/endpoints/category', category);
  };

  const handleCategoryClick = (cat) => {
    setCategory((prevCategories) => {
      if (prevCategories.includes(cat)) {
        return prevCategories.filter((c) => c !== cat);
      } else {
        return [...prevCategories, cat];
      }
    });
  };

  const handleAddOther = () => {
    if (others.trim() && !category.includes(others)) {
      setCategory((prevCategories) => [...prevCategories, others]);
      setOthers('');
    }
  };

  return (
    <StyledContainer>
      <OuterCard>
        <InnerCard>
          <Title>
            <b>Which category are you interested in?</b>
          </Title>
          <ButtonsContainer>
            {['Coding', 'AI', 'Medicne', 'Health & fitness', 'Legal & financial advice', 'Languages', 'Hobbies & skills', 'Cryptocurrecny', 'Home improvement & DIY', 'Creative services', 'Education & tutoring', 'Entertainment & Leisure', 'Dropshipping', 'Pet services'].map((cat) => (
              <StyledButton
                key={cat}
                selected={category.includes(cat)}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </StyledButton>
            ))}
          </ButtonsContainer>
          <Input
            type="text"
            value={others}
            onChange={(e) => setOthers(e.target.value)}
            placeholder="Enter other field ..."
          />
          <StyledButton onClick={handleAddOther}>Add Other</StyledButton>
          <NextButton onClick={handleNextClick}>Next</NextButton>
        </InnerCard>
      </OuterCard>
    </StyledContainer>
  );
}

export default TypeOfWork;
