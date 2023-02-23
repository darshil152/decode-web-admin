import React from 'react'
import Studentlayout from "./studentlayout/studentlayout"

export default function Timetable() {
    const data = [
        { Date: "14/01/2023  ", Day: "Saturday", Description: "Makarsankranti" },
        { Date: "26/01/2023  ", Day: "Thursday", Description: "Republic Day" },
        { Date: "08/03/2023  ", Day: 'Wednesday', Description: "Dhuleti" },
        { Date: "30/03/2023   ", Day: "Thursday", Description: "Ram Navmi" },
        { Date: "15/08/2023   ", Day: "Tuesday", Description: "Independence Day" },
        { Date: "30/08/2023  ", Day: "Wednesday", Description: "Raksha Bandhan" },
        { Date: "07/09/2023  ", Day: "Thursday", Description: "Janmashtami" },
        { Date: "08/09/2023  ", Day: "Friday", Description: "Janmashtami" },
        { Date: "28/09/2023   ", Day: "Thursday", Description: "Ganpati Visharjan" },
        { Date: "24/10/2023  ", Day: "Tuesday", Description: "Dussehra" },
        { Date: "10/11/2023 to 24/11/2023  ", Day: "-", Description: "Diwali" },
        { Date: "25/12/2023  ", Day: "Monday", Description: "Christmas Day" },


    ]
    return (

        <>
            <Studentlayout>
                <div className='content-main-section left'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-12 ml-5 mt-5'>
                                <h1 className='tableheading'>Academic Timetable 2023</h1>
                            </div>

                            <div className='col-12'>
                                <table className='timetables'>
                                    <tr>
                                        <th>Date</th>
                                        <th>Day</th>
                                        <th>Description</th>
                                    </tr>
                                    {data.map((val, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{val.Date}</td>
                                                <td>{val.Day}</td>
                                                <td>{val.Description}</td>
                                            </tr>
                                        )
                                    })}
                                </table>


                            </div>
                        </div>
                    </div>
                </div>
            </Studentlayout>
        </>
    )
}
