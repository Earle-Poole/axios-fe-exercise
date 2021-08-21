import Document, { Head, Html, Main, NextScript } from 'next/document'
import styled, { ServerStyleSheet } from 'styled-components'

const Body = styled.body`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

export default class AxiosDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()

    const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />))

    const styleTags = sheet.getStyleElement()

    return { ...page, styleTags }
  }

  render() {
    return (
      <Html style={{ overflow: 'hidden' }}>
        <Head>
          <title>Axios Front End Exercise</title>
          {this.props.styleTags}
        </Head>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </Html>
    )
  }
}
