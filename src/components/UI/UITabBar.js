/** @jsx h */
import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'
import styles from './UITabBar.css'
import placeholderImage from '~/assets/song_placeholder.svg'
import homeSVG from '~/assets/icons/home.svg'
import homeBlueSVG from '~/assets/icons/home_blue.svg'
import librarySVG from '~/assets/icons/library.svg'
import libraryBlueSVG from '~/assets/icons/library_blue.svg'
import kitBlueSVG from '~/assets/icons/kit_blue.svg'
import UIIcon from './UIIcon'
import cc from 'classcat'

const UITabBar = (props, children) => (context) => {
  let { actions: { views: { setActive } }, views: { activeView } } = context

  const SetActive = (props, children) => {
    let { viewName } = props

    delete props.viewName

    return <div onclick={() => setActive(viewName)} {...props}>
      {children}
    </div>
  }

  return <nav class={styles['tab-bar']}>
    <SetActive viewName='home' class={cc([styles['item'], { [styles['active']]: activeView === 'home' }])}>
      {/* <img class={styles['icon']} alt='Home Icon' src={activeView === 'home' ? homeBlueSVG : homeSVG} /> */}
      <UIIcon icon='music' />
      <span>Explore</span>
    </SetActive>

    <SetActive viewName='library' class={cc([styles['item'], { [styles['active']]: activeView === 'library' }])}>
      <img class={styles['icon']} alt='Library Icon' src={activeView === 'library' ? libraryBlueSVG : librarySVG} />
      <span>Library</span>
    </SetActive>

    <SetActive viewName='profile' class={cc([styles['item'], { [styles['active']]: activeView === 'profile' }])}>
      {/* <img class={styles['icon']} alt='Profile Icon' src={activeView === 'profile' ? kitBlueSVG : kitSVG} /> */}
      <UIIcon icon='user' />
      <span>Profile</span>
    </SetActive>

    <Link to='/player' class={cc([styles['item'], styles['player']])}>
      <img alt='Cover Image' src={placeholderImage} />
    </Link>
  </nav>
}

export default UITabBar
