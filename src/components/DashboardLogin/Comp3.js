import React, { Component } from 'react';
import './../../App.css';
import btn_icon_672902 from './images/btn_icon_672902.png';
import btn_icon_129956 from './images/btn_icon_129956.png';


export default class Comp3 extends Component {

  // This component doesn't use any properties

  constructor(props) {
    super(props);
    
    this.state = {
      textblock2: (<div>FEEDBACK</div>),
      textblock2_plainText: "FEEDBACK",
      textblock3: (<div>CONTACT<br />SUPPORT</div>),
      textblock3_plainText: "CONTACT\nSUPPORT",
    };
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    let baseStyle = {};
    // eslint-disable-next-line no-unused-vars
    let layoutFlowStyle = {};
  
    const style_iconButton3 = {
        display: 'block',
        backgroundImage: 'url('+btn_icon_672902+')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '89.562%',
        backgroundPosition: '0% 50%',
     };
    const style_iconButton3_outer = {
        pointerEvents: 'none',
     };
    const style_textBlock2 = {
        fontSize: 15.1,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", sans-serif',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left',
     };
    const style_textBlock2_outer = {
        pointerEvents: 'none',
     };
    const style_iconButton2 = {
        display: 'block',
        backgroundImage: 'url('+btn_icon_129956+')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '97.430%',
        backgroundPosition: '0% 50%',
     };
    const style_iconButton2_outer = {
        pointerEvents: 'none',
     };
    const style_textBlock3 = {
        fontSize: 15.1,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", sans-serif',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left',
     };
    const style_textBlock3_outer = {
        pointerEvents: 'none',
     };
    
    return (
      <div className="Comp3" style={baseStyle}>
        <div className="layoutFlow">
          <div className='actionFont elIconButton3' style={style_iconButton3_outer}>
            <div style={style_iconButton3}   />
          
          </div>
          
          <div className='elTextBlock2' style={style_textBlock2_outer}>
            <div style={style_textBlock2}>
              <div>{this.state.textblock2}</div>
            </div>
          
          </div>
          
          <div className='actionFont elIconButton2' style={style_iconButton2_outer}>
            <div style={style_iconButton2}   />
          
          </div>
          
          <div className='elTextBlock3' style={style_textBlock3_outer}>
            <div style={style_textBlock3}>
              <div>{this.state.textblock3}</div>
            </div>
          
          </div>
          
        </div>
      </div>
    )
  }
  

}
