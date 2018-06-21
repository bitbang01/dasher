import React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'
import { Subscribe } from 'unstated'
import ModalContainer from '../containers/ModalContainer'
import {
  breakpoints,
  colors,
  fontSizes,
  fontWeights,
  radii,
  shadows,
  space,
  transition,
} from '../theme'
import { toAlpha } from '../utils/style'
import Button from './Button'
import DeleteBoardModal from './DeleteBoardModal'
import Dropdown, { MenuItem } from './Dropdown'
import Flex from './Flex'
import { EllipsesIcon } from './Icon'
import Spacer from './Spacer'
import UpdateBoardModal from './UpdateBoardModal'

const CardLink = styled(Link)({
  padding: space[3],
  fontSize: fontSizes[3],
  fontWeight: fontWeights.bold,
  textDecoration: 'none',
  color: toAlpha(colors.gray[8]),
  backgroundColor: colors.white,
  borderRadius: radii[1],
  boxShadow: shadows[1],
  outline: 0,
  transitionProperty: 'box-shadow',
  transitionDuration: transition.duration,
  transitionTimingFunction: transition.easing,

  ':hover,:focus': {
    boxShadow: shadows[2],
  },

  [breakpoints.sm]: {
    height: 160,
  },
})

function BoardCard({ board }) {
  return (
    <Subscribe to={[ModalContainer]}>
      {modal => (
        <CardLink to={`/board/${board.id}`}>
          <Flex css={{ alignItems: 'center', paddingLeft: space[1] }}>
            <span>{board.name}</span>
            <Spacer />
            <Dropdown
              renderMenuButton={({ getMenuButtonProps }) => (
                <Button
                  {...getMenuButtonProps({
                    refKey: 'innerRef',
                    buttonStyle: 'icon',
                  })}
                >
                  <EllipsesIcon />
                </Button>
              )}
            >
              <MenuItem
                onClick={event => {
                  event.preventDefault()
                  modal.openModal(UpdateBoardModal, { board })
                }}
              >
                Edit board
              </MenuItem>
              <MenuItem
                onClick={event => {
                  event.preventDefault()
                  modal.openModal(DeleteBoardModal, { board })
                }}
              >
                Delete board
              </MenuItem>
            </Dropdown>
          </Flex>
        </CardLink>
      )}
    </Subscribe>
  )
}

export default BoardCard
