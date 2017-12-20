import React, { Component } from 'react';
import './../App.css';
import img_elLogo from './DashboardLogin/images/SMTP_elLogo.png';


export default class LogoSMTP extends Component {

  // This component doesn't use any properties

  render() {
    // eslint-disable-next-line no-unused-vars
    let baseStyle = {};
    // eslint-disable-next-line no-unused-vars
    let layoutFlowStyle = {};
  
    const style_logo = {
        backgroundImage: 'url('+img_elLogo+')',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        pointerEvents: 'none',
     };
    
    return (
      <div className="LogoSMTP" style={baseStyle}>
        <div className="compContent">
          <div className='elLogo' style={style_logo} />
        </div>
      </div>
    )
  }

}
