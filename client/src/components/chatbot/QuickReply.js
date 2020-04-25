import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  margin: 10px;
  color: black;
  background: papayawhip;
  padding: 10px 18px;
  font-size: 1.1rem;
  border-radius: 3px;
  text-decoration: none;
  &:hover {
    background: #ffdfa8;
  }
`

const QuickReply = (props) => {
  return (
    <Button
      as="a"
      href="/"
      onClick={(event) =>
        props.click(
          event,
          props.reply.structValue.fields.payload.stringValue,
          props.reply.structValue.fields.text.stringValue
        )
      }
    >
      {props.reply.structValue.fields.text.stringValue}
      {console.log(props)}
    </Button>
  )
}

export default QuickReply
