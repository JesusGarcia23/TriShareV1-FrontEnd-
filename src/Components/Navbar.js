import React from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'


const NavBar = (props) => {
  function displayNotifications(notifications){
    // console.log("WORKING")
    // console.log(notifications)
    if(notifications.length){
      notifications.sort((a,b) => {
if(a.createdAt < b.createdAt){
  return 1;
}else if(a.createdAt > b.createdAt){
  return -1
}else{
  return 0
}
      })

if(notifications.length > 0){
return(
      <NavDropdown title="Notifications" id="basic-nav-dropdown">
      {notifications && notifications.map(eachNotification => {
        if(eachNotification.type === "Like" || eachNotification.type === "Comment" ){
          if(eachNotification.imageTo !== null){
            return (
              <React.Fragment key={eachNotification._id}>
              <NavDropdown.Item href={`/post/${eachNotification.imageTo._id}`} style={{width:'19.8vw'}}>
              <span className='notification-userImage'><img src={eachNotification.fromWho.imageUrl} alt='notiPicture'></img></span>
              <span className='notificationText'>
              <span className='notifiUser'>{eachNotification.fromWho.username}</span> {eachNotification.event}</span> 
             <span className='postPictureNoti'><img src={eachNotification.imageTo.image} style={{width:"30px", height:"30px", borderRadius:50}} alt='notiPostPicture'></img></span>
              </NavDropdown.Item>
            <NavDropdown.Divider />
            </React.Fragment>)
          }
        }else if(eachNotification.type === "Follow"){
          return (
            <React.Fragment key={eachNotification._id}>

            <Link to={`/profile/${eachNotification.fromWho._id}`} style={{ textDecoration: 'none', color: 'black' }} className='dropdown-item'>
            <span className='notification-userImage'><img src={eachNotification.fromWho.imageUrl} alt='notiPicture'></img></span>
            <span className='notificationText'>
              <span className='notifiUser'>{eachNotification.fromWho.username}</span> {eachNotification.event}</span> 
            </Link>

          <NavDropdown.Divider />
          </React.Fragment>
          )
        }

      })}
    </NavDropdown>
    )}

    }else {
      return (<NavDropdown title="Notifications" id="basic-nav-dropdown"></NavDropdown>)
    }
  }

  if (props) {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant='dark' expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {props.currentUser ? <Nav className="mr-auto">
            <Link to="/home" className='nav-link navBarBrand' style={{textDecoration: 'none', color: 'white'}}>TriShare</Link>
              <Link to="/world" className='nav-link'>World</Link>
              <Link to="/newPost" className='nav-link'>New Experience</Link>
              {displayNotifications(props.notifications)}
              <Link to={`/profile/${props.currentUser._id}`} className='nav-link'><i className="fas fa-user" style={{ marginRight: 3 }}></i>Profile</Link>
              <NavDropdown title={<i className="fas fa-cog"></i>} id="basic-nav-dropdown" className='gearUserNav'>
                <NavDropdown.Item onClick={props.onLogout} style={{ color: 'red' }}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav> :
              <Nav className="mr-auto">
              <Link to="/" className='nav-link navBarBrand' style={{textDecoration: 'none', color: 'white'}}>TriShare</Link>
                <Nav.Item as='button' onClick={e => props.revealLoginForm(e)} className='nav-link navBarBtn'>Login</Nav.Item>
                <Nav.Item as='button' onClick={e => props.revealSignupForm(e)}  className='nav-link navBarBtn'>Signup</Nav.Item>
              </Nav>
            }
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    )
  }
}

export default NavBar;

//<img src='/triShareLogo2.png' className='TriShareLogo' alt='logoApp'></img>