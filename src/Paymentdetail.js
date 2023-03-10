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
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';



export default class paymentdetail extends Component {


    constructor(props) {
        super(props);


        this.state = {
            refealldata: [],
            lastdata: [],
            referedamount: 0,
            activereferedamount: 0,
            inactivereferedamount: 0,
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
            refsamount: 0,
            balance: [],
            showdiv: false,
            statusdata: [],
            perticuale: [],
            maths: '',
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
                // selectableRows: "multiple",
                selectableRowsHideCheckboxes: true,
                // selectableRowsOnClick: true,
            }
        }
    }

    componentDidMount() {
        const url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);
        this.setState({ id }, () => {
            this.getalldata();
            this.getDate();
            // this.getreferencepayment();
        })

    }

    muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    })


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
                // console.log(this.state.allStudentData)
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

                this.setState({ perticuale: doc.data(), refsamount: doc.data().other_ref.refAmount, otherref: doc.data().other_ref, feesdata: doc.data().course_fees }, () => {

                    for (let i = 0; i < this.state.referedStudent.length; i++) {
                        totaloldref = Number(totaloldref) + Number(this.state.referedStudent[i].amount)
                    }
                    // console.log('ref :: ', totaloldref)
                })

                this.setState({ retrivedata: doc.data().fees, myRefData: doc.data().myref, currentdata: doc.data() }, () => {
                    for (let i = 0; i < this.state.retrivedata.length; i++) {
                        total = Number(total) + Number(this.state.retrivedata[i].amount)
                    }

                    this.setState({ totalAmount: total }, () => {


                        let abce = Number(this.state.totalAmount) * 100 / Number(this.state.feesdata)
                        this.setState({ maths: abce }, () => {
                            console.log(this.state.maths)
                            this.submitperce(doc.data().myref);

                        })



                        if (Number(localStorage.getItem('userrole')) !== 2) {
                            if (this.state.sc !== doc.data().password) {
                                window.location.href = '/'
                            }
                        }
                    })

                }, () => {
                    console.log(Number(this.state.totalAmount))
                })
            })
        }).catch(err => {
            console.error(err)
        });
    }




    submitperce = (data) => {
        let push = this.state.maths;
        const db = firebaseApp.firestore();
        db.collection('Students').where("er_num", "==", Number(this.state.id)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var updateCollection = db.collection("Students").doc(doc.ref.id);

                return updateCollection.update({
                    feesPr: Number(push)
                })
                    .then(() => {
                        console.log("Document successfully updated!");
                        for (let j = 0; j < data.length; j++) {
                            this.getRefersName(data[j])

                        }
                    })
                    .catch((error) => {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
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
        let activereferedamount = 0
        let inactivereferedamount = 0
        for (let i = 0; i < this.state.allStudentData.length; i++) {
            if (this.state.allStudentData[i].id == id) {
                let obj = {
                    f_name: this.state.allStudentData[i].f_name,
                    l_name: this.state.allStudentData[i].l_name,
                    er_num: this.state.allStudentData[i].er_num,
                    ref_amount: this.state.allStudentData[i].reference.refAmount,
                    feesPr: this.state.allStudentData[i].feesPr,
                    feesStatus: this.state.allStudentData[i].feesPr > 70 ? 1 : 0,
                    id: this.makeid(8)
                }
                this.state.lastdata.push(obj)
            }

            if (this.state.allStudentData[i].id == id) {
                let obj = {
                    f_name: this.state.allStudentData[i].f_name,
                    fees: this.state.allStudentData[i].fees,

                }
                this.state.refealldata.push(obj)
            }
        }
        this.setState({ referedStudent: this.state.lastdata }, () => {
            console.log('refered :: ', this.state.referedStudent)
            for (let i = 0; i < this.state.referedStudent.length; i++) {
                if (this.state.referedStudent[i].feesStatus == 1) {

                    activereferedamount = activereferedamount + Number(this.state.referedStudent[i].ref_amount)
                } else {
                    inactivereferedamount = inactivereferedamount + Number(this.state.referedStudent[i].ref_amount)
                }
            }
            this.setState({ activereferedamount: activereferedamount, inactivereferedamount: inactivereferedamount })


        })
    }





    render() {
        return (
            <StudentLayout >
                <div className='content-main-section left'>
                    <div className='container mt-5 mb-4'>
                        <div className='row'>
                            <div className='col-sm-6 col-md-6 col-lg-3' >
                                <div class="shadow-sm bg-white rounded">

                                    <div class="containerss">
                                        <div class="contentss">

                                            <h4 class="asdff">Total fees amount</h4>
                                            <h4 class="asdff">{this.state.feesdata}</h4>
                                        </div>
                                    </div></div>


                            </div>
                            <div className='col-sm-6 col-md-6 col-lg-3'>
                                <div class="shadow-sm bg-white rounded">
                                    <div class="containerss">
                                        <div class="contentss">
                                            <h4 class="asdff">Total paid amount</h4>
                                            <h4 class="asdff">{this.state.totalAmount}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-6 col-md-6 col-lg-3'>
                                <div class="shadow-sm bg-white rounded">
                                    <div class="containerss">

                                        <div class="contentss">
                                            <h4 class="asdff">Total reference amount</h4>
                                            <div className='backgreen'>

                                                <h3 style={{ color: "black" }} className="asdff" data-toggle="tooltip" data-placement="top" title="active reference amount">{Number(this.state.refsamount) + Number(this.state.activereferedamount)}</h3>
                                                <h3 style={{ color: "grey" }} className="asdff" data-toggle="tooltip" data-placement="top" title="inactive reference amount">{Number(this.state.inactivereferedamount)}</h3>

                                            </div>
                                            <div className='backgreen'>
                                                <h6>Active</h6>
                                                <h6>Inactive</h6>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-sm-6 col-md-6 col-lg-3'>
                                <div class="shadow-sm bg-white rounded">
                                    <div class="containerss">

                                        <div class="contentss">
                                            <h4 class="asdff">Total pending amount</h4>
                                            <h1 className='totaldatas' style={{ fontSize: "25px", textAlign: "center" }}>{this.state.feesdata - this.state.totalAmount - Number(this.state.refsamount) - Number(this.state.activereferedamount)}</h1>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className='totalfees'>
                                    <h1 className='totalfee' style={{ fontSize: "22px", textAlign: "center" }}>Total pending amount</h1>
                                    <h1 className='totaldatas' style={{ fontSize: "25px", textAlign: "center" }}>{this.state.feesdata - this.state.totalAmount - Number(this.state.refsamount) - Number(this.state.activereferedamount)}</h1>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className='paymentlist'>
                        <CacheProvider value={this.muiCache}>
                            <ThemeProvider theme={createTheme()}>
                                <MUIDataTable
                                    title={"Payment List"}
                                    data={this.state.retrivedata}
                                    columns={this.state.columns}
                                    options={this.state.options}
                                />
                            </ThemeProvider>
                        </CacheProvider>

                        {this.state.referedStudent.length > 0 ? <div className='container mt-5 residentalDetail '>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <div className='mt-4'>
                                            <h1 className='ter'>Your References</h1>
                                        </div>


                                        <Table>
                                            <Thead>
                                                <Tr>
                                                    <Th className='headingstable'>Enrollment Number</Th>
                                                    <Th className='headingstable'>First Name</Th>
                                                    <Th className='headingstable'>Last Name</Th>
                                                    <Th className='headingstable'>Amount</Th>
                                                    <Th className='headingstable'>Status</Th>
                                                </Tr>
                                            </Thead>
                                            {this.state.referedStudent.map((item, i) => {
                                                return (
                                                    <Tbody>
                                                        <Tr key={i}>
                                                            <Td className='detailtable'>{item.er_num}</Td>
                                                            <Td className='detailtable'>{item.f_name}</Td>
                                                            <Td className='detailtable'>{item.l_name}</Td>
                                                            <Td className='detailtable' >{item.ref_amount}</Td>
                                                            <Td className='detailtable' >{item.feesStatus ? 'Active' : 'Inactive'}</Td>
                                                            {/* <Td className='detailtable'>{Number(item.feesPr)}</Td> */}
                                                        </Tr>

                                                    </Tbody>
                                                )
                                            })}
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div> :
                            <div className='container mt-5 residentalDetail '>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <div className='mt-4'>
                                                <h1>Your Reference</h1>
                                                <h5 className='text-left  mb-3'  >Sorry you don't have any  references????</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }


                        {this.state.otherref.refAmount != 0 ? <div className='container mt-5 residentalDetail '>
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
                        </div> :
                            null

                        }
                        {/* <div className='container mt-5 residentalDetail '>
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
                        </div> */}




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
