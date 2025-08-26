import React from 'react'
import { Line } from "react-chartjs-2"
import{
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

import { useState, useEffect } from "react"



function LineGraph() {
    const [data, setData] = useState({ datasets: []})

    useEffect(() => {
        console.log("Inside 1st useEffect")
        try{
            const fetchData = async () => {
                const response = await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
                const theData = await response.json()
                console.log("Data inside useEffect", theData)
                const chartData = buildChartData(theData)
                setData(chartData)
            }
            fetchData()
        }catch(err){
            console.log("Could not make fetch to API")
        }
    }, [])

    useEffect(() => {
        if(data !== null){
            console.log("Hello")
            console.log(data.length)
            console.log("Here is the data", data)
        }
    }, [data])

    const buildChartData = (data, casesType='cases') => {
        const chartData = {
            datasets: [
                {
                    label: "Cases",
                    data: []
                }
            ]
        }
        let lastDataPoint
        Object.entries(data[casesType]).forEach(([date, count]) => {
            if(lastDataPoint){
                const newDataPoint = {
                    x: date,
                    y: count - lastDataPoint
                }
                chartData.datasets[0].data.push(newDataPoint)
            }
            lastDataPoint = count
        })
        return chartData

    }

    // const options = {
    //     scales: {
    //         x: {
    //             type: 'time',
    //             time: {
    //                 unit: 'day',
    //             },
    //         },
    //         y: {
    //             beginAtZero: true,
    //         },
    //     },
    // }

    

    
    return (
        <div>
            {data !== null &&
                <Line  data={data}/>
            }
        </div>
    )
}

export default LineGraph
