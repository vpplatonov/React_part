import React, { Component } from 'react';
import './../../App.css';
import img_elPanohomepage from './images/DashboardLogin_elPanohomepage.jpg';
import img_elLogowhiteSMTP from './images/DashboardLogin_elLogowhiteSMTP.png';
import Comp3 from './Comp3';


export default class DashboardLogin extends Component {

  // This component doesn't use any properties

  constructor(props) {
    super(props);
    
    this.state = {
      textblock: (<div> World Class Email Delivery </div>),
      textblock_plainText: " World Class Email Delivery ",
    };
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    let baseStyle = {};
    // eslint-disable-next-line no-unused-vars
    let layoutFlowStyle = {};
  
    const style_panohomepage = {
        backgroundImage: 'url('+img_elPanohomepage+')',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
     };
    const style_panohomepage_outer = {
        pointerEvents: 'none',
     };
    const style_logowhiteSMTP = {
        backgroundImage: 'url('+img_elLogowhiteSMTP+')',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
     };
    const style_logowhiteSMTP_outer = {
        pointerEvents: 'none',
     };
    const style_rectangle = {
        background: 'rgba(255, 255, 255, 1.000)',
     };
    const style_rectangle_outer = {
        pointerEvents: 'none',
     };
    const style_textBlock = {
        fontSize: 17.2,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", sans-serif',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left',
     };
    const style_textBlock_outer = {
        pointerEvents: 'none',
     };
    
    let contentElement_elSwapper;  // This element's content can vary based on screen size
    contentElement_elSwapper = (<Comp3 appActions={this.props.appActions} deviceInfo={this.props.deviceInfo} />);
    
    return (
      <div className="DashboardLogin" style={baseStyle}>
        <div className="layoutFlow">
          <div className='elPanohomepage' style={style_panohomepage_outer}>
            <div style={style_panohomepage} />
          
          </div>
          
          <div className='elLogowhiteSMTP' style={style_logowhiteSMTP_outer}>
            <div style={style_logowhiteSMTP} />
          
          </div>
          
          <div className='elRectangle' style={style_rectangle_outer}>
            <div style={style_rectangle} />
          
          </div>
          
          <div className='elTextBlock' style={style_textBlock_outer}>
            <div style={style_textBlock}>
              <div>{this.state.textblock}</div>
            </div>
          
          </div>
          
          <div className='hasNestedComps elSwapper'>
            <div>
              {contentElement_elSwapper}
            </div>
          
          </div>
          
        </div>
      </div>
    )
  }

}
