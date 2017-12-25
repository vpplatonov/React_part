import React, {Component} from 'react'
import './../../../../node_modules/react-input-calendar/style/index.css'

import { Menu, Button } from 'semantic-ui-react'
import axios from "axios/index"
import Calendar from 'react-input-calendar'

import UsersList from './../../UsersList';

/**
 * Component that get user invoices.
 */
class BillingInvoices extends Component {
    constructor() {
        super();
        this.state = {
            invoices: [],
            startDate: new Date(),
            endDate: new Date(),
        };
    }

    componentDidMount() {
        this.getInvoicesMock();
    }

    setStartDate(computableFormat) {
        this.setState({startDate: new Date(computableFormat)});
    }

    setEndDate(computableFormat) {
        this.setState({endDate: new Date(computableFormat)});
    }

    getInvoicesMock() {
        this.setState({invoices: [
              {
                id: "2c92c0f86078c59901607d2d808a6b21",
                adjustment_amount: 0,
                amount: 151.13,
                balance: 0,
                comments: null,
                created_date: 1513928622,
                "due_date": 1513929600,
                "invoice_date": `${(new Date(1513929600)).toString()}`,
                "invoice_number": "INV00230649",
                "last_email_sent_date": 0,
                "payment_amount": "151.13",
                "posted_date": 1513928622,
                "refund_amount": "0.0",
                "status": "Posted",
                "target_date": 1513929600,
                "updated_date": 1513928622,
                "service_start_date": 1513843200,
                "service_end_date": 1516003200,
                "account_id": 2153055,
                 billing_period: `${(new Date(1513843200)).toString()} - ${(new Date(1516003200)).toString()}`
              },
              {
                "id": "2c92c0f95c14fb2c015c15653b080c7a",
                "adjustment_amount": 0,
                "amount": 14.52,
                "balance": 0,
                "comments": null,
                "created_date": 1495007574,
                "due_date": 1495004400,
                "invoice_date": `${(new Date(1495004400)).toString()}`,
                "invoice_number": "INV00230594",
                "last_email_sent_date": 0,
                "payment_amount": "14.52",
                "posted_date": 1495007574,
                "refund_amount": "0.0",
                "status": "Posted",
                "target_date": 1495004400,
                "updated_date": 1495007574,
                "service_start_date": 1495004400,
                "service_end_date": 1497510000,
                "account_id": 2153055,
                   billing_period: `${(new Date(1495004400)).toString()} - ${(new Date(1497510000)).toString()}`
              }
            ]
          });
    }

    getInvoices() {
      axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/billing/invoices`)
        .then((res) => { this.setState({ invoices: res.data.data.invoices }); })
        .catch((err) => { console.log(err); })
    }

    render() {

        const senderFiledsLabel = ['INVOICE Date', 'Billing period', 'Amount', 'Download'];
        const senderFileds = ['invoice_date', 'billing_period', 'amount', 'id'];

        return (
            <div>
                <h1 style={{color: '#b2d248'}}>Invoices</h1>
                <Menu stackable borderless className={"noBorderBoxShadow"}>
                    <div style={{display: '-webkit-inline-box'}}>
                    <Calendar
                        // format='DD/MM/YYYY'
                        date={this.state.startDate.toString()}
                        // computableFormat='DD/MM/YYYY'
                        onChange={this.setStartDate.bind(this)}
                        inputName={'startDate'} />
                    <Calendar
                        // format='DD/MM/YYYY'
                       date={this.state.endDate.toString()}
                       // computableFormat='DD/MM/YYYY'
                       onChange={this.setEndDate.bind(this)}
                       inputName={'endDate'} />
                    </div>
                    <Button size='small'>Apply</Button>
                </Menu>
                <UsersList
                    users={this.state.invoices}
                    tableHeader={senderFiledsLabel}
                    tableFields={senderFileds}
                    rowsPerPage={10} />
            </div>
        );
    };
}

export default BillingInvoices;
