import React, { Component, useState, useSyncExternalStore, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { resolvePath } from 'react-router';


export default function Chart() {


    const title = [];
    const price = [];

    const [option, setObject] = useState({
        chart: {
            id: 'apexchart-example'
        },
        xaxis: {
            category: []
        }
    })
    const [series, setSeries] = useState([{
        name: 'series-1',
        data: [30, 40, 50, 44, 20, 91, 125, 87, 99]
    }])


    var config = {
        method: 'get',
        url: 'https://dummyjson.com/products',
        headers: {}
    };


    useEffect(() => {
        const id = [];
        const price = [];
        axios(config)
            .then(function (response) {
                console.log(response.data.products);
                response.data.products.map(items => {
                    console.log(items);
                    id.push(items.id);
                    price.push(items.price);
                })


                setObject({
                    chart: {
                        id: 'apexchart-example'
                    },
                    xaxis: {
                        category: id
                    }
                })
                setSeries([{
                    name: 'series-1',
                    data: price
                }])
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])


    return (
        <div id="chart">
            <ReactApexChart options={option} series={series} type="line" height={550} width={1300} />
        </div>

    )
}