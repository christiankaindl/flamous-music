import { h } from 'hyperapp'
import picostyle from 'picostyle'
import { styler, value, listen, pointer, spring, schedule, everyFrame, transform } from 'popmotion'
import playImage from '../assets/play.svg'
import pauseImage from '../assets/pause.svg'
import { nestable } from 'hyperapp-context'
// import { Link } from '@hyperapp/router'

const {nonlinearSpring, smooth} = transform

const pointerX = (preventDefault = false, x = 0) => pointer({x: x, preventDefault: preventDefault}).pipe(val => val.x)

// function makeInteractive (element) {
//   const AXIS_LOCK_THRESHOLD = 13 // Pixel
//   const ACTIONABLE_THRESHOLD = {
//     'top': 13,
//     'left': 25,
//     'right': 25
//   } // Pixel

//   const handleStyler = styler(element)
//   const handle = {
//     x: value(0, handleStyler.set('x')),
//     y: value(0, handleStyler.set('y'))
//   }

//   const oneDirectionalPointer = axis => pointer({[axis]: 0}).pipe(v => v[axis])

//   let currentHandle
//   let direction = 'none'
//   let stopPointer
//   let axis
//   let springCurve

//   listen(element, 'mousedown touchstart')
//     .start((e) => {
//       let currentThreshold
//       let {stop} = pointer({x: 0, y: 0})
//         .pipe(({x}) => x)
//         .start((x) => {
//           if (Math.abs(x) > AXIS_LOCK_THRESHOLD) {
//             axis = 'x'
//             direction = (x < 0)
//               ? 'left'
//               : 'right'
//             stop()
//           }
//           // else if (Math.abs(y) > AXIS_LOCK_THRESHOLD) {
//           //   axis = 'y'
//           //   direction = (y < 0)
//           //     ? 'top'
//           //     : 'bottom'
//           //   stop()
//           // }

//           if (direction === 'none') return

//           switch (direction) {
//             case 'top':
//               springCurve = nonlinearSpring(2.2, 0)
//               break
//             case 'bottom':
//               springCurve = nonlinearSpring(0.8, 0)
//               break
//             case 'right':
//             case 'left':
//               springCurve = nonlinearSpring(3, 0)
//           }

//           currentThreshold = ACTIONABLE_THRESHOLD[direction]
//           currentHandle = handle[axis]

//           // currentHandle.subscribe((val) => {
//           //   indicator.style.width = `${2.1 + (0.6 * (Math.abs(val) / currentThreshold))}em`
//           //   if (Math.abs(val) > currentThreshold) {
//           //     element.classList.add('active')
//           //   } else {
//           //     element.classList.remove('active')
//           //   }
//           // })

//           stopPointer = schedule(
//             everyFrame(),
//             oneDirectionalPointer(axis))
//             .pipe(springCurve, smooth(25))
//             .start(currentHandle)
//         })

//       function playPause () {
//         if (!window.Amplitude.audio().paused) {
//           window.Amplitude.pause()
//         } else {
//           window.Amplitude.play()
//         }
//       }

//       let upListener = listen(document, 'mouseup touchend')
//         .start((e) => {
//           upListener.stop()
//           stopPointer && stopPointer.stop()
//           stop()

//           if (!currentHandle) return

//           // element.classList.remove('active')

//           if (Math.abs(currentHandle.get()) >= currentThreshold) {
//             switch (direction) {
//               case 'top':
//                 playPause()
//                 break
//               case 'left':
//                 window.Amplitude.next()
//                 break
//               case 'right':
//                 window.Amplitude.prev()
//                 break
//               default:
//                 console.info('Clicked ScrubBar')
//             }
//           }
//           direction = 'none'
//           axis = 'none'
//           spring({
//             from: currentHandle.get(),
//             velocity: currentHandle.getVelocity()
//           })
//             .start(currentHandle)
//         })
//     })
// }

const style = picostyle(h)

const BubbleStyles = style('div')((props) => ({
  width: '100%',
  padding: '0.4em',
  display: 'flex',
  position: 'relative',
  height: '4.2em',
  cursor: 'default',
  justifyContent: 'space-between',
  backgroundColor: '#fdfdfd',
  alignItems: 'center',
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 23px -7px',
  '&:active': {
    backgroundColor: '#f0f0f0'
  },
  '@media (min-width: 768px)': {
    '&': {
      maxWidth: '440px',
      borderRight: '1px solid #f0f0f0'
    }
  }
}))

const Bubble = BubbleStyles

const SongCover = style('img')({
  height: '100%',
  borderRadius: '16%',
  boxSizing: 'border-box',
  pointerEvents: 'none'
})

const Song = style('div')({
  fontWeight: 'bold'
})

const PlayButton = style('span')({
  backgroundColor: '#fafafa',
  borderRadius: '100%',
  border: '1px solid #f0f0f0',
  display: 'inline-block',
  height: '3em',
  width: '3em',
  padding: '4px',
  marginRight: '5px'
})

const Artist = style('div')({
  fontWeight: 'normal'
})

const Info = style('div')({
  paddingLeft: '1em',
  alignSelf: 'center'
})

const Wrapper = style('div')({
  zIndex: '1000',
  width: '100%',
  display: 'flex',
  position: 'absolute',
  bottom: '0px',
  boxSizing: 'border-box',
  justifyContent: 'space-between'
  // overflow: 'hidden'
})
const Progress = style('progress')({
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none',
  width: '100%',
  height: '0.2em',
  border: 'none',
  backgroundColor: '#e0e0e0',
  position: 'absolute',
  top: '0px',
  left: '0px',
  transform: 'translateY(-1px)'
})

