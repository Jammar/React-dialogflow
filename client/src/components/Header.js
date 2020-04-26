import React from 'react'

import styled from 'styled-components'

import logo from '../assets/images/gemensam_logogtyp.png'

const Head = styled.header`
  height: 10vh;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  margin-bottom: 1vh;

  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
`
const Header = () => (
    <Head>
      <img src={logo} alt="Länsförsäkringars gemensamma logotyp" />
    </Head>
)

export default Header
