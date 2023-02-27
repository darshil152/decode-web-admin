import React, { Component } from 'react'
import firebaseApp from './firebase/firebase';
import MUIDataTable from "mui-datatables";
import checked from "./img/checked.png"
import cancel from "./img/cancel.png"
import Loginheader from './Loginheader';
import grey from "./img/grey.png";
import ReactApexChart from 'react-apexcharts';
import StudentLayout from './studentlayout/studentlayout';



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
            series: [0, 0],
            optionsa: {
                chart: {
                    width: 380,
                    type: 'pie',
                },
                fill: {
                    colors: ["#28a745", "#d1403f",]
                },
                labels: ['Present', 'Absent',],
                colors: ["#28a745", "#d1403f",], //Add this line
                responsive: [{
                    breakpoint: 500,
                    options: {
                        chart: {
                            width: 350,
                        },
                        legend: {
                            position: 'bottom',
                        },

                    }
                }]
            },


            columns: [

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
            },

        };
    }

    componentDidMount() {
        const url = window.location.href;
        var ids = url.substring(url.lastIndexOf('/') + 1);
        this.setState({ id: ids }, () => {
            this.getdata();
            // this.getuserrole();
        })
        // this.finalpercentage();
    }



    // getuserrole = () => {
    //     const db = firebaseApp.firestore();
    //     db.collection('Students').where("er_num", "==", Number(this.state.id)).get().then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //             console.log(doc.data())
    //             this.setState({ currentdata: doc.data(), email: doc.data().email, dob: doc.data().dob, profile: doc.data().profile_img ? doc.data().profile_img : '', line_1: doc.data().line_1, line_2: doc.data().line_2, city: doc.data().city }, () => {
    //                 if (Number(localStorage.getItem('userrole')) !== 2) {
    //                     if (this.state.sc !== this.state.currentdata.password) {
    //                         window.location.href = '/'
    //                     }
    //                 }
    //             })
    //         });
    //     }).catch(err => {
    //         console.error(err)
    //     });
    // }


    getdata = () => {
        let oneandzero = []
        const db = firebaseApp.firestore();
        db.collection('Students').where("er_num", "==", Number(this.state.id)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log('data :: ', doc.data())
                this.setState({ currentdata: doc.data().myAttend }, () => {
                    console.log('data :: ', this.state.currentdata)
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
                <StudentLayout>
                    <div className='content-main-section left'>
                        <div className='container-fluid'>
                            <div className='row '>
                                <div className='col-lg-6'>
                                    <div className='shdow tabledata'>
                                        <MUIDataTable
                                            title={"Your attandance List"}
                                            data={this.state.currentdata}
                                            columns={this.state.columns}
                                            options={this.state.options}
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-6 tabledata '>
                                    <div className='shdowa'>
                                        <div className='apex'>
                                            <h3 className='percentage' > Your attandance is:</h3>
                                            <ReactApexChart options={this.state.optionsa} series={this.state.series} type="pie" width={600} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </StudentLayout>
            </>

        )
    }
}
