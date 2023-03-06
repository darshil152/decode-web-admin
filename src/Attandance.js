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


    const submitform = (data, tabledata2) => {
        let alreadyAdded = false
        let check = false;
        console.log(data);
        console.log(tabledata2);

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
            toast.error(tabledata2.rowData[1] + '  Attendance is already added', {
                position: toast.POSITION.TOP_RIGHT
            });

        } else {


            if (attandance == 1) {
                check = true;
            }
            if (check) {
                toast.success(tabledata2.rowData[1] + ' You select present', {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                toast.warn(tabledata2.rowData[1] + ' You select absent', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            attend.push(obj)
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
            name: "f_name",
            label: "Student name",
            options: {
                filter: true,
                sort: true,
            },
        },
        // {
        //     name: "password",
        //     label: "Student name",
        //     options: {
        //         filter: true,
        //         sort: true,
        //     },
        // },
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
            </div>
            <ToastContainer />
        </AdminLayout>



    )
}



