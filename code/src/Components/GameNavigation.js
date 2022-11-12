import React from 'react';
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { generateNextDescription } from 'reducers/game';
import { NavButton } from './Buttons';

const DirectionButton = ({ direction, isAvailable, handleOnClick }) => {
  if (isAvailable) {
    return (
      <NavButton
        type="button"
        title={`Go ${direction}`}
        onClick={() => handleOnClick(direction)}>
        {direction.charAt(0)}
      </NavButton>
    )
  }

  return (
    // Return disabled button if not available
    <NavButton
      disabled
      type="button"
      title="This move is not possible here">
      {direction.charAt(0)}
    </NavButton>
  )
}

const GameNavigation = ({ actions }) => {
  // Get actions from API
  console.log('actions', actions)
  const dispatch = useDispatch();

  const handleOnClick = (direction) => {
    dispatch(generateNextDescription(direction));
  }

  const availableMoves = {}
  // eslint-disable-next-line array-callback-return
  actions.map((action) => {
    availableMoves[action.direction] = action
  })

  console.log('availableMoves', availableMoves)

  return (
    <ChooseDirectionWrapper>
      <p style={{ fontWeight: 'bold' }}>Choose direction</p>
      <DirectionGrid>
        <div />
        <div>
          <DirectionButton direction="North" isAvailable={availableMoves.North} handleOnClick={handleOnClick} />
        </div>
        <div />
        <div>
          <DirectionButton direction="West" isAvailable={availableMoves.West} handleOnClick={handleOnClick} />
        </div>
        <div />
        <div>
          <DirectionButton direction="East" isAvailable={availableMoves.East} handleOnClick={handleOnClick} />
        </div>
        <div />
        <div>
          <DirectionButton direction="South" isAvailable={availableMoves.South} handleOnClick={handleOnClick} />
        </div>
        <div />
      </DirectionGrid>
    </ChooseDirectionWrapper>
  )
}

const ChooseDirectionWrapper = styled.div`
    border: solid 2px red;
    display: grid;
    color: white;
    text-align: center;
  `

const DirectionGrid = styled.div`
    display: grid;
    grid-template-areas: 
      "empty north empty"
      "west empty east"
      "empty south empty";
    grid-template-rows: [row1-start] repeat(3, 1fr) [row1-end row2-start] repeat(3, 1fr) [row2-end row3-start] repeat(3, 1fr) [row3-end];
    grid-template-columns: repeat(3, 1fr);    
    width: 170px;
    height: 170px;
    gap: 5px;
    justify-self: center;
  `

export default GameNavigation;