import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import firebaseApp from './firebase/firebase'
import MUIDataTable from 'mui-datatables'
import { number } from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { QuerySnapshot } from '@firebase/firestore-types';
// import Ember from 'ember';

let attend = [];

export default function Attandance() {


    const [stdata, setStdata] = useState([]);
    const [date, setDate] = useState('');
    const [attandance, setAttandance] = useState("");




    useEffect(() => {
        getdata()

    }, [])




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

        console.log(data);
        // console.log("first", date)
        // console.log("second", attandance)
        // console.log(makeid(6));

        let obj = {
            date: date,
            attandance: attandance,
            id: makeid(8),
        };

        for (let i = 0; i < stdata.length; i++) {
            if (stdata[i].id == data) {
                attend = stdata[i].myAttend
            }
        }

        for (let j = 0; j < attend.length; j++) {
            if (attend[j].date == date) {
                alreadyAdded = true
            }
        }
        if (alreadyAdded) {
            toast.error('Attendance is already added', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            attend.push(obj)
            toast.success('Attendance added successfully!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }



        const db = firebaseApp.firestore();
        db.collection('Students').where('id', '==', data).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                var updateCollection = db.collection("Students").doc(doc.ref.id);

                return updateCollection.update({
                    myAttend: attend
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





    const onChangeValue = (event) => {
        setAttandance(event.target.value);
        console.log(event.target.value);
    }



    const getdata = () => {
        let entry = []
        const db = firebaseApp.firestore();

        db.collection('Students').where("status", "==", 1).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                entry.push(doc.data())
            })
            console.log(entry, 'product array')
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
        // {
        //     name: "status",
        //     label: "status",
        //     options: {
        //         filter: true,
        //         sort: true,
        //     },
        // },


        // {
        //     name: "courses",
        //     label: "courses",
        //     options: {
        //         filter: true,
        //         sort: true,
        //     },
        // },
        {
            name: "createdAt",
            label: "Date & Time",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div>
                            <input type="date" className='tabledat' onChange={e => setDate(e.target.value)} />
                        </div>
                    );
                },
            },
        },
        {
            name: "createdAt",
            label: "Attandance",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div onChange={onChangeValue}>
                            <div >
                                <span className='muiradio'>  Present:</span><input type="radio" name="attandance" value="1" /><br></br>
                            </div>
                            <div>
                                <span className='muiradio'> Absent:</span><input type="radio" name="attandance" value="0" /><br></br>
                            </div>
                            <div>
                                <span className='muiradio'>Other:</span><input type="radio" name="attandance" value="2" /><br></br>
                            </div>
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
        <div>
            <MUIDataTable
                title={"Student List"}
                data={stdata}
                columns={columns}
                options={options}

            />
            <ToastContainer />
        </div>

    )
}



