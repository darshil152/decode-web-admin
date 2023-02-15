import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import firebaseApp from './firebase/firebase'
import MUIDataTable from 'mui-datatables'

// import { QuerySnapshot } from '@firebase/firestore-types';
// import Ember from 'ember';



export default function Dashboard() {

    const [stdata, setStdata] = useState([]);

    useEffect(() => {
        getdata()
    }, [])


    const getdata = () => {
        let entry = []
        const db = firebaseApp.firestore();

        db.collection('Students').get().then((querySnapshot) => {
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
            name: "phone",
            label: "phone",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "f_phone",
            label: "f_phone",
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
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            {value == 1 ? <div className='rendercon'><h6 className='valtoname'>Master In Webdesign</h6></div> : value == 2 ? <div className='rendercon'><h6 className='valtoname'>Master In Frontend Development</h6></div> : value == 3 ? <div className='rendercon'><h6 className='valtoname'>Master In backend Development</h6></div> : value == 4 ? <div className='rendercon'><h6 className='valtoname'>firebase</h6></div> : value == 5 ? <div className='rendercon'><h6 className='valtoname'>Master in 360 & 3D Website</h6></div> : value == 6 ? <div className='rendercon'><h6 className='valtoname'>Master In Fullstack Development</h6></div> : <div className='rendercon'></div>}
                        </>
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
