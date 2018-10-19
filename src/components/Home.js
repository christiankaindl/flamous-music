import { h } from 'hyperapp'
import picostyle from 'picostyle'
import artists from '../artists.js'
import Page from './Page.js'
import Gallery from './Gallery'
import { Link } from '@hyperapp/router'
import LazyImage from './LazyImage.js'
import rightArrow from '../assets/blue_right.svg'
import flamousLogo from '../assets/flamous_logo.svg'
import playImage from '../assets/play_white.svg'
import pauseImage from '../assets/pause_white.svg'
import christianImage from '../assets/Christian.jpg'
import timonImage from '../assets/Timon.jpg'
import twitterImage from '../assets/twitter.svg'
import githubImage from '../assets/github.svg'

const style = picostyle(h)

const Button = (props) => style('span')({
  fontWeight: 'bold',
  color: '#007AFF',
  position: 'absolute',
  right: '1.5em',
  top: '1em'
})(
  {

  },
  <Link to={props.to}>
    {[props.text, <img src={rightArrow} style={{height: '0.8em', marginLeft: '0.4em', marginTop: '0em'}} />]}
  </Link>
)

const ArtistStyle = style(Link)({
  textAlign: 'center',
  width: '43%',
  border: '1px solid rgba(0, 0, 0, 0.14)',
  borderRadius: '16px',
  padding: '1px',
  margin: '0.7em 1em',
  boxShadow: '0px 5px 36px -5px rgba(0, 0, 0, 0.14)',
  '> img': {
    borderRadius: '16px 16px 3px 3px',
    width: '100%',
    // height: '6.9em',
    // border: '1px solid rgba(0, 0, 0, 0.14)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.14)'
    // boxShadow: 'rgba(0, 0, 0, 0.14) 0px 2px 18px -5px'
  },
  ' .artist-line': {
    color: 'black',
    fontWeight: 'bold'
  },
  ' .secondary': {
    color: '#212121'
  },
  '&:active': {
    backgroundColor: '#f0f0f0'
  }
})
const Artist = ArtistStyle

const StyledLogo = style('div')({
  display: 'flex',
  alignItems: 'center',
  maxWidth: '768px',
  margin: '0 auto',
  padding: '1em',
  justifyContent: 'space-between'
})

const Logo = (props) => {
  return <div style={{borderBottom: '1px solid rgba(0, 0, 0, 0.1)', backgroundColor: '#fafafa'}}>
    <StyledLogo>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <img height='36' style={{marginRight: '0.7em'}} src={flamousLogo} />
        <span style={{fontSize: '1.2em', fontWeight: 'normal'}} >Flamous Music</span>

      </div>
      <Link to='/about' style={{display: 'inline-flex'}}>
        <span style={{display: 'inline-block'}}>About</span><img src={rightArrow} style={{height: '1.2em', marginLeft: '0.2em'}} />
      </Link>
    </StyledLogo>
  </div>
}

const StyledTagLine = style('div')({
  maxWidth: '768px',
  margin: '3em auto 3em',
  padding: '0 1em',
  display: 'flex',
  flexWrap: 'wrap'
})
const StyledPlay = style('span')({
  padding: '0.45em 1.38em 0.45em 0.8em',
  borderRadius: '15px',
  display: 'inline-flex',
  alignItems: 'center',
  fontSize: '1.2em',
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: '#007aff'
})

const TagLine = () => (context) => {
  let {playingState} = context
  return <StyledTagLine>
    <div>
      <h1 style={{fontSize: '3em', fontWeight: 'bold', maxWidth: '350px', lineHeight: '1.3'}}>
        The best of<br />Public Domain<br /> music.
      </h1>
      <p style={{maxWidth: '350px', fontSize: '1.2em', lineHeight: '1.35', margin: '-1.5em 0 2em'}}>Listen to truly copyright free songs. Share, mix, download and cover.</p>
    </div>
    <div style={{alignSelf: 'flex-end', marginBottom: '-0.5em', display: 'flex', alignItems: 'center', width: '100%'}}>
      <StyledPlay onclick={window.flamous.playPause}>
        <img height='36' src={!playingState ? playImage : pauseImage} />
        {!playingState ? 'Listen' : 'Pause'}
      </StyledPlay>
    </div>

  </StyledTagLine>
}

const Header = style('header')({
  // margin: '1em 0 3em'
})

