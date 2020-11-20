import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'

import Menu from './menu'

import style from '../styles/header.module.css'

class Header extends React.Component {
  state = {
    // userTheme:
    //   (typeof window !== 'undefined' && window.localStorage.getItem('theme')) ||
    //   null,
    userTheme: 'light',
    isMobileMenuVisible: false,
    isSubMenuVisible: false,
  }

  onChangeTheme = this.onChangeTheme.bind(this)

  onToggleMobileMenu = this.onToggleMobileMenu.bind(this)

  onToggleSubMenu = this.onToggleSubMenu.bind(this)

  onChangeTheme() {
    // const { userTheme } = this.state
    const { userTheme } = 'light'
    const opositeTheme =
      userTheme === 'dark' || userTheme === null ? 'light' : 'dark'
    this.setState({ userTheme: opositeTheme })
    typeof window !== 'undefined' &&
      window.localStorage.setItem('theme', opositeTheme)
  }

  onToggleMobileMenu() {
    const { isMobileMenuVisible } = this.state
    this.setState({ isMobileMenuVisible: !isMobileMenuVisible })
  }

  onToggleSubMenu() {
    const { isSubMenuVisible } = this.state
    this.setState({ isSubMenuVisible: !isSubMenuVisible })
  }

  render() {
    const {
      siteUrl,
      siteLogo,
      logoText,
      siteTitle,
      mainMenu,
      mainMenuItems,
      menuMoreText,
      rssFeed,
      theme
    } = this.props
    const { userTheme, isSubMenuVisible, isMobileMenuVisible } = this.state

    return (
      <>
        <Helmet>
          <title>{siteTitle}</title>
          <body
            // className={
            //   (userTheme || theme) === 'light' ? 'light-theme' : 'dark-theme'
            // }
            className={
              'light-theme'
            }
          />
        </Helmet>
        <header className={style.header}>
          <div className={style.inner}>
            <Link to="/">
              <div className={style.logo}>
                {/* {siteLogo.src ? (
                  <img src={siteLogo.src} alt={siteLogo.alt} />
                ) : (
                    <>
                      <span className={style.mark}>></span>
                      <span className={style.text}>{logoText}</span>
                      <span className={style.cursor} />
                    </>
                  )} */}
                <span className={style.text}>{siteLogo.alt}</span>
              </div>
            </Link>
            <span className={style.right}>
              <Menu
                mainMenu={mainMenu}
                mainMenuItems={mainMenuItems}
                isMobileMenuVisible={isMobileMenuVisible}
                isSubMenuVisible={isSubMenuVisible}
                menuMoreText={menuMoreText}
                onToggleMobileMenu={this.onToggleMobileMenu}
                onToggleSubMenu={this.onToggleSubMenu}
                onChangeTheme={this.onChangeTheme}
              />
              <a href={rssFeed.path} target="_blank" className={style.rss}>
                <img src={rssFeed.src} alt={rssFeed.alt}/>
              </a>
            </span>
          </div>
        </header>
      </>
    )
  }
}

Header.propTypes = {
  siteUrl: PropTypes.string,
  siteTitle: PropTypes.string,
  siteLogo: PropTypes.object,
  logoText: PropTypes.string,
  theme: PropTypes.string,
  mainMenu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
    }),
  ),
  mainMenuItems: PropTypes.number,
  menuMoreText: PropTypes.string,
  rssFeed: PropTypes.object,
}

export default Header
