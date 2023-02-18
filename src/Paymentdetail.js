import React, { Component } from 'react'
import firebaseApp from './firebase/firebase';
import MUIDataTable from "mui-datatables";
import Loginheader from './Loginheader';
import { Modal, Button } from "react-bootstrap";
import profilepicture from "./img/profilepicture.jpg"
import calendar from "./img/calendar.png"

import converter from 'number-to-words'
let referedStudent = []
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
            allStudentData: [],
            currentdata: '',
            totalAmount: 0,
            retrivedata: [],
            referedStudent: [],
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

    componentDidMount() {
        const url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);
        this.setState({ id }, () => {

            this.getalldata();
            this.getDate();

        })
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





    getDate = () => {
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.setState({ date });
    };




    getalldata = () => {
        let entry = []
        const db = firebaseApp.firestore();

        db.collection('Students').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                entry.push(doc.data())
            })
            this.setState({ allStudentData: entry }, () => {
                this.getdata();
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


                this.setState({ retrivedata: doc.data().fees, myRefData: doc.data().myref, currentdata: doc.data() }, () => {
                    for (let i = 0; i < this.state.retrivedata.length; i++) {
                        total = Number(total) + Number(this.state.retrivedata[i].amount)
                    }
                    this.setState({ totalAmount: total }, () => {
                        if (Number(localStorage.getItem('userrole')) !== 2) {
                            if (this.state.sc !== doc.data().password) {
                                window.location.href = '/'
                            }
                        }
                    })
                    console.log(doc.data().myref.length)
                    for (let j = 0; j < doc.data().myref.length; j++) {
                        this.getRefersName(doc.data().myref[j])

                    }



                })
            })
        }).catch(err => {
            console.error(err)
        });
    }

    makeid = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    getRefersName = (id) => {
        console.log('come')
        for (let i = 0; i < this.state.allStudentData.length; i++) {

            if (this.state.allStudentData[i].id == id) {

                let obj = {
                    f_name: this.state.allStudentData[i].f_name,
                    l_name: this.state.allStudentData[i].l_name,
                    er_num: this.state.allStudentData[i].er_num,
                    ref_amount: this.state.allStudentData[i].reference.refAmount,
                    id: this.makeid(8)
                }
                referedStudent.push(obj)
                this.setState({ referedStudent })
            }

        }
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

                                        <table>
                                            <th>Enrollment Number</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Amount</th>

                                            {this.state.referedStudent.length > 0 && this.state.referedStudent.map((item, i) => {
                                                return (
                                                    <tr key={i}>

                                                        <td className="labelData ml-3">{item.er_num}</td>

                                                        <td className="labelData ml-3  ">{item.f_name}</td>
                                                        <td className="labelData ml-3  ">{item.l_name}</td>

                                                        <td className="labelData ml-3  ">{item.ref_amount}</td>

                                                    </tr>
                                                )
                                            })}
                                        </table>



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
                                        <label className="lbls">Roll No: </label>
                                        <div className='srernum'>{this.state.currentdata.er_num}</div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12 d-flex'>
                                        <label className="lbls mt-3">Installment No: </label>
                                        <div className='srernum mt-3'>1</div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>

                        <Modal.Body>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-lg-12 d-flex'>
                                        <label className="lbls mt-3">Student Name: </label>
                                        <div className='srernum mt-3'>{this.state.currentdata.f_name}  {this.state.currentdata.l_name}</div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12 d-flex'>
                                        <label className="lbls mt-3 ">Course: </label>
                                        <div className='srernum mt-3'>{this.state.currentdata.courses} </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12 d-flex'>
                                        <label className="lbls mt-3 ">Pay Now: </label>
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
