import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import firebaseApp from './firebase/firebase'
import MUIDataTable from 'mui-datatables'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from './adminlayout/adminlayout';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';


let attend = [];

export default function Attandance() {


    const muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    })



    const [stdata, setStdata] = useState([]);
    const [date, setDate] = useState(new Date().toJSON().slice(0, 10));
    const [attandance, setAttandance] = useState("");
    const [currentDates, setCurrentdates] = useState()

    useEffect(() => {
        getdata();

    }, [])

    const gettodate = (date) => {

        console.log(date)
        setDate(date);

    }

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
            name: "password",
            label: "password",
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
                            <input type="date" className='tabledat' value={date} onChange={e => gettodate(e.target.value)} />
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
                            <div className='attandancecheckl'>
                                <span className='muiradio'>  Present:</span><input type="radio" name="attandance" value="1" /><br></br>
                            </div>
                            <div className='attandancecheckl'>
                                <span className='muiradio'> Absent:</span><input type="radio" name="attandance" value="0" /><br></br>
                            </div>
                            <div className='attandancecheckl'>
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
            </div>
            <ToastContainer />
        </AdminLayout>



    )
}



