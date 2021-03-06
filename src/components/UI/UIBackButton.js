/** @jsx h */
import { h } from 'hyperapp'
import UILink from './UILink'
import UIIcon from './UIIcon'
import styles from './UIBackButton.css'

export default (props, children) => (state) => {
  let { text } = props
  let { views, location } = state
  let parentViewStack = views.stacks[views.activeView].stack
  let previousViewStackPath = parentViewStack.length > 1 && parentViewStack[parentViewStack.length - 2].path

  let backLocation = previousViewStackPath || `/${views.activeView}`
  let isBrowserHistoryBack = location.previous === previousViewStackPath

  return <UILink class={styles['back-button']} back={isBrowserHistoryBack} replace={!isBrowserHistoryBack} to={backLocation}>
    <UIIcon
      style={{ marginRight: '-0.4rem', marginLeft: '-0.75rem' }}
      width='36' height='36'
      icon='chevron-left'
    />
    <p class={styles['text']}>
      <span>{text || 'Back'}</span>
    </p>
  </UILink>
}
