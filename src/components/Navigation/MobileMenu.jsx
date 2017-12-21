import React, { Component }  from 'react';
import { Menu, Accordion, Icon, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


export default class MobileMenu extends Component {
    constructor (props) {
        super(props);
        this.state = {activeIndex: 0};
    }

    subMenuRender(subMenuObj) {
        return (
            <Menu.Item>
                <div>
                <Menu.Menu>
                    <Menu.Header>{subMenuObj.text}</Menu.Header>
                    {
                        Object.keys(subMenuObj.children).map((child) => {
                            return (
                                <Menu.Item as={Link} to={subMenuObj.children[child].to} key={child}>
                                    {subMenuObj.children[child].text}
                                </Menu.Item>
                            )
                        })
                    }
                </Menu.Menu>
                </div>
            </Menu.Item>
        )
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({ activeIndex: newIndex });
    };

    accordeonMenuRender(subMenuObj, index = 0) {
        return (
            <Accordion inverted>
              <Accordion.Title active={this.state.activeIndex === index} index={index} onClick={this.handleClick}>
                <Icon name='dropdown' />
                    {subMenuObj.text}
              </Accordion.Title>
              <Accordion.Content active={this.state.activeIndex === index}>
                <Menu.Menu>
                    {/*<Menu.Header>{subMenuObj.text}</Menu.Header>*/}
                    {
                        Object.keys(subMenuObj.children).map((child) => {
                            return (
                                <Menu.Item as={Link} to={subMenuObj.children[child].to} key={child}>
                                    {subMenuObj.children[child].text}
                                </Menu.Item>
                            )
                        })
                    }
                </Menu.Menu>
            </Accordion.Content>
          </Accordion>
        )
    }

    render() {
        const {menuLinks} = this.props;

        return (
            <Menu fluid vertical inverted>
                {menuLinks.dashboard.visible &&
                  <Menu.Item as={Link} to={menuLinks.dashboard.to}>
                      {menuLinks.dashboard.text}
                  </Menu.Item>
                }

                <Divider fitted/>
                {menuLinks.statistics.visible  &&
                    this.accordeonMenuRender(menuLinks.statistics, 0)
                }

                <Divider fitted/>
                {menuLinks.settings.visible &&
                    this.accordeonMenuRender(menuLinks.settings, 1)
                }

                <Divider fitted/>
                {menuLinks.billing.visible &&
                    this.accordeonMenuRender(menuLinks.billing, 2)
                }

                <Divider fitted/>
                {menuLinks.account.visible &&
                    this.accordeonMenuRender(menuLinks.account, 3)
                }

                <Menu.Item as={Link} to='/about'>
                  About
                </Menu.Item>

                <Divider fitted/>
                {menuLinks.admin.visible &&
                    this.accordeonMenuRender(menuLinks.admin, 4)
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
            </Menu>
        )
    }
}
