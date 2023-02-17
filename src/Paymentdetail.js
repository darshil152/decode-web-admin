import React, { Component } from 'react'
import firebaseApp from './firebase/firebase';
import MUIDataTable from "mui-datatables";
import Loginheader from './Loginheader';
import { Modal, Button } from "react-bootstrap";
import profilepicture from "./img/profilepicture.jpg"
import calendar from "./img/calendar.png"

import converter from 'number-to-words'

export default class paymentdetail extends Component {




    constructor(props) {
        super(props);


        this.state = {
            date: "",
            isOpen: false,
            feesId: "",
            id: "",
            numbertoalpha: '',
            currentFeesData: [],
            currentdata: '',
            totalAmount: 0,
            retrivedata: [],
            sc: localStorage.getItem('sc'),
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
                {
                    name: "id",
                    label: "View",
                    options: {
                        filter: true,
                        sort: true,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            return (
                                <>
                                    <div className='viewmodel'>
                                        <button className='btn btn-primary' onClick={() => this.openModal(value)}>View</button>
                                    </div>
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

    openModal = (value) => this.setState({ isOpen: true, feesId: value }, () => {
        for (let i = 0; i < this.state.retrivedata.length; i++) {
            if (this.state.retrivedata[i].id === value) {
                this.setState({ currentFeesData: this.state.retrivedata[i] }, () => {
                    this.numbertoword();
                })
            }

        }
    });
    closeModal = () => this.setState({ isOpen: false });

    numbertoword = () => {

        let final = converter.toWords(Number(this.state.currentFeesData.amount));
        this.setState({ numbertoalpha: final })


    }


    componentDidMount() {
        const url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);
        this.setState({ id }, () => {
            this.getdata();
            this.getalldata();
            this.getDate();

        })
    }


    getDate = () => {
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.setState({ date });
    };


    getalldata = () => {
        const db = firebaseApp.firestore();
        db.collection('Students').where("er_num", "==", Number(this.state.id)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                this.setState({ currentdata: doc.data() })
            })
        }).catch(err => {
            console.error(err)
        });
    }




    getdata = () => {
        let total = 0
        const db = firebaseApp.firestore();
        db.collection('Students').where("er_num", "==", Number(this.state.id)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data().password)

                this.setState({ courseprice: doc.data() })

                this.setState({ retrivedata: doc.data().fees }, () => {
                    for (let i = 0; i < this.state.retrivedata.length; i++) {
                        total = Number(total) + Number(this.state.retrivedata[i].amount)
                    }
                    this.setState({ totalAmount: total }, () => {
                        if (this.state.sc !== this.state.courseprice.password) {
                            window.location.href = '/'
                        }
                    })

                })
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

                    <h4 className='ml-3 mt-5 totalamount' >Total amout paid is: {this.state.totalAmount} </h4>

                    {this.state.currentdata !== '' && <>
                        <div className='container mt-5 residentalDetail '>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <div className='mt-4'>
                                            <h1>reference Details</h1>
                                        </div>
                                        <div className='mt-lg-4 mt-sm-4 ml-lg-4 text-left'>
                                            <i class="fa fa-link usernames" aria-hidden="true"></i>
                                            <lable className="lablesdata ml-3">{this.state.currentdata.reference.refId}</lable>
                                        </div>
                                        <div className='mt-lg-4 mt-sm-4 ml-lg-4 mb-4 text-left'>
                                            <i class="fa fa-inr usernames" aria-hidden="true"></i>
                                            <lable className="lablesdata ml-3  ">{this.state.currentdata.reference.refAmount}</lable>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </>}
                    <Modal size='xl' show={this.state.isOpen} onHide={this.closeModal} className="modal-container custom-map-modal">
                        <Modal.Header >
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-lg-12 text-center'>
                                        <h1 className='feesreceipt'>FEES RECEIPT</h1>
                                    </div>
                                </div>
                            </div>
                        </Modal.Header>
                        <Modal.Header>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-lg-12 text-right'>
                                        <h5 className='currentdate'>Date:{this.state.date}</h5>
                                    </div>
                                </div>
                            </div>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-lg-12 d-flex'>
                                        <lable className="lbls">Roll No: </lable>
                                        <div className='srernum'>{this.state.currentdata.er_num}</div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12 d-flex'>
                                        <lable className="lbls mt-3">Installment No: </lable>
                                        <div className='srernum mt-3'>1</div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>

                        <Modal.Body>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-lg-12 d-flex'>
                                        <lable className="lbls mt-3">Student Name: </lable>
                                        <div className='srernum mt-3'>{this.state.currentdata.f_name}  {this.state.currentdata.l_name}</div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12 d-flex'>
                                        <lable className="lbls mt-3 ">Course: </lable>
                                        <div className='srernum mt-3'>{this.state.currentdata.courses} </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12 d-flex'>
                                        <lable className="lbls mt-3 ">Pay Now: </lable>
                                        <div className='srernum mt-3'>{this.state.currentdata.courses} </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>


                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closeModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </>
        )
    }
}
