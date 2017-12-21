import React, { Component } from 'react';
import './../../App.css';
import btn_icon_141863 from './btn_icon_141863.png';
import MobileMenu from './MobileMenu';


export default class MainMenuMobileComponent extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      elComp_visible: false,
    };
  }

  onClick_elIconButton = (ev) => {
    this.setState({elComp_visible: !this.state.elComp_visible});
  };
  
  
  render() {
    // eslint-disable-next-line no-unused-vars
    let baseStyle = {};
    // eslint-disable-next-line no-unused-vars
    let layoutFlowStyle = {};
  
    const style_comp_outer = {
        boxShadow: '0.0px 2.3px 18px rgba(0, 0, 0, 0.1600)',
     };
    const {menuLinks} = this.props;
    const elComp = this.state.elComp_visible ? (
        <div className='hasNestedComps elComp' style={style_comp_outer}>
          <div>
            <MobileMenu
                menuLinks={menuLinks}
                isAuthenticated={this.props.isAuthenticated}
                isAdmin={this.props.isAdmin}
            />
          </div>
        </div>
        
     ) : null;

    const style_iconButton = {
        display: 'block',
        backgroundImage: 'url('+btn_icon_141863+')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '89.562%',
        backgroundPosition: '0% 50%',
        cursor: 'pointer',
     };
    
    return (
      <div className="MainMenuMobileComponent" style={baseStyle}>
        <div className="layoutFlow">
          { elComp }
        </div>
        <div className="foreground">
          <div className='actionFont elIconButton' style={style_iconButton}  onClick={this.onClick_elIconButton}  />
        </div>
      </div>
    )
  }

}
