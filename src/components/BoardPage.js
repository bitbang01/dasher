import React from 'react'
import { shape, string } from 'prop-types'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import { Subscribe } from 'unstated'

import ModalContainer from '../containers/ModalContainer'
import UpdateBoardModal from './UpdateBoardModal'
import DeleteBoardModal from './DeleteBoardModal'
import NotFoundPage from './NotFoundPage'
import AccountMenu from './AccountMenu'
import Columns from './Columns'
import Button from './Button'
import Flex from './Flex'
import Spacer from './Spacer'
import { spacing } from '../theme'

export const BOARD_QUERY = gql`
  query BoardQuery($id: ID!) {
    board(id: $id) {
      id
      name
      columns(orderBy: index_ASC) {
        id
        index
        name
        query
      }
    }
  }
`

function BoardPage({ match }) {
  return (
    <Subscribe to={[ModalContainer]}>
      {modal => (
        <Query query={BOARD_QUERY} variables={{ id: match.params.id }}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error</div>
            if (!data.board) return <NotFoundPage />

            return (
              <div>
                <Flex padding={spacing[3]}>
                  <Link to="/">Back</Link>
                  <Spacer />
                  <AccountMenu />
                </Flex>

                <h1>{data.board.name}</h1>
                <Button
                  onClick={() =>
                    modal.openModal(UpdateBoardModal, {
                      board: data.board,
                    })
                  }
                >
                  Edit
                </Button>
                <Button
                  kind="danger"
                  onClick={() =>
                    modal.openModal(DeleteBoardModal, {
                      board: data.board,
                    })
                  }
                >
                  Delete board
                </Button>
                <Columns boardId={data.board.id} columns={data.board.columns} />
              </div>
            )
          }}
        </Query>
      )}
    </Subscribe>
  )
}

BoardPage.propTypes = {
  match: shape({
    params: shape({
      id: string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default BoardPage
