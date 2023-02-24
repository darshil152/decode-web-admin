import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import firebaseApp from './firebase/firebase'
import MUIDataTable from 'mui-datatables'
import { number } from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from './adminlayout/adminlayout';

// import { QuerySnapshot } from '@firebase/firestore-types';
// import Ember from 'ember';

let myfees = [];

export default function Fees() {


    const [stdata, setStdata] = useState([]);
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState()
    const [payment, setpayment] = useState(0)

    useEffect(() => {
        getdata()
    }, [])


    const handleChange = event => {
        console.log(event.target.value);
        setpayment(event.target.value);
    };


    const makeid = (length) => {
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



    const submitform = (data) => {
        let alreadyAdded = false
        let obj = {
            date: date,
            amount: amount,
            payment: payment,
            id: makeid(8),
        };

        for (let i = 0; i < stdata.length; i++) {
            if (stdata[i].id == data) {
                myfees = stdata[i].fees
                alreadyAdded = true
            }
        }

        if (alreadyAdded) {
            myfees.push(obj);
            toast.success('Payment done', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            toast.error('Payment is not done!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }


        const db = firebaseApp.firestore();
        db.collection('Students').where('id', '==', data).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var updateCollection = db.collection("Students").doc(doc.ref.id);

                return updateCollection.update({
                    fees: myfees
                })
                    .then(() => {
                        console.log("Document successfully updated!");
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



    const getdata = () => {
        let entry = []
        const db = firebaseApp.firestore();

        db.collection('Students').where("status", "==", 1).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                entry.push(doc.data())
            })
            entry.sort((a, b) => a.er_num - b.er_num)
            setStdata(entry)
        }).catch(err => {
            console.error(err)
        });
    }

    const columns = [
        {
            name: "er_num",
            label: "Enrollment",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "f_name",
            label: "Student name",
            options: {
                filter: true,
                sort: true,
            },
        },

        {
            name: "createdAt",
            label: "Date & Time",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div>
                            <input type="date" className='tabledat' onChange={e => setDate(e.target.value)} required />
                        </div>
                    );
                },
            },
        },
        {
            name: "createdAt",
            label: "Amount",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div className='tabledat' onChange={e => setAmount(e.target.value)} >
                            <input type="number" id="fname" name="fname" required />
                        </div>
                    );
                },
            },
        },
        {
            name: "createdAt",
            label: "Method",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div className='payment' required>
                            <select onChange={handleChange}>
                                <option value="0" selected>Cash</option>
                                <option value="1">Google Pay</option>
                                <option value="2">Banktransfer</option>
                                <option value="3">Cheque</option>
                            </select>
                        </div>
                    );
                },
            },
        },
        {
            name: "id",
            label: "Action",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div >
                            <button className='btn btn-primary ' onClick={() => submitform(value)}>Submit</button>
                        </div>
                    );
                },
            },
        },



    ];


    const options = {
        selectableRowsHideCheckboxes: true,
        responsive: "standard",
        filterType: 'dropdown',
    };


    return (
        <AdminLayout>

            <div className="content-main-section">
                <MUIDataTable
                    title={"Student List"}
                    data={stdata}
                    columns={columns}
                    options={options}

                />
                <ToastContainer />
            </div>
        </AdminLayout>

    )
}



