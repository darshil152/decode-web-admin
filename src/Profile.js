import React from 'react'
import profilepicture from "./img/profilepicture.jpg"
import reference from "./img/reference.jpg"

export default function Profile() {
    return (
        <>
            <div className='container mt-5 studentdetail' >
                <div className='row'>
                    <div className='col-lg-12 text-center mt-4'>
                        <img src={profilepicture} className="profilepicture" />
                    </div>

                </div>
                <div className='row ml-4'>
                    <div className='col-lg-6'>
                        <div className='mt-lg-5 mt-4'>
                            <i class="fa fa-user" aria-hidden="true"></i> <span className='ml-3 spans'>20000201</span>
                        </div>
                        <div className='mt-lg-5  mt-4 mb-sm-4'>
                            <i class="fa fa-mobile" aria-hidden="true"></i><span className='ml-3 spans'>+91 6663336669</span>
                        </div>
                        <div className='mt-lg-5 mb-lg-5 mt-4'>
                            <i class='fas fa-graduation-cap'></i>
                            <span className='ml-3 spans'>FrontEnd Development</span>
                        </div>
                    </div>

                    <div className='col-lg-6 '>
                        <div className='mt-lg-5 mt-4'>
                            <i class="fa fa-user" aria-hidden="true"></i> <span className='ml-3 spans'>Darshil</span>
                        </div>
                        <div className='mt-lg-5 mt-4'>
                            <i class="fa fa-envelope" aria-hidden="true"></i> <span className='ml-3 spans'>john@gmail.com</span>
                        </div>
                        <div className='mt-lg-5 mt-4 '>
                            <i class="fa fa-birthday-cake" aria-hidden="true"></i> <span className='ml-3 spans'>29/2/2000</span>
                        </div>
                        {/* <div className='mt-lg-5 mt-4 '>
                            <i class="fa fa-link" aria-hidden="true"></i> <span className='ml-3 spans'>Tj62zYQcXC5GCjuP</span>
                        </div> */}

                    </div>
                </div>
                <div>
                </div>
            </div>

            <div className='container mt-5 parentdetails '>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className='mt-4'>
                                <h1>Parent's Detail</h1>
                            </div>
                            <div className='mt-lg-4 mt-sm-4 ml-lg-4'>
                                <i class="fa fa-user" aria-hidden="true"></i> <span className='ml-3 spans'>AbcBhai</span>
                            </div>
                            <div className='mt-lg-4 mt-sm-4 ml-lg-4'>
                                <i class='fas fa-briefcase'></i><span className='ml-3 spans'>Construction</span>
                            </div>
                            <div className='mt-lg-4 mt-sm-4 ml-lg-4 mb-sm-4'>
                                <i class="fa fa-mobile" aria-hidden="true"></i><span className='ml-3 spans'>+91 6663336669</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mt-5 residentalDetail '>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className='mt-4'>
                                <h1>Resident Details</h1>
                            </div>
                            <div className='mt-lg-4 mt-sm-4 ml-lg-4'>
                                <i class="fa fa-map-marker" aria-hidden="true"></i>
                                <span className='ml-3 spans'>Mota varachha</span>
                            </div>
                            <div className='mt-lg-4 mt-sm-4 ml-lg-4'>
                                <i class="fa-sharp fa-solid fa-city"></i><span className='ml-3 spans'>Surat</span>
                            </div>
                            <div className='mt-lg-4 mt-sm-4 ml-lg-4 mb-sm-4'>
                                <i class="fa fa-mobile" aria-hidden="true"></i><span className='ml-3 spans'>Gujarat</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
