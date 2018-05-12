import React from 'react'
import omit from 'lodash.omit'
import pickBy from 'lodash.pickby'
import isPropValid from '@emotion/is-prop-valid'

export const get = (path, object) =>
  path.reduce(
    (acc, property) => (acc && acc[property] ? acc[property] : null),
    object,
  )

export const reorder = (list, from, to) => {
  const listCopy = [...list]
  const [removed] = listCopy.splice(from, 1)
  listCopy.splice(to, 0, removed)
  return listCopy
}

export const createComponent = ({
  type,
  excludeProps = [],
  includeProps = [],
}) =>
  React.forwardRef(({ is = type, ...props }, ref) =>
    React.createElement(is, {
      ref,
      ...omit(
        pickBy(
          props,
          (value, key) => isPropValid(key) || includeProps.includes(key),
        ),
        excludeProps,
      ),
    }),
  )