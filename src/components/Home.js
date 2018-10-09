import { h } from 'hyperapp'
import picostyle from 'picostyle'
import artists from '../artists.js'
import Page from './Page.js'
import Gallery from './Gallery'
import { Link } from '@hyperapp/router'
import LazyImage from './LazyImage.js'
import rightArrow from '../assets/blue_right.svg'
import flamousLogo from '../assets/flamous_logo.svg'
import playImage from '../assets/play.svg'

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
  padding: '1em',
  '> img': {
    borderRadius: '100%',
    width: '7em',
    height: '6.9em',
    border: '1px solid rgba(0, 0, 0, 0.14)',
    boxShadow: 'rgba(0, 0, 0, 0.14) 0px 2px 18px -5px'
  },
  ' .artist-line': {
    color: 'black',
    fontWeight: 'bold'
    // fontSize: '1.2em',
    // padding: '0.1em 0.4em',
    // backgroundColor: 'rgba(251, 251, 251, 0.9)',
    // borderRadius: '10px',
    // transform: 'translateY(-1.2em)',
    // display: 'inline-block',
    // border: '1px solid rgba(0, 0, 0, 0.14)',
    // color: '#212121'
  },
  ' .secondary': {
    color: '#212121'
    // color: '#212121',
    // transform: 'translateY(-1.2em)',
    // display: 'inline-block',
    // fontSize: '0.94em'
  },
  '&:active': {
    backgroundColor: '#f0f0f0'
  }
})
const Artist = ArtistStyle

const StyledLogo = style('div')({
  display: 'flex',
  alignItems: 'center',
  maxWidth: '1000px',
  margin: '1.2em auto 1em',
  padding: '0 1em'
})

const Logo = (props) => {
  return <StyledLogo>
    <img height='36' style={{marginRight: '0.7em'}} src={flamousLogo} />
    <span style={{fontSize: '1.2em', fontWeight: 'bold'}} >Flamous Music</span>
  </StyledLogo>
}

const StyledTagLine = style('div')({
  maxWidth: '1000px',
  margin: '5em auto 3em',
  padding: '0 1em',
  display: 'flex',
  flexWrap: 'wrap'
})
const StyledPlay = style('span')({
  padding: '0.5em 1em 0.5em 0.5em',
  borderRadius: '100px',
  border: '2px solid #007AFF',
  display: 'inline-flex',
  alignItems: 'center'
})

const TagLine = () => {
  return <StyledTagLine>
    <div>
      <h1 style={{fontSize: '3em', fontWeight: 'normal', maxWidth: '350px', lineHeight: '1.3'}}>
        The best of Public Domain music.
      </h1>
      <p style={{maxWidth: '350px', fontSize: '1.2em', lineHeight: '1.3', margin: '-1.5em 0 2em'}}>Listen to truly copyright free songs. Share, mix, download and cover.</p>
    </div>
    <div style={{alignSelf: 'flex-end', marginBottom: '2.5em'}}>
      <StyledPlay onclick={window.flamous.playPause}>
        <img height='36' src={playImage} /> Play some
      </StyledPlay>
    </div>

  </StyledTagLine>
}

const Header = style('header')({
  margin: '1em 0 3em'
})

const Home = (props) => (context) => {
  let {updateAvailable} = context
  return (
    <Page nonInteractive key={props.key}>
      {updateAvailable ? <Button to='/about' text='Update Available' /> : ''}
      <Header>
        <Logo />
        <TagLine />
      </Header>
      <Gallery heading='Artists'>
        {
          artists.map((artist, index) => {
            return <Artist to={`/artist/${artist.name.toLowerCase().replace(' ', '_')}`}>
              <LazyImage src={artist.cover_art_url} />
              <div>
                <span class='artist-line'>{artist.name}</span>
                <br />
                <span class='secondary'>Artist, {artist.songCount} songs</span>
              </div>
            </Artist>
          })
        }

      </Gallery>
      <div style={{margin: '3em auto', maxWidth: '1000px', padding: '1em'}}>
        <h2>
          Submit your songs
        </h2>
        <p style={{maxWidth: '32em'}}>
          Public Domain enables creative opportunities for people who create amazing content and bring your music to a larger audience. Make your music heard.
        </p>
        <Link to='/song-submit' style={{display: 'flex'}}>
          <span style={{display: 'inline-block'}}>Submit Songs</span><img src={rightArrow} style={{height: '1.2em', marginLeft: '0.2em'}} />
        </Link>
      </div>

      <div style={{margin: '3em auto', maxWidth: '1000px', padding: '3em 1em 1em 1em', borderTop: '2px solid rgba(0, 0, 0, 0.14)'}}>
        <h2>
          Get E-Mail updates
        </h2>
        <div id='mc_embed_signup'>
          <form action='https://flamous.us19.list-manage.com/subscribe/post?u=2c3e676f85f7cce3cad163b48&amp;id=83387ae973' method='post' id='mc-embedded-subscribe-form' name='mc-embedded-subscribe-form' class='validate' target='_blank' novalidate>
            <div style={{textAlign: 'left'}} id='mc_embed_signup_scroll'>
              <p>Get notified when new music arrives!</p>
              <label style={{display: 'none'}} for='mce-EMAIL'>E-Mail address</label>
              <div style={{display: 'flex'}}>
                <input style={{width: '100%', maxWidth: '350px', minWidth: '0px', height: '1em', boxSizing: 'content-box', padding: '0.7em 1em', border: '1px solid rgba(0, 0, 0, 0.2)', backgroundColor: 'rgba(0, 0, 0, 0.02)', borderRadius: '10px'}} type='email' value='' name='EMAIL' class='email' id='mce-EMAIL' placeholder='Email Address' required />
                <input style={{backgroundColor: 'transparent', border: 'none', color: '#007AFF', padding: '0.7em 1em', marginRight: '-1em', fontWeight: 'bold'}} type='submit' value='Subscribe' name='subscribe' id='mc-embedded-subscribe' class='button' />
              </div>
              <div style='position: absolute; left: -5000px;' aria-hidden='true'>
                <input type='text' name='b_2c3e676f85f7cce3cad163b48_83387ae973' tabindex='-1' value='' /></div>
            </div>
          </form>
        </div>
      </div>

      <div style={{margin: '3em auto -6.5em', maxWidth: '1000px', padding: '3em 1em 1em 1em'}}>
        <p>
          <Link to='/about' style={{display: 'flex'}}>
            <span style={{display: 'inline-block'}}>About Flamous</span><img src={rightArrow} style={{height: '1.2em', marginLeft: '0.2em'}} />
          </Link>
        </p>
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
