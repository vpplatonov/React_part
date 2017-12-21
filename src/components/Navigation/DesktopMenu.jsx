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
        <Dropdown text={subMenuObj.text} className='link item'>
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

    render() {
        const {menuLinks} = this.props;

        return (
            <Menu borderless className={"noBorderBoxShadow"}>
                <Menu.Menu position='right'>
                    {menuLinks.dashboard.visible &&
                      <Menu.Item as={Link} to={menuLinks.dashboard.to}>
                          {menuLinks.dashboard.text}
                      </Menu.Item>
                    }

                    {menuLinks.statistics.visible  &&
                        this.subMenuRender(menuLinks.statistics)
                    }

                    {menuLinks.settings.visible &&
                        this.subMenuRender(menuLinks.settings)
                    }

                    {menuLinks.billing.visible &&
                        this.subMenuRender(menuLinks.billing)
                    }
                    {menuLinks.account.visible  &&
                        this.subMenuRender(menuLinks.account)
                    }

                    {menuLinks.admin.visible &&
                        this.subMenuRender(menuLinks.admin)
                    }

                    {menuLinks.login.visible &&
                        <Menu.Item as={Link} to={menuLinks.login.to}>
                             {menuLinks.login.text}
                        </Menu.Item>
                    }
                    {menuLinks.logout.visible &&
                        <Menu.Item as={Link} to={menuLinks.logout.to}>
                            {menuLinks.logout.text}
                        </Menu.Item>
                    }
                </Menu.Menu>
            </Menu>
        )
    }
}
