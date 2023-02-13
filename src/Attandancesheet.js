import React, { Component } from 'react'
import firebaseApp from './firebase/firebase';
import MUIDataTable from 'mui-datatables'
import checked from "./img/checked.png"
import cancel from "./img/cancel.png"
import Loginheader from './Loginheader';
import grey from "./img/grey.png";
import ReactApexChart from 'react-apexcharts';
import ima from "./img/circleimage.png"



export default class Attandancesheet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // series: [144, 55],
            // options: {
            //     chart: {
            //         width: 380,
            //         type: 'pie',
            //     },
            //     labels: ['Present', 'Absent',],
            //     responsive: [{
            //         breakpoint: 480,
            //         options: {
            //             chart: {
            //                 width: 200
            //             },
            //             legend: {
            //                 position: 'bottom'
            //             }
            //         }
            //     }]
            // },
            id: "",
            finalpercent: '',
            countData: [],
            currentdata: [],
            oneandzero: [],
            presentdata: [],

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



                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-lg-7'>
                            <MUIDataTable
                                title={"Your attandance List"}
                                data={this.state.currentdata}
                                columns={this.state.columns}
                                options={this.state.options}
                            />
                        </div>
                        <div className='col-lg-5'>
                            <h5 className=' percentage' style={{ textAlign: "center", }}> Your attandance is:</h5>

                            <div class="chaarts col-lg-12 ">
                                <div className='circleBase circle2'>

                                    <h5 className='mt-5 abc'>{this.state.finalpercent} %</h5>
                                </div>
                            </div>
                            {/* <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={380} /> */}


                        </div>
                    </div>
                </div>

            </>

        )
    }
}
