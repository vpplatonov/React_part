import React, { Component }  from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


export default class DesktopMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {activeIndex: 0};
    }

    subMenuRender(subMenuObj) {
        return (
        <Dropdown text={subMenuObj.text} className='link item' key={subMenuObj.text}>
            <Dropdown.Menu>
               {
                    Object.keys(subMenuObj.children).map((child) => {
                        return (
                            <Dropdown.Item text={subMenuObj.children[child].text}  as={Link} to={subMenuObj.children[child].to} key={child}/>
                        )
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
        )
    }

    mainMenuItemRender(subMenuObj) {
        if ('children' in subMenuObj ) {
            return (this.subMenuRender(subMenuObj));
        }
        else {
            return (
                <Menu.Item as={Link} to={subMenuObj.to} key={subMenuObj.text}>
                    {subMenuObj.text}
                </Menu.Item>
            )
        }
    }

    render() {
        const {menuLinks} = this.props;

        return (
            <Menu borderless className={"noBorderBoxShadow"}>
                <Menu.Menu position='right'>
                    {
                        Object.keys(menuLinks).map((mItem) => {
                            return (
                                menuLinks[mItem].visible && this.mainMenuItemRender(menuLinks[mItem])
                            )
                        })
                    }

                </Menu.Menu>
            </Menu>
        )
    }
}
