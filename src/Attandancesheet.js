import React, { Component } from 'react'
import firebaseApp from './firebase/firebase';
import MUIDataTable from "mui-datatables";
import checked from "./img/checked.png"
import cancel from "./img/cancel.png"
import Loginheader from './Loginheader';
import grey from "./img/grey.png";
import ReactApexChart from 'react-apexcharts';
import StudentLayout from './studentlayout/studentlayout';
import { data } from 'jquery';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';





export default class Attandancesheet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sc: localStorage.getItem('sc'),
            id: "",
            finalpercent: '',
            currentpass: "",
            countData: [],
            currentdata: [],
            oneandzero: [],
            presentdata: [],
            series: [0, 0],
            optionsa: {
                chart: {
                    width: 300,
                    type: 'pie',
                },
                fill: {
                    colors: ["#28a745", "#d1403f",]
                },
                labels: ['Present', 'Absent',],
                colors: ["#28a745", "#d1403f",], //Add this line
                responsive: [{
                    breakpoint: 498,
                    options: {
                        chart: {
                            width: 400,
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
                    name: "date",
                    label: "Day",
                    options: {
                        filter: true,
                        sort: true,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            return (
                                <>
                                    {
                                        <div className='datetoday'>{new Date(value).toLocaleDateString('en-us', { weekday: "long" })}</div>

                                    }
                                </>
                            );

                        },
                    },
                    sortOrder: {
                        name: 'name',
                        direction: 'desc'
                    }

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
                filterType: "dropdown",
                responsive: "scroll",
                direction: 'desc'
            },

        };
    }

    componentDidMount() {
        const url = window.location.href;
        var ids = url.substring(url.lastIndexOf('/') + 1);
        this.setState({ id: ids }, () => {
            this.getdata();
        })
    }

    theme = createTheme({
        shadows: "none"
    });

    muiCache = createCache({
        key: 'mui-datatables',
        prepend: true
    })




    getdata = () => {
        let oneandzero = []
        const db = firebaseApp.firestore();
        db.collection('Students').where("er_num", "==", Number(this.state.id)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log('data :: ', doc.data().myAttend)
                let entry = doc.data().myAttend

                entry.sort().reverse();
                // entry.sort((a, b) => a.date - b.date)`
                console.log('after :: ', entry)

                this.setState({ currentdata: entry, currentpass: doc.data().password }, () => {
                    console.log('data :: ', this.state.currentdata)



                    if (Number(localStorage.getItem('userrole')) !== 2) {
                        if (this.state.sc !== this.state.currentpass) {
                            window.location.href = '/'
                        }
                    }

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
                            <div className='row mt-3'>
                                <div className='col-lg-6 tabledata '>
                                    <div className='shdowa'>
                                        <div className='apex'>
                                            <h3 className='percentage' > Your attandance is:</h3>
                                            <ReactApexChart options={this.state.optionsa} series={this.state.series} type="pie" width={500} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='shdow tabledata'>
                                        <CacheProvider value={this.muiCache}>
                                            <ThemeProvider theme={createTheme()}>
                                                <MUIDataTable
                                                    title={"Your attandance List"}
                                                    data={this.state.currentdata}
                                                    columns={this.state.columns}
                                                    options={this.state.options}
                                                />
                                            </ThemeProvider>
                                        </CacheProvider>
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
