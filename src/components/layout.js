import React, {useState} from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header/Header"
import Hamburger from './header/Hamburger'
import OverlayMenu from './header/OverlayMenu'
import "./layout.css"

const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const handleOverlayMenu = () => setMenuOpen(!menuOpen)

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <Hamburger handleOverlayMenu={handleOverlayMenu} />
      <OverlayMenu handleOverlayMenu={handleOverlayMenu} menuOpen={menuOpen} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 1920,
          padding: 0,
        }}
      >
        <main>{children}</main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
