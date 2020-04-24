import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import Message from './Message'
import Cookies from 'universal-cookie'
import uuid from 'uuid'

import QuickReplies from './QuickReplies'

const InputBox = styled.input`
  background: #f3f3f3;
  width: 100%;
  padding: 20px;
  font-size: 16px;
  border: none transparent;
  outline: none;
`

const ChatBox = styled.div`
  width: 500px;
  margin: 0 auto;
  height: 70vh;
`

const ChatBotBox = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
  padding: 4%;
  padding-top: 20px;
`

const cookies = new Cookies()

class Chatbot extends Component {
  messagesEnd
  constructor(props) {
    super(props)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this)

    this.state = {
      messages: [],
    }

    if (cookies.get('userID') === undefined) {
      cookies.set('userID', uuid(), { path: '/' })
    }
    console.log(cookies.get('userID'))
  }

  _handleQuickReplyPayload(event, payload, text) {
    event.preventDefault()
    event.stopPropagation()

    switch (payload) {
      case 'laggtill_payload':
        this.df_event_query('EVENTNAMN')
        break
      default:
        this.df_text_query(text)
        break
    }
  }

  async df_text_query(text) {
    let says = {
      speaks: 'me',
      msg: {
        text: {
          text: text,
        },
      },
    }
    this.setState({
      messages: [...this.state.messages, says],
    })
    try {
      const res = await axios.post('/api/df_text_query', {
        text,
        userID: cookies.get('userID'),
      })
      for (let msg of res.data.fulfillmentMessages) {
        console.log(msg)
        says = {
          speaks: 'bot',
          msg: msg,
        }
        this.setState({
          messages: [...this.state.messages, says],
        })
      }
    } catch (e) {
      says = {
        speaks: 'bot',
        msg: {
          text: {
            text: ' Någonting blev fel, testa gärna igen.',
          },
        },
      }
      this.setState({ messages: [...this.state.messages, says] })
    }
  }

  async df_event_query(event) {
    try {
      const res = await axios.post('/api/df_event_query', {
        event,
        userID: cookies.get('userID'),
      })
      for (let msg of res.data.fulfillmentMessages) {
        let says = {
          speaks: 'bot',
          msg: msg,
        }
        this.setState({
          messages: [...this.state.messages, says],
        })
      }
    } catch {
      let says = {
        speaks: 'bot',
        msg: {
          text: {
            text: 'Någonting blev fel, testa gärna igen.',
          },
        },
      }
      this.setState({ messages: [...this.state.messages, says] })
    }
  }

  resolveAfterXSeconds(x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(x)
      }, (x = 1000))
    })
  }

  async componentDidMount() {
    this.df_event_query('Welcome')
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behaviour: 'smooth' })
    if (this.talkInput) {
      this.talkInput.focus()
    }
  }

  handleQuickReplyPayload(event, payload, text) {
    event.preventDefault()
    event.stopPropagation()

    switch (payload) {
      case 'recommend_yes':
        this.df_event_query('SHOW_RECOMMENDATIONS')
        break
      case 'training_masterclass':
        this.df_event_query('MASTERCLASS')
        break
      default:
        this.df_text_query(text)
        break
    }
  }

  renderOneMessage(message, i) {
    if (message.msg && message.msg.text && message.msg.text.text) {
      return (
        <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
      )
    } else if (
      message.msg &&
      message.msg.payload &&
      message.msg.payload.fields &&
      message.msg.payload.fields.quick_replies
    ) {
      return (
        <QuickReplies
          text={
            message.msg.payload.fields.text
              ? message.msg.payload.fields.text
              : null
          }
          key={i}
          replyClick={this._handleQuickReplyPayload}
          speaks={message.speaks}
          payload={message.msg.payload.fields.quick_replies.listValue.values}
        />
      )
    }
  }

  renderMessages(stateMessages) {
    if (stateMessages) {
      return stateMessages.map((message, i) => {
        return this.renderOneMessage(message, i)
      })
    } else {
      return null
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.df_text_query(e.target.value)
      e.target.value = ''
    }
  }

  render() {
    return (
      <ChatBox>
        <ChatBotBox>
          {this.renderMessages(this.state.messages)}
          <div
            ref={(el) => {
              this.messagesEnd = el
            }}
          />
        </ChatBotBox>
        <div>
          <InputBox
            placeholder="Skriv ett meddelande"
            type="text"
            maxLength="255"
            onKeyPress={this.handleKeyPress}
          />
        </div>
      </ChatBox>
    )
  }
}

export default Chatbot
