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

// const Button = (props) => style('span')({
//   fontWeight: 'bold',
//   color: '#007AFF',
//   position: 'absolute',
//   right: '1.5em',
//   top: '1em'
// })(
//   {

//   },
//   <Link to={props.to}>
//     {[props.text, <img src={rightArrow} style={{height: '0.8em', marginLeft: '0.4em', marginTop: '0em'}} />]}
//   </Link>
// )

const ArtistStyle = style(Link)({
  textAlign: 'center',
  width: 'calc(50% - 2em)',
  border: '1px solid rgba(0, 0, 0, 0.14)',
  borderRadius: '16px',
  padding: '1px',
  margin: '0.7em 1em',
  boxShadow: '0px 5px 36px -5px rgba(0, 0, 0, 0.14)',
  '@media (min-width: 800px)': {
    '&': {
      maxWidth: '200px'
    }
  },
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
  // padding: '0.675em 1em',
  justifyContent: 'space-between'
})

const Logo = (props) => {
  return <div style={{borderBottom: '1px solid rgba(0, 0, 0, 0.1)', backgroundColor: '#fafafa'}}>
    <StyledLogo>
      <div style={{display: 'flex', alignItems: 'center', padding: '0.8em'}}>
        <img height='36' style={{marginRight: '0.7em'}} src={flamousLogo} />
        <span style={{fontSize: '1.2em', fontWeight: 'normal'}} >Flamous Music</span>

      </div>
      <Link to='/about' style={{display: 'inline-flex', fontWeight: 'bold', padding: '0.9em'}}>
        <span style={{display: 'inline-block'}}>About</span>
      </Link>
    </StyledLogo>
  </div>
}

const StyledTagLine = style('div')({
  maxWidth: '768px',
  margin: '2em auto 3em',
  padding: '0 1em',
  display: 'flex',
  flexWrap: 'wrap'
})
const StyledPlay = style('span')({
  padding: '0.2em 1.2em 0.2em 0.6em',
  borderRadius: '13px',
  border: '1px solid rgb(0, 105, 221)',
  display: 'inline-flex',
  alignItems: 'center',
  fontSize: '1.2em',
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: '#007aff'
})

const Button = style('span')({
  padding: '0.385em 0.7em',
  borderRadius: '10px',
  border: '1px solid rgb(0, 105, 221)',
  display: 'inline-flex',
  alignItems: 'center',
  fontSize: '1.1em',
  color: 'white',
  backgroundColor: '#007aff'
})

const WhiteButton = style('span')({
  padding: '0.385em 0.7em',
  borderRadius: '10px',
  border: '1px solid rgba(0, 0, 0, 0.5)',
  display: 'inline-flex',
  alignItems: 'center',
  fontSize: '1.1em',
  color: '#212121',
  backgroundColor: 'white'
})

