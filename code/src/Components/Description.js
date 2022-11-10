import React from 'react';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { generateNextDescription } from 'reducers/game';
import Wrapper from './Wrapper';
import Button from './Button';

function coordsToBackgroundImage(coords) {
  if (coords === '0,0') {
    return './assets/images/image_1.jpg'
  } else if (coords === '1,0') {
    return './assets/images/image_2.jpg'
  } else if (coords === '1,1') {
    return './assets/images/image_3.jpg'
  } else if (coords === '0,1') {
    return './assets/images/image_4.jpg'
  } else if (coords === '0,2') {
    return './assets/images/image_5.jpg'
  } else if (coords === '0,3') {
    return './assets/images/image_6.jpg'
  } else if (coords === '1,3') {
    return './assets/images/image_7.jpg'
  }
  return './assets/images/fallback.jpg'
}

const DirectionInput = ({ actions }) => {
  console.log('actions', actions)
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(generateNextDescription(direction));
    console.log('generateNextDescription(direction)', generateNextDescription(direction))
  }

  return (
    <ChooseDirectionWrapper>

      {/* <button type="button">North</button>
      <button type="button">East</button>
      <button type="button">South</button>
      <button type="button">West</button> */}

      {actions.map((action) => (
        <>
          <Button
            key={action.direction}
            type="button"
            onClick={(event) => handleOnClick(event.target.value)}
            value={action.direction}>
            {action.direction}
          </Button>
          <div>
            {action.description}
          </div>
        </>
      ))}

    </ChooseDirectionWrapper>
  )
}

const Description = () => {
  const description = useSelector((state) => state.game.description); // get description
  console.log('description', description);

  const bgImage = coordsToBackgroundImage(description.coordinates);
  console.log(bgImage);

  console.log(description);
  return (
    <DescriptionContainer bgImage={bgImage}>
      <Wrapper>

        <DescriptionText>{description.description}</DescriptionText>
        <DirectionInput
          actions={description.actions} />
      </Wrapper>
    </DescriptionContainer>
  );
}
export default Description;

const DescriptionContainer = styled.section`
border: solid 2px blue;
display: flex;
flex-direction: column;
justify-content: center;
/* background-image: url(${(props) => props.bgImage}); */
background-image: url('/assets/images/image_3.jpg');
min-height: 100vh;
background-size: cover;
background-position: top center;;
`
const DescriptionText = styled.div`
border: solid 2px green;
color: white;
margin-top: 330px;
`
const ChooseDirectionWrapper = styled.div`
border: solid 2px red;
display: grid;
`