import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import firebaseApp from './firebase/firebase'
import MUIDataTable from 'mui-datatables'
import AdminLayout from './adminlayout/adminlayout';
import userdummy from "./img/userdummy.png"


// import { QuerySnapshot } from '@firebase/firestore-types';
// import Ember from 'ember';



export default function Dashboard() {

    const [stdata, setStdata] = useState([]);
    const [toggles, setToggles] = useState('');

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
            // console.log(entry, 'product array')
            setStdata(entry)
        }).catch(err => {
            console.error(err)
        });
    }

    const viewuser = (data) => {
        window.location.href = "./profile/" + data
    }

    const edituser = (data) => {
        window.location.href = "./add-student/" + data
        localStorage.setItem('mmatchid', data)

    }

    const changestatus = (event) => {
        setToggles(event.target.value)
    }

    const changetogglestatus = () => {
        const db = firebaseApp.firestore();
        db.collection('Students').where("er_num", "==", Number(this.state.id)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var updateCollection = db.collection("Students").doc(doc.ref.id);

                return updateCollection.update({
                    status: false
                })
                    .then(() => {
                        console.log("Document successfully updated!");
                        this.getalldata();
                        this.closeModal1();

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
            name: "profile_img",
            label: "profile_img",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            {/* <img src={value} /> */}
                            <img src={value !== '' ? value : userdummy} style={{ width: "80px", borderRadius: "15px" }} />

                        </>
                    );

                },
            },
        },

        {
            name: "f_name",
            label: "First Name",
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
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <label class="switch">
                                <input type="checkbox" class="toggle" checked={value} onChange={changestatus} />
                                <span class="slider round"></span>
                            </label>
                        </>
                    );

                },

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
            label: "Father's phone",
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
                            {value == 1 ? <div className='rendercon'><h6 className='valtoname'>Master In Webdesign</h6></div> : value == 2 ? <div className='rendercon'><h6 className='valtoname'>Master In Frontend Development</h6></div> : value == 3 ? <div className='rendercon'><h6 className='valtoname'>Master In backend Development</h6></div> : value == 4 ? <div className='rendercon'><h6 className='valtoname'>firebase</h6></div> : value == 5 ? <div className='rendercon'><h6 className='valtoname'>Master in 360 & 3D Website</h6></div> : value == 6 ? <div className='rendercon'><h6 className='valtoname'>Master In Fullstack Development</h6></div> : value == 7 ? <div className='rendercon'><h6 className='valtoname'>Master In MERN-stack Development</h6></div> : <div className='rendercon'></div>}
                        </>
                    );

                },
            },
        },
        {
            name: "er_num",
            label: "view",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <button className='btn btn-primary' onClick={() => viewuser(value)}>View</button>
                        </>
                    );

                },
            }
        },
        {
            name: "er_num",
            label: "Edit",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <button className='btn btn-primary' onClick={() => edituser(value)}>Edit</button>
                        </>
                    );

                },
            }
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
                    title={"Students List"}
                    data={stdata}
                    columns={columns}
                    options={options}
                />
            </div>
        </AdminLayout>
    )
}
