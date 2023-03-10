import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import firebaseApp from './firebase/firebase'
import MUIDataTable from 'mui-datatables'
import { number } from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from './adminlayout/adminlayout';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';



let myfees = [];

export default function Fees() {

    const muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    })


    const [stdata, setStdata] = useState([]);
    const [amount, setAmount] = useState()
    const [payment, setpayment] = useState(0)
    const [date, setDate] = useState(new Date().toJSON().slice(0, 10));


    useEffect(() => {
        getdata()
    }, [])

    const gettodate = (date) => {
        console.log(date)
        setDate(date);
    }

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



    const submitform = (data, data2) => {
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
            toast.success(data2.rowData[1] + ' Payment done', {
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
            name: "l_name",
            label: "Last Name",
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
                            <input type="date" className='tabledat' value={date} onChange={e => gettodate(e.target.value)} />
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
                            <button className='btn btn-primary ' onClick={() => submitform(value, tableMeta)}>Submit</button>
                        </div>
                    );
                },
            },
        },

    ];




    const options = {
        // selectableRows: "multiple",
        selectableRowsHideCheckboxes: true,
        // selectableRowsOnClick: true,
    };

    return (
        <AdminLayout>

            <div className="content-main-section">
                <CacheProvider value={muiCache}>
                    <ThemeProvider theme={createTheme()}>
                        <MUIDataTable
                            title={"Student List"}
                            data={stdata}
                            columns={columns}
                            options={options}

                        />

                    </ThemeProvider>
                </CacheProvider>
                <ToastContainer />
            </div>
        </AdminLayout>

    )
}