function playPause () {
  if (!window.Amplitude.audio().paused) {
    window.Amplitude.pause()
  } else {
    window.Amplitude.play()
  }
}

const TrackBar = nestable({
  handleStyler: null,
  handleX: null,
  AXIS_LOCK_THRESHOLD: 15,
  isAxisLocked: false,
  makeInteractive: false,
  currentPointer: null,
  upListener: null,
  currentHandle: null,
  direction: 'none',
  stopPointer: null,
  axis: null,
  springCurve: nonlinearSpring(3, 0),
  ACTIONABLE_THRESHOLD: 20
},
{
  makeInteractive: (element) => (state, actions) => {
    console.info('Making interactive')
    let {startSwipeBack} = actions

    element.style.transform = 'translateY(110%)'

    let handleStyler = styler(element)
    let handleX = value(0, handleStyler.set('x'))
    let handleY = value(0, handleStyler.set('y'))

    // Initial slide-in
    spring({
      from: '110%',
      to: '0%',
      damping: 20,
      mass: 0.5
    }).start(handleY)

    listen(element, 'mousedown touchstart', { passive: true })
      .start(startSwipeBack)

    return {
      handleX: handleX
    }
  },
  startSwipeBack: (e) => (state, actions) => {
    let { endSwipeBack, setAxisAndDirection } = actions
    let { springCurve, axis, direction, currentPointer, AXIS_LOCK_THRESHOLD, handleX } = state

    currentPointer = pointer({x: 0, y: 0})
      .pipe(({x}) => x)
      .start((x) => {
        if (Math.abs(x) > AXIS_LOCK_THRESHOLD) {
          axis = 'x'
          direction = (x < 0)
            ? 'left'
            : 'right'

          setAxisAndDirection({
            axis: axis,
            direction: direction
          })
          currentPointer.stop()
        }

        if (direction === 'none') return

        currentPointer = schedule(
          everyFrame(),
          pointerX(axis))
          .pipe(springCurve, smooth(25))
          .start(handleX)
      })

    let upListener = listen(document, 'mouseup touchend')
      .start(endSwipeBack)

    return {
      currentPointer: currentPointer,
      upListener: upListener
    }
  },
  endSwipeBack: (e) => (state, actions) => {
    let { setAxisAndDirection } = actions
    let { ACTIONABLE_THRESHOLD, upListener, currentPointer, handleX, direction } = state
    upListener.stop()
    currentPointer && currentPointer.stop()
    // stop()

    if (!handleX) return

    // element.classList.remove('active')

    if (Math.abs(handleX.get()) >= ACTIONABLE_THRESHOLD) {
      switch (direction) {
        case 'top':
          playPause()
          break
        case 'left':
          window.Amplitude.next()
          break
        case 'right':
          window.Amplitude.prev()
          break
        default:
          console.info('Clicked ScrubBar')
      }
    }

    setAxisAndDirection({
      axis: 'none',
      direction: 'none'
    })
    spring({
      from: handleX.get(),
      velocity: handleX.getVelocity()
    })
      .start(handleX)
  },
  setAxisAndDirection: (obj) => {
    return {
      axis: obj.axis,
      direction: obj.direction
    }
  }
},
(state, actions) => () => (context) => {
  let {playingState, playbackTime, playingContext} = context
  let { makeInteractive } = actions
  let {duration, name, artist, cover_art_url: image} = playingContext
  return <Wrapper class='trackbar'>
    <Bubble playingState={playingState} oncreate={makeInteractive} onclick={() => window.flamous.location.go('/stream-view')}>
      <Progress max={duration || '300'} value={playbackTime}>{playbackTime}/{duration}</Progress>
      <div style={{display: 'flex', height: '100%', flexGrow: '1'}}>
        <SongCover draggable='false' src={image} />
        <Info>
          <Song>
            {name}
          </Song>
          <Artist>
            {artist}
          </Artist>
        </Info>
      </div>
      <div>
        <PlayButton onclick={(e) => { e.preventDefault(); e.stopImmediatePropagation(); window.flamous.playPause() }}>
          { !playingState
            ? <img style={{height: '100%'}} src={playImage} />
            : <img style={{height: '100%'}} src={pauseImage} />
          }
        </PlayButton>
      </div>
    </Bubble>
  </Wrapper>
}, 'track-bar')

// const ScrubBar = (props) => (context) => {
//   let {playingState, playbackTime, playingContext} = context
//   let {duration, name, artist, cover_art_url: image} = playingContext
//   return <Wrapper class='trackbar' key={props.key}>
//     <Bubble playingState={playingState} oncreate={makeInteractive} onclick={() => window.flamous.location.go('/stream-view')}>
//       <Progress max={duration || '300'} value={playbackTime}>{playbackTime}/{duration}</Progress>
//       <div style={{display: 'flex', height: '100%', flexGrow: '1'}}>
//         <SongCover draggable='false' src={image} />
//         <Info>
//           <Song>
//             {name}
//           </Song>
//           <Artist>
//             {artist}
//           </Artist>
//         </Info>
//       </div>
//       <div>
//         <PlayButton onclick={(e) => { e.preventDefault(); e.stopImmediatePropagation(); window.flamous.playPause() }}>
//           { !playingState
//             ? <img style={{height: '100%'}} src={playImage} />
//             : <img style={{height: '100%'}} src={pauseImage} />
//           }
//         </PlayButton>
//       </div>
//     </Bubble>
//   </Wrapper>
// }

export default TrackBar