const Home = (props) => (context) => {
  let {installPrompt} = context
  return (
    <Page nonInteractive key={props.key}>
      {/* {updateAvailable ? <Button to='/about' text='Update Available' /> : ''} */}
      <Header>
        <Logo />
        <TagLine />
      </Header>
      <Gallery heading='Browse Artists'>
        {
          artists.map((artist, index) => {
            return <Artist to={`/artist/${artist.name.toLowerCase().replace(' ', '_')}`}>
              <LazyImage src={artist.cover_art_url} />
              <div style={{padding: '0.8em 1em 1em'}}>
                <span class='artist-line'>{artist.name}</span>
                <br />
                <span class='secondary'>{artist.songCount} Songs</span>
              </div>
            </Artist>
          })
        }

      </Gallery>

      <Divider />

      <div style={{margin: '3em auto', maxWidth: '768px', padding: '1em'}}>
        <h2>
          Submit your songs
        </h2>
        <p style={{maxWidth: '32em', lineHeight: '1.3'}}>
          Public Domain enables creative opportunities for people who create amazing content and brings your music to a larger audience. Make your music heard.
        </p>
        <Link to='/song-submit' style={{display: 'flex'}}>
          <span style={{display: 'inline-block'}}>Submit Songs</span><img src={rightArrow} style={{height: '1.2em', marginLeft: '0.2em'}} />
        </Link>
      </div>
      <Divider />
      <div style={{margin: '3em auto', maxWidth: '768px', padding: '3em 1em 1em 1em'}}>
        <h2>
          Get E-Mail updates
        </h2>
        <div id='mc_embed_signup'>
          <form action='https://flamous.us19.list-manage.com/subscribe/post?u=2c3e676f85f7cce3cad163b48&amp;id=83387ae973' method='post' id='mc-embedded-subscribe-form' name='mc-embedded-subscribe-form' class='validate' target='_blank' novalidate>
            <div style={{textAlign: 'left'}} id='mc_embed_signup_scroll'>
              <p>Get notified when new music arrives!</p>
              <label style={{display: 'none'}} for='mce-EMAIL'>E-Mail address</label>
              <div style={{display: 'flex'}}>
                <input style={{width: '100%', maxWidth: '350px', minWidth: '0px', height: '1em', boxSizing: 'content-box', padding: '0.7em 1em', border: '1px solid rgba(0, 0, 0, 0.2)', backgroundColor: 'rgba(0, 0, 0, 0.02)', borderRadius: '10px', WebkitUserSelect: 'initial', userSelect: 'initial'}} type='email' value='' name='EMAIL' class='email' id='mce-EMAIL' placeholder='Email Address' required />
                <input style={{backgroundColor: 'transparent', border: 'none', color: '#007AFF', padding: '0.7em 1em', marginRight: '-1em', fontWeight: 'bold'}} type='submit' value='Subscribe' name='subscribe' id='mc-embedded-subscribe' class='button' />
              </div>
              <div style='position: absolute; left: -5000px;' aria-hidden='true'>
                <input type='text' name='b_2c3e676f85f7cce3cad163b48_83387ae973' tabindex='-1' value='' /></div>
            </div>
          </form>
        </div>
      </div>
      <Divider />
      <div style={{margin: '3em auto -6em', maxWidth: '768px', padding: '1em'}}>
        <h2>
          Developers
        </h2>
        <p style={{display: 'flex', alignItems: 'center'}}>
          <img onclick={(event) => {
            let bounds = event.target.getBoundingClientRect()
            window.flamous.imageViewer.showImageViewer({image: timonImage, bounds: bounds})
          }} style={{width: '4em', borderRadius: '100%', marginRight: '1em', pointerEvents: 'auto'}} src={timonImage} />
          <div>
            <b>Timon Röhrbacher</b><br />
            Salesman
          </div>
          <a style={{padding: '1em'}} target='_blank' rel='noopener' href={'https://twitter.com/TimonRooe'}>
            <img style={{width: '2em'}} src={twitterImage} />
          </a>
        </p>
        <p style={{display: 'flex', alignItems: 'center'}}>
          <img onclick={(event) => {
            let bounds = event.target.getBoundingClientRect()
            window.flamous.imageViewer.showImageViewer({image: christianImage, bounds: bounds})
          }} style={{width: '4em', borderRadius: '100%', marginRight: '1em', pointerEvents: 'auto'}} src={christianImage} />
          <div>
            <b>Christian Kaindl</b><br />
            Lead Developer
          </div>
          <a style={{padding: '1em'}} target='_blank' rel='noopener' href={'https://twitter.com/christiankaindl'}>
            <img style={{width: '2em'}} src={twitterImage} />
          </a>
          <a style={{padding: '1em'}} target='_blank' rel='noopener' href={'https://github.com/christiankaindl'}>
            <img style={{width: '1.5em'}} src={githubImage} />
          </a>
        </p>
      </div>

      <div style={{margin: '3em auto -3em', maxWidth: '768px', padding: '3em 1em 1em 1em'}}>
        <p style={{textAlign: 'center', lineHeight: '1.34'}}>
          <a href='mailto:hello@flamous.io'>hello@flamous.io</a><br />
          <a href='https://twitter.com/FlamousMusic' rel='noopener' target='_blank'>twitter.com/FlamousMusic</a>
        </p>

        {window.installPrompt && <p onclick={() => window.installPrompt.prompt()}>
          Add to homescreen
        </p>}
      </div>
      {/* <Gallery
        heading='Featured Artists'>
        {artists.map((item, index) => {
          return <Link to={item.name ? '/artist/wowa' : '/'} style={{display: 'contents'}} onclick={(e) => { if (window.clickLock) { e.preventDefault() } }}>
            <GalleryItem title={artists[index].name} sub='Artist' image={artists[index].cover_art_url} />
          </Link>
        })}
      </Gallery> */}
      {/* <p style={{maxWidth: '500px', margin: '0 auto', padding: '0 2em', textAlign: 'center'}}>
        <p>
        We see Public Domain content as the future of creative art. Music is no exception.<br /><br />
        Share, mix, download or cover music you discover on Flamous.
        </p>
        <Link to='/about' style={{display: 'flex', justifyContent: 'center'}}>
          <span style={{display: 'inline-block'}}>About Flamous</span><img src={rightArrow} style={{height: '1.2em', marginLeft: '0.2em'}} />
        </Link>
      </p> */}
    </Page>
  )
}

export default Home

const Divider = () => {
  return <div style={{height: '3em', backgroundColor: '#fafafa', borderTop: '1px solid rgba(0, 0, 0, 0.05)', borderBottom: '1px solid rgba(0, 0, 0, 0.05)', margin: '3.5em 0px'}} />
}
