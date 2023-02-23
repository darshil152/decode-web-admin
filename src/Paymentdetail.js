import React, { Component } from 'react'
import firebaseApp from './firebase/firebase';
import MUIDataTable from "mui-datatables";
import Loginheader from './Loginheader';
import { Modal, Button } from "react-bootstrap";
import profilepicture from "./img/profilepicture.jpg"
import calendar from "./img/calendar.png"
import logo from "./img/logo.png"
import converter from 'number-to-words'
import StudentLayout from './studentlayout/studentlayout';
import { throwIfEmpty } from 'rxjs';


let referedStudent = []

export default class paymentdetail extends Component {




    constructor(props) {
        super(props);


        this.state = {
            installMentNo: 1,
            date: "",
            isOpen: false,
            feesId: "",
            id: "",
            numbertoalpha: '',
            currentFeesData: [],
            allStudentData: [],
            otherref: [],
            currentdata: '',
            retrivedata: [],
            referedStudent: [],
            feesdata: [],
            refsamount: [],
            balance: [],
            showdiv: false,
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

    openModal = (value) => {
        let index = this.state.retrivedata.findIndex(x => x.id === value);
        this.setState({ isOpen: true, feesId: value, installMentNo: index + 1 }, () => {
            for (let i = 0; i < this.state.retrivedata.length; i++) {
                if (this.state.retrivedata[i].id === value) {
                    this.setState({ currentFeesData: this.state.retrivedata[i] }, () => {
                        this.numbertoword();
                    })
                }

            }
        });
    }
    closeModal = () => this.setState({ isOpen: false });


    // downloadAsPdf = (selector) => {
    //     document.getElementById('print-btn').style.display = 'none'
    //     let name = this.state.detailedInvoiceData[0].customerName + '.pdf'
    //     kendo.drawing.drawDOM($(selector)).then(function (group) {
    //         console.log('pdf is :: ', group);

    //         kendo.drawing.pdf.saveAs(group, name);
    //     });
    //     document.getElementById('print-btn').style.display = 'block'
    // }


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
        let totaloldref = 0
        const db = firebaseApp.firestore();
        db.collection('Students').where("er_num", "==", Number(this.state.id)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                console.log(doc.data())
                this.setState({ refsamount: doc.data().other_ref.refAmount, otherref: doc.data().other_ref, feesdata: doc.data().course_fees }, () => {

                    for (let i = 0; i < this.state.referedStudent.length; i++) {
                        totaloldref = Number(totaloldref) + Number(this.state.referedStudent[i].amount)
                    }
                    console.log('ref :: ', totaloldref)
                    // this.setState({ totaloldrefamount: totaloldref })
                })

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
            <StudentLayout >
                <div className='content-main-section left'>
                    <div className='container mt-5'>
                        <div className='row'>
                            <div className='col-sm-3'>
                                <div className='totalfees'>
                                    <h1 className='totalfee' style={{ fontSize: "22px", textAlign: "center" }}>Total fees amount</h1>
                                    <h1 className='totaldatas' style={{ fontSize: "25px", textAlign: "center" }}>{this.state.feesdata}</h1>
                                </div>
                            </div>
                            <div className='col-sm-3'>
                                <div className='totalfees'>
                                    <h1 className='totalfee' style={{ fontSize: "22px", textAlign: "center" }}>Total paid amount</h1>
                                    <h1 className='totaldatas' style={{ fontSize: "25px", textAlign: "center" }}>{this.state.totalAmount} </h1>
                                </div>
                            </div>
                            <div className='col-sm-3'>
                                <div className='totalfees'>
                                    <h1 className='totalfee' style={{ fontSize: "22px", textAlign: "center" }}>Total reference amount</h1>
                                    <h1 className='totaldatas' style={{ fontSize: "25px", textAlign: "center" }}>{this.state.refsamount} </h1>
                                </div>
                            </div>

                            <div className='col-sm-3'>
                                <div className='totalfees'>
                                    <h1 className='totalfee' style={{ fontSize: "22px", textAlign: "center" }}>Total pending amount</h1>
                                    <h1 className='totaldatas' style={{ fontSize: "25px", textAlign: "center" }}>{this.state.feesdata - this.state.totalAmount - this.state.refsamount}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='paymentlist'>
                        <MUIDataTable
                            title={"Payment List"}
                            data={this.state.retrivedata}
                            columns={this.state.columns}
                            options={this.state.options}
                        />

                        <h4 className='ml-3 mt-5 totalamount' >Total amout paid is: {this.state.totalAmount} </h4>

                        {this.state.referedStudent.length > 0 && <>
                            {

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

                                                    {this.state.referedStudent.map((item, i) => {
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
                            }
                        </>}




                        <div className='container mt-5 residentalDetail '>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <div className='mt-4'>
                                            <h1>Other Reference</h1>
                                        </div>

                                        <div className='row'>
                                            <div className='col-lg-12 d-flex'>
                                                <label className="lbls mt-3 ">Reference Name: </label>
                                                <div className='srernum mt-3'>{this.state.otherref.refName} </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-lg-12 d-flex'>
                                                <label className="lbls mt-3 ">Reference Amount: </label>
                                                <div className='srernum mt-3'>{this.state.otherref.refAmount} </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Modal size='xl' show={this.state.isOpen} onHide={this.closeModal} className="modal-container custom-map-modal">
                            <Modal.Header >
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-lg-6 '>

                                            <h2 className='decodesoft'>DECODE SOFTTECH</h2>
                                            <h6 className='decodesoft mt-2'>304, Dhara Arcade, Mahadev chawk</h6>
                                            <h6 className='decodesoft'>Mota varachha, surat</h6>
                                        </div>
                                        <div className='col-lg-6  text-center text-lg-right' >
                                            <img src={logo} style={{ width: "200px", height: "70px", }} />

                                        </div>

                                    </div>

                                </div>
                            </Modal.Header>
                            <Modal.Header>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-lg-12 text-center'>
                                            <h3>FEES RECEIPT</h3>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-12 text-right'>
                                            <h5>Date :{this.state.currentFeesData.date}</h5>
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
                                            <div className='srernum mt-3'>{this.state.installMentNo}</div>
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
                                            <div className='srernum '>
                                                {this.state.currentdata.courses == 1 ? <div className='srernum mt-3'>Master In Webdesign</div> : this.state.currentdata.courses == 2 ? <div className='srernum mt-3'>Master In Frontend Development</div> : this.state.currentdata.courses == 3 ? <div className='srernum mt-3'>Master In backend Development</div> : this.state.currentdata.courses == 4 ? <div className='srernum mt-3'>firebase</div> : this.state.currentdata.courses == 5 ? <div className='srernum mt-3'>Master in 360 & 3D Website</div> : this.state.currentdata.courses == 6 ? <div className='srernum mt-3'>Master In Fullstack Development</div> : this.state.currentdata.courses == 7 ? <div className='srernum mt-3'>Master In MERN-stack Development</div> : <div className='srernum mt-3'></div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-12 d-flex'>
                                            <label className="lbls mt-3 ">Pay Now: </label>
                                            <div className='srernum mt-3'>{this.state.currentFeesData.amount} </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-12 d-flex'>
                                            <label className="lbls mt-3 ">In words: </label>
                                            <div className='srernum mt-3'>{this.state.numbertoalpha} Only</div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-12 d-flex'>
                                            <label className="lbls mt-3 ">Remark</label>
                                            <div className='srernum '>
                                                {this.state.currentFeesData.payment == 0 ? <div className='srernum mt-3'> Cash </div> : this.state.currentFeesData.payment == 1 ? <div className='srernum mt-3'>Google Pay</div> : this.state.currentFeesData.payment == 2 ? <div className='srernum mt-3'>Bank Transfer</div> : this.state.currentFeesData.payment == 3 ? <div className='srernum mt-3'>Cheque</div> : <div className='srernum mt-3'>Cheque</div>}

                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-lg-12 d-flex'>
                                            <label className="lbls mt-3 ">T & C: </label>
                                            <div className='srernum '>
                                                <div className='srernum mt-3'>This invoice was generated for educational services payment .</div>
                                                <div className='srernum mt-3'>Fees* Will be non-refundable.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>


                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.closeModal}>
                                    Close
                                </Button>
                                <button id='print-btn' className="btn btn-primary me-2" onClick={() => { this.downloadAsPdf('#PrintDocument') }}>Download</button>

                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </StudentLayout >
        )
    }
}
