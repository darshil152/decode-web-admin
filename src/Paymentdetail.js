import React, { Component } from 'react'
import firebaseApp from './firebase/firebase';
import MUIDataTable from "mui-datatables";
import Loginheader from './Loginheader';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

export default class paymentdetail extends Component {




    constructor(props) {
        super(props);
        this.state = {
            id: "",
            total: '',
            retrivedata: [],
            columns: [
                {
                    name: "date",
                    label: "date",
                    options: {
                        filter: true,
                        sort: true,
                    }
                },
                {
                    name: "amount",
                    label: "amounts",
                    options: {
                        filter: true,
                        sort: true,
                    },
                },
                {
                    name: "payment",
                    label: "payment method",
                    options: {
                        filter: true,
                        sort: true,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            return (
                                <>
                                    {value == 0 ? <div className='paymenttype'><h6 className='paymenttype'>Cash</h6></div> : value == 1 ? <div className='paymenttype'><h6 className='paymenttype'>Google Pay</h6></div> : <div className='paymenttype'><h6 className='paymenttype'>Bank Transfer</h6></div>}
                                </>
                            );

                        },
                    },

                },
            ],

            options: {
                selectableRowsHideCheckboxes: true,
                responsive: "standard",
                filterType: 'dropdown',
            }
        }
    }



    componentDidMount() {
        const url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);
        this.setState({ id }, () => {
            this.getdata();
        })

    }

    getdata = () => {
        const db = firebaseApp.firestore();
        db.collection('Students').where("er_num", "==", Number(this.state.id)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data().fees)
                this.setState({ retrivedata: doc.data().fees })
            })
        }).catch(err => {
            console.error(err)
        });
    }

    render() {
        return (
            <>
                <Loginheader />
                <div className='paymentlist'>

                    <MUIDataTable
                        title={"Payment List"}
                        data={this.state.retrivedata}
                        columns={this.state.columns}
                        options={this.state.options}
                    />
                </div>
            </>
        )
    }
}
