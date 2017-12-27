import React, {Component} from 'react'

import { Form, Button, Responsive, Segment, Icon, Portal } from 'semantic-ui-react'
import axios from "axios/index"

import UsersList from './../../UsersList';

/**
 * Component that get user invoices.
 */
class SettingsSenders extends Component {
    constructor() {
        super();
        this.state = {
            senders: [],
            openPortal: false,
        };
    }

    openPortalHandler() {
        this.setState({openPortal: true})
    }

    closePortalHandler() {
        this.setState({openPortal: false})
    }

    windowDidScroll = () => {
        const t = window.pageYOffset || document.documentElement.scrollTop;
        if (t === 0) {
            this.openPortalHandler();
        }
        else {
            this.closePortalHandler();
        }
    };

    componentDidMount() {
        this.windowDidScroll();
        window.addEventListener('scroll', this.windowDidScroll);
        this.getSenders();
    }

    getSenders() {
          axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/settings/senders`)
                .then((res) => {
                    this.setState({ senders: res.data.data.senders });
                })
                .catch((err) => { console.log(err); })
    }

    render() {
        const senderFiledsLabel = ['Status', 'Email', 'User name', 'Created Date',  'IP pool ID'];
        const senderFileds = ['status', 'login',  'label', 'created_at',  'ip_pool_id'];
        const rowsPerPage = 10;
        // // [{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }, ...{}]
        const selectOptions = [
            {text: 'All', active: true, key: 0, value: 'all'},
            {text: 'Active', key: 1, value: 'active'},
            {text: 'Inactive', key: 2, value: 'inactive'}
        ];

        return (
            <div>
                 <h1 style={{color: '#b2d248'}}>Senders</h1>
                <Form>
                    <Form.Group widths='equal' inline>
                        <Form.Select label='Sender' options={selectOptions} defaultValue={'all'} />
                        <Responsive as={Segment} minWidth={768}>
                            <Button>Add sender</Button>
                        </Responsive>
                        <Portal
                            open={this.state.openPortal}
                            closeOnDocumentClick={false}
                            closeOnEscape={false}>
                            <Responsive as={Segment} maxWidth={769} style={{ right: '50px', position: 'fixed', bottom: '50px', zIndex: 1000 }}>
                              <Icon.Group size='big'>
                                <Icon circular name='object group' inverted className={'actionColor'} />
                                <Icon corner name='add' />
                              </Icon.Group>
                            </Responsive>
                        </Portal>
                    </Form.Group>
                </Form>
                <UsersList
                        users={this.state.senders}
                        tableHeader={senderFiledsLabel}
                        tableFields={senderFileds}
                        rowsPerPage={rowsPerPage} />
            </div>
        );
    };
}

export default SettingsSenders;