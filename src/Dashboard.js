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
            name: "l_name",
            label: "l_name",
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
            name: "courses",
            label: "courses",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "f_f_name",
            label: "f_f_name",
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
            name: "line_1",
            label: "line_1",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "line_2",
            label: "line_2",
            options: {
                filter: true,
                sort: true,
            },
        }, {
            name: "city",
            label: "city",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "state",
            label: "state",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "country",
            label: "country",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "zipcode",
            label: "zipcode",
            options: {
                filter: true,
                sort: true,
            },
        },
        // {
        //     name: "createdAt",
        //     label: "Date & Time",
        //     options: {
        //         filter: true,
        //         sort: true,
        //         customBodyRender: (value, tableMeta, updateValue) => {
        //             return (
        //                 <div>
        //                     {moment(value).format("DD MM YYYY hh:mm:ss")}
        //                 </div>
        //             );
        //         },
        //     },
        // },

    ];


    const options = {
        selectableRowsHideCheckboxes: true,
        responsive: "standard",
        filterType: 'dropdown',
    };


    return (
        <MUIDataTable
            title={"Student List"}
            data={stdata}
            columns={columns}
            options={options}
        />
    )
}
