import React from 'react'
import { shape, func } from 'prop-types'
import glamorous from 'glamorous'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import { fontSizes, colors, fontWeights, spacing, lineHeights } from '../theme'
import { toAlpha, joinSpacing } from '../utils/style'
import { logOut } from '../utils/auth'
import Button from './Button'
import Avatar from './Avatar'
import Dropdown, { MenuItem, MenuDivider } from './Dropdown'
import Flex from './Flex'

const ME_QUERY = gql`
  query MeQuery {
    me {
      name
      login
      avatarUrl
    }
  }
`

const Name = glamorous.span({
  fontSize: fontSizes[2],
  lineHeight: lineHeights.normal,
  whiteSpace: 'nowrap',
  color: colors.white,
})

const Login = glamorous.span({
  fontSize: fontSizes[1],
  lineHeight: lineHeights.normal,
  whiteSpace: 'nowrap',
  color: toAlpha(colors.gray[6], colors.black),
})

function AccountMenu({ history }) {
  return (
    <Query query={ME_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error</div>

        return (
          <Dropdown
            toggleComponent={props => (
              <Avatar
                src={data.me.avatarUrl}
                alt={data.me.login}
                size={32}
                shape="circle"
                {...props}
              />
            )}
          >
            <Flex
              flexDirection="column"
              padding={joinSpacing(spacing[1], spacing[3])}
            >
              <Name>{data.me.name}</Name>
              <Login>{data.me.login}</Login>
            </Flex>
            <MenuDivider />
            <MenuItem
              onClick={() => {
                logOut()
                history.push('/login')
              }}
            >
              Log out
            </MenuItem>
          </Dropdown>
        )
      }}
    </Query>
  )
}

AccountMenu.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
}

export default withRouter(AccountMenu)
