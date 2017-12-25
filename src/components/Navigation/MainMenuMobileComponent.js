import React, { Component } from 'react';
import './../../App.css';
import MobileMenu from './MobileMenu';


export default class MainMenuMobileComponent extends Component {
  
  render() {
    // eslint-disable-next-line no-unused-vars
    let baseStyle = {};
  
    const style_comp_outer = {
        boxShadow: '0.0px 2.3px 18px rgba(0, 0, 0, 0.1600)',
     };
    const {menuLinks} = this.props;
    const elComp = (this.props.sideBarPushable || this.props.sidebarOpened
        ?
        <div className='hasNestedComps elComp' style={style_comp_outer}>
          <div>
            <MobileMenu
                visible={this.props.sidebarOpened}
                menuLinks={menuLinks}
                isAuthenticated={this.props.isAuthenticated}
                isAdmin={this.props.isAdmin}
                onClick={this.props.closeSidebar}
            />
          </div>
        </div>
        : null
     );
    
    return (
      <div className="MainMenuMobileComponent" style={baseStyle}>
        <div className="layoutFlow">
          { elComp }
        </div>
      </div>
    )
  }

}
