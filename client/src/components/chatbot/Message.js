import React from 'react'
import styled from 'styled-components'

import avatar from '../../assets/images/LFface.svg'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 4fr;
  grid-gap: 10px;
`

const Mebox = styled.div`
  background: #e4eef7;
  text-align: left;
  grid-column-start: 3;
  grid-column-end: 4;
  margin: 5%;
  padding: 8%;
  border-radius: 2px;
`

const Botbox = styled.div`
  background: #f3f3f3;
  text-align: left;
  grid-column-start: 2;
  grid-column-end: 3;
  margin: 5%;
  padding: 8%;
  border-radius: 2px;
`

const Botface = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  margin: auto;
  text-align: center;
`

const Message = (props) => {
  return (
    <Container>
      {props.speaks === 'bot' && (
        <>
          <Botface>
            <img src={avatar} width="90%" alt="avatar of chatbot" />
          </Botface>
          <Botbox>{props.text}</Botbox>
        </>
      )}
      {props.speaks === 'me' && (
        <Mebox>
          {props.text}
          <br />
        </Mebox>
      )}
    </Container>
  )
}

export default Message
