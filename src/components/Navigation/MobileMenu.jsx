import React, { Component }  from 'react';
import { Sidebar, Menu, Accordion, Icon, Divider } from 'semantic-ui-react';
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
                                <Menu.Item as={Link} to={subMenuObj.children[child].to} key={child} >
                                    <Icon name={subMenuObj.children[child].icon} inverted color='olive' />{subMenuObj.children[child].text}
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
                    {subMenuObj.icon && <Icon name={subMenuObj.icon} style={{ float: 'right', paddingRight: '30px'}} />}{subMenuObj.text}
              </Accordion.Title>
              <Accordion.Content active={this.state.activeIndex === index} className={'ui'}>
                <Menu.Menu icon='labeled'>
                    {
                        Object.keys(subMenuObj.children).map((child) => {
                            return (
                                <div key={child}>
                                <Divider fitted hidden/>
                                <Menu.Item as={Link} to={subMenuObj.children[child].to} key={child} color='olive' onClick={subMenuObj.onClick}>
                                     <Icon name={subMenuObj.children[child].icon} inverted color='olive' className={'left'} />{subMenuObj.children[child].text}
                                </Menu.Item>
                                </div>
                            )
                        })
                    }
                </Menu.Menu>
            </Accordion.Content>
          </Accordion>
        )
    }

    mainMenuItemRender(subMenuObj, i = 0) {
        if ('children' in subMenuObj ) {
            return (
                <div key={subMenuObj.text}>
                <Divider fitted/>
                {this.accordeonMenuRender(subMenuObj, i)}
                </div>
            );
        }
        else {
            return (
                <div key={subMenuObj.text}>
                {i > 0 && <Divider fitted/>}
                <Menu.Item as={Link} to={subMenuObj.to} onClick={subMenuObj.onClick}>
                    {subMenuObj.icon && <Icon name={subMenuObj.icon} />}{subMenuObj.text}
                </Menu.Item>
                </div>
            )
        }
    }

    render() {
        const {menuLinks, visible, onClick} = this.props;

        return (
            //<Menu fluid vertical inverted borderless>
            <Sidebar as={Menu} animation='overlay' direction='top' visible={visible} vertical inverted borderless>
                {
                    Object.keys(menuLinks).map((mItem, i) => {
                        menuLinks[mItem].onClick = onClick;
                        return (
                            menuLinks[mItem].visible && this.mainMenuItemRender(menuLinks[mItem], i)
                        )
                    })
                }

            </Sidebar>
            //</Menu>
        )
    }
}