const TagLine = () => (context) => {
  let {playingState} = context
  return <StyledTagLine>
    <div>
      <h1 style={{fontSize: '2.8em', fontWeight: 'bold', maxWidth: '350px', lineHeight: '1.3'}}>
        Listen to<br />copyright free<br />music.
      </h1>
      <p style={{maxWidth: '350px', fontSize: '1.2em', lineHeight: '1.35', margin: '-1.5em 0 1em'}}>Music without limitations. Share, mix, download and cover.</p>
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
      <Gallery id='artists' heading='Browse Artists'>
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
        <p style={{textAlign: 'center', width: '100%'}}>
          Click on an artist above and listen to some tunes.
        </p>

      </Gallery>

      <Divider />

      <div style={{margin: '3em auto', maxWidth: '32em', padding: '1em'}}>
        <h2>
          Our music is<br />use-for-everything
        </h2>
        <p style={{maxWidth: '32em', lineHeight: '1.3'}}>
          Music on flamous.io is in the Public Domain through Creative Commons Zero.
        </p>
        <p>
          Use it commercially, for a video or just for yourself. There are no fees and no credit to the artists required. Listen to what you like, download and use it.
        </p>
        <a href='/#artists'>
          <Button>
            <span>Browse Music</span>
          </Button>
        </a>
        <Link to='/how-to' style={{marginLeft: '0.4em'}}>
          <WhiteButton>
            <span>I'm confused</span>
          </WhiteButton>
        </Link>
      </div>

      <Divider />

      <div style={{margin: '3em auto', maxWidth: '32em', padding: '1em'}}>
        <h2>
          Lots more to come
        </h2>
        <p style={{maxWidth: '32em', lineHeight: '1.3'}}>
          We want to get people started on making music and will share more tracks and useful ressources to start music production very soon.
        </p>

        <div id='mc_embed_signup'>
          <form action='https://flamous.us19.list-manage.com/subscribe/post?u=2c3e676f85f7cce3cad163b48&amp;id=83387ae973' method='post' id='mc-embedded-subscribe-form' name='mc-embedded-subscribe-form' class='validate' target='_blank' novalidate>
            <div id='mc_embed_signup_scroll'>
            <p style={{maxWidth: '32em', lineHeight: '1.3'}}><b>Our Newsletter</b><br />Get notified when new musicians join Flamous. At most once per week and only the best free-to-use music.</p>


              <div class='mc-field-group'>
                <label style={{display: 'none'}} for='mce-NAME'>Name </label>
                <input type='text' placeholder='Name' value='' name='NAME' class='required' id='mce-NAME' style={{width: '100%', maxWidth: '350px', minWidth: '0px', height: '1em', boxSizing: 'content-box', padding: '0.7em 1em', border: '1px solid rgba(0, 0, 0, 0.2)', backgroundColor: 'rgba(0, 0, 0, 0.014)', borderRadius: '10px', margin: '0.45em 0', WebkitUserSelect: 'initial', userSelect: 'initial'}} />
              </div>
              <div class='mc-field-group'>
                <label style={{display: 'none'}} for='mce-EMAIL'>Email Address </label>
                <input type='email' placeholder='Email Address' value='' name='EMAIL' class='required email' id='mce-EMAIL' style={{width: '100%', maxWidth: '350px', minWidth: '0px', height: '1em', boxSizing: 'content-box', padding: '0.7em 1em', border: '1px solid rgba(0, 0, 0, 0.2)', backgroundColor: 'rgba(0, 0, 0, 0.02)', borderRadius: '10px', margin: '0.45em 0', WebkitUserSelect: 'initial', userSelect: 'initial'}} />
              </div>
              <div id='mce-responses' class='clear'>
                <div class='response' id='mce-error-response' style='display:none' />
                <div class='response' id='mce-success-response' style='display:none' />
              </div>
              <div style='position: absolute; left: -5000px;' aria-hidden='true'><input type='text' name='b_2c3e676f85f7cce3cad163b48_83387ae973' tabindex='-1' value='' /></div>
              <div class='clear'><input type='submit' style={{backgroundColor: '#007AFF', border: 'none', borderRadius: '10px', color: 'white', padding: '0.6em 1em'}} value='Subscribe' name='subscribe' id='mc-embedded-subscribe' class='button' /></div>
            </div>
          </form>
        </div>
        <script onload={() => { import('../mailchimp-validation') }} type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js' />
      </div>

      <Divider />

      <div style={{margin: '3em auto', maxWidth: '32em', padding: '1em'}}>
        <h2>
          Submit your songs
        </h2>
        <p style={{maxWidth: '32em', lineHeight: '1.3'}}>
          Public Domain enables creative opportunities for people who create amazing content and brings your music to a larger audience.
        </p>
        <Link to='/song-submit' style={{display: 'flex'}}>
          <Button>
            <span>Submit Songs</span>
          </Button>
        </Link>
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
            Student
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
            Web Developer
          </div>
          <a style={{padding: '1em'}} target='_blank' rel='noopener' href={'https://twitter.com/christiankaindl'}>
            <img style={{width: '2em'}} src={twitterImage} />
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
  return <div style={{height: '3em', backgroundColor: '#fafafa', borderTop: '1px solid rgba(0, 0, 0, 0.1)', borderBottom: '1px solid rgba(0, 0, 0, 0.08)', margin: '3.5em 0px'}} />
}
