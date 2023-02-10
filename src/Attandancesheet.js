import React, { Component } from 'react'
import { boolean, number } from 'yup';
import firebaseApp from './firebase/firebase';
import MUIDataTable from 'mui-datatables'
import CloseIcon from '@mui/icons-material/Close';
import checked from "./img/checked.png"
import cancel from "./img/cancel.png"
import Loginheader from './Loginheader';
import grey from "./img/grey.png";


export default class Attandancesheet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            countData: [],
            currentdata: [],
            avg: '',
            columns: [
                {
                    name: "id",
                    label: "id",
                    options: {
                        filter: true,
                        sort: true,
                    },
                },
                {
                    name: "date",
                    label: "date",
                    options: {
                        filter: true,
                        sort: true,
                    },
                },
                {
                    name: "attandance",
                    label: "attandance",
                    options: {
                        filter: true,
                        sort: true,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            return (
                                <>
                                    {value == 0 ? <div className='rendercon'><img src={cancel} className="renderimage" /></div> : value == 1 ? <div className='rendercon'><img src={checked} className="renderimage" /></div> : <div className='rendercon'><img src={grey} className="renderimage" /></div>}
                                </>
                            );

                        },
                    },

                },
            ],
            options: {
                selectableRowsHideCheckboxes: true,
                responsive: "standard",
                filterType: 'dropdown',
            }
        };
    }

    componentDidMount() {
        const url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);
        this.setState({ id }, () => {
            this.getdata();
        })

    }


    getdata = () => {

        const db = firebaseApp.firestore();

        db.collection('Students').where("er_num", "==", Number(this.state.id)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.setState({ currentdata: doc.data().myAttend }, () => {
                    for (let i = 0; i < this.state.currentdata.length; i++) {
                        if (this.state.currentdata[i].attandance == '1' || this.state.currentdata[i].attandance == '0') {

                            this.setState({ countData: [...this.state.countData, this.state.currentdata[i]] })

                        }

                    }

                })
            });
        }).catch(err => {
            console.error(err)
        });
    }



    render() {
        return (
            <>
                <Loginheader />
                <MUIDataTable
                    title={"Student's attandance List"}
                    data={this.state.currentdata}
                    columns={this.state.columns}
                    options={this.state.options}
                />
            </>

        )
    }
}
