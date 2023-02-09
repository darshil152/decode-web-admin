import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import firebaseApp from './firebase/firebase'
import MUIDataTable from 'mui-datatables'
import { number } from 'yup';
// import { QuerySnapshot } from '@firebase/firestore-types';
// import Ember from 'ember';



export default function Attandance() {


    const [stdata, setStdata] = useState([]);
    const [date, setDate] = useState('');
    const [attandance, setAttandance] = useState("");
    let myAttend = [];

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

        console.log(data);
        console.log("first", date)
        console.log("second", attandance)
        console.log(makeid(6));

        // myAttend.push({
        //     data: date,
        //     attandance: attandance,
        //     id: makeid(8),
        // });

        // console.log(myAttend)
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
            label: "f_name",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "status",
            label: "status",
            options: {
                filter: true,
                sort: true,
            },
        },

        {
            name: "dob",
            label: "dob",
            options: {
                filter: true,
                sort: true,
            },
        },

        {
            name: "courses",
            label: "courses",
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
                            <label class="tableclass">Present</label>
                            <input type="radio" name="attandance" value="Present" />
                            <label class="tableclass" >Absent</label>
                            <input type="radio" name="attandance" value="Absent" />
                            <label class="tableclass" >Other</label>
                            <input type="radio" name="attandance" value="Other" />

                        </div>
                    );
                },
            },
        },
        {
            name: "id",
            label: "Attandance",
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
        <MUIDataTable
            title={"Students List"}
            data={stdata}
            columns={columns}
            options={options}
        />
    )
}

