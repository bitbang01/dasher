import React from 'react'
import { Subscribe } from 'unstated'
import ModalContainer from '../containers/ModalContainer'

function ModalRoot() {
  return (
    <Subscribe to={[ModalContainer]}>
      {modal => {
        const { component: Component, props } = modal.state

        return (
          Component && <Component closeModal={modal.closeModal} {...props} />
        )
      }}
    </Subscribe>
  )
}

export default ModalRoot
