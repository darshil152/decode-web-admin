

import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts';

export default class Chart extends Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [144, 55],
            options: {
                chart: {
                    width: 380,
                    type: 'pie',
                },
                labels: ['Present', 'Absent',],
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


        };
    }



    render() {
        return (



            <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={380} />



        );
    }
}
