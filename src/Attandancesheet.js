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
            finalpercent: '',
            countData: [],
            currentdata: [],
            oneandzero: [],
            presentdata: [],
            series: [44, 55, 13, 43, 22],
            options: {
                chart: {
                    width: 380,
                    type: 'pie',
                },
                labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },

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
        // this.finalpercentage();
    }


    getdata = () => {
        let oneandzero = []
        const db = firebaseApp.firestore();
        db.collection('Students').where("er_num", "==", Number(this.state.id)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.setState({ currentdata: doc.data().myAttend }, () => {
                    for (let i = 0; i < this.state.currentdata.length; i++) {
                        if (this.state.currentdata[i].attandance == '1' || this.state.currentdata[i].attandance == '0') {
                            oneandzero.push(this.state.currentdata[i])
                        }
                    }
                    this.setState({ countData: oneandzero }, () => {
                        this.finalpercentage()
                    })
                })
            });
        }).catch(err => {
            console.error(err)
        });
    }


    finalpercentage = () => {

        let total = this.state.countData.length;   //8
        let presentStudents = []
        let dataseries = []

        for (let j = 0; j < total; j++) {
            if (this.state.countData[j].attandance == "1") {
                presentStudents.push(this.state.countData[j])
            }
        }


        let presentNumber = presentStudents.length;
        let absentNumber = total - presentNumber;
        dataseries.push(presentNumber)
        dataseries.push(absentNumber)
        let currentpercentage = ((100 * presentNumber) / total);
        // console.log(currentpercentage)
        this.setState({ finalpercent: currentpercentage, series: dataseries })
    }



    render() {
        return (
            <>
                <Loginheader />
                <h5 className='percentage' style={{ textAlign: "center" }}> Your attandance is:  {this.state.finalpercent} %</h5>




                <MUIDataTable
                    title={"Your attandance List"}
                    data={this.state.currentdata}
                    columns={this.state.columns}
                    options={this.state.options}
                />
            </>

        )
    }
}
