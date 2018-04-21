import React from 'react'
import { func } from 'prop-types'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import Modal from 'react-modal'

import { BOARDS_QUERY } from './Boards'

const CREATE_BOARD_MUTATION = gql`
  mutation CreateBoardMutation($name: String!) {
    createBoard(name: $name) {
      id
      name
    }
  }
`
class CreateBoardModal extends React.Component {
  static propTypes = {
    closeModal: func.isRequired,
  }

  state = { name: '' }

  handleNameChange = event => {
    this.setState({ name: event.target.value })
  }

  render() {
    const { closeModal } = this.props
    const { name } = this.state

    return (
      <Mutation
        mutation={CREATE_BOARD_MUTATION}
        update={(cache, { data }) => {
          const { boards } = cache.readQuery({ query: BOARDS_QUERY })
          cache.writeQuery({
            query: BOARDS_QUERY,
            data: { boards: boards.concat([data.createBoard]) },
          })
        }}
      >
        {createBoard => (
          <Modal isOpen onRequestClose={closeModal}>
            <form
              id="create-board"
              onSubmit={event => {
                event.preventDefault()
                createBoard({ variables: { name } })
                closeModal()
              }}
            >
              <label>
                Name
                <div>
                  <input
                    value={name}
                    onChange={this.handleNameChange}
                    required
                  />
                </div>
              </label>
            </form>
            <button type="submit" form="create-board">
              Create
            </button>
            <button onClick={closeModal}>Cancel</button>
          </Modal>
        )}
      </Mutation>
    )
  }
}

export default CreateBoardModal