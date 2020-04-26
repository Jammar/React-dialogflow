import React, { Component } from 'react'
import styled from 'styled-components'

import avatar from '../../assets/images/LFface.svg'
import QuickReply from './QuickReply'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 4fr;
  grid-gap: 10px;
`

const Botbox = styled.div`
  background: #f3f3f3;
  text-align: left;
  grid-column-start: 2;
  grid-column-end: 3;
  margin: 5%;
  padding: 8%;
`

const Botface = styled.div`
    grid-column-start: 1;
    grid-column-end: 2;
    text-align: center;
    font-size 2rem;
    margin: auto;
`

const Quickbox = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  text-align: center;
  margin: 5%;
`

class QuickReplies extends Component {
  constructor(props) {
    super(props)
    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick(event, payload, text) {
    this.props.replyClick(event, payload, text)
  }

  renderQuickReply(reply, i) {
    return <QuickReply key={i} click={this._handleClick} reply={reply} />
  }

  renderQuickReplies(quickReplies) {
    if (quickReplies) {
      return quickReplies.map((reply, i) => {
        return this.renderQuickReply(reply, i)
      })
    } else {
      return null
    }
  }

  botTextReply() {
    if (this.props.text && this.props.text.stringValue) {
      return (
        <>
          <Botface>
            <img src={avatar} width="90%" alt="avatar of chatbot" />
          </Botface>
          <Botbox>{this.props.text.stringValue}</Botbox>
        </>
      )
    }
  }

  render() {
    return (
      <Container>
        {this.props.speaks === 'bot' && (
          <>
            {this.botTextReply()}
            <Quickbox>{this.renderQuickReplies(this.props.payload)}</Quickbox>
          </>
        )}
      </Container>
    )
  }
}

export default QuickReplies
