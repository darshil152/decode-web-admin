import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import firebaseApp from './firebase/firebase'
import MUIDataTable from 'mui-datatables'
// import { QuerySnapshot } from '@firebase/firestore-types';
// import Ember from 'ember';



export default function Attandance() {

    // const [stdata, setStdata] = useState([]);

    // useEffect(() => {
    //     getdata()
    // }, [])


    // const getdata = () => {
    //     let entry = []
    //     const db = firebaseApp.firestore();

    //     db.collection('Students').get().then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             entry.push(doc.data())
    //         })
    //         console.log(entry, 'product array')
    //         setStdata(entry)
    //     }).catch(err => {
    //         console.error(err)
    //     });
    // }


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
            title: 'DOB',
            field: 'birthDate',
            type: 'date',
            dateSetting: {
                format: 'dd/MM/yyyy'
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



    ];


    const options = {
        selectableRowsHideCheckboxes: true,
        responsive: "standard",
        filterType: 'dropdown',
    };


    return (
        <MUIDataTable
            title={"Students List"}
            // data={stdata}
            columns={columns}
            options={options}
        />
    )
}
