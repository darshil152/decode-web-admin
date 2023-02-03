import React from 'react'
import profilepicture from "./img/profilepicture.jpg"
import reference from "./img/reference.jpg"

export default function Profile() {
    return (
        <>
            <div className='container mt-5 studentdetail' >
                <div className='row'>
                    <div className='col-lg-3 text-center mt-4'>
                        <img src={profilepicture} className="profilepicture" />
                    </div>
                    <div className='col-lg-9 mt-lg-5  mt-sm-3 text-sm-center text-md-center text-lg-left'>
                        <div className='User mt-4'>
                            <lable className="lables">Name:</lable><h6 className='username'>John Deo</h6>
                        </div>
                    </div>
                </div>
                <div className='row ml-4'>
                    <div className='col-lg-6'>
                        <div className='mt-lg-5 mt-sm-4'>
                            <i class="fa fa-user" aria-hidden="true"></i> <span className='ml-3 spans'>20000201</span>
                        </div>
                        <div className='mt-lg-5 mt-sm-4'>
                            <i class="fa fa-envelope" aria-hidden="true"></i> <span className='ml-3 spans'>john@gmail.com</span>
                        </div>

                        <div className='mt-lg-5 mb-lg-5 mt-sm-4'>
                            <i class='fas fa-graduation-cap'></i>
                            <span className='ml-3 spans'>FrontEnd Development</span>
                        </div>
                    </div>
                    <div className='col-lg-6 '>
                        <div className='mt-lg-5 mt-sm-4 '>
                            <i class="fa fa-birthday-cake" aria-hidden="true"></i> <span className='ml-3 spans'>29/2/2000</span>
                        </div>
                        <div className='mt-lg-5 mt-sm-4 '>
                            <img src={reference} className="reference" /> <span className='ml-3 spans'>Tj62zYQcXC5GCjuP</span>
                        </div>
                        <div className='mt-lg-5  mt-sm-4 mb-sm-4'>
                            <i class="fa fa-mobile" aria-hidden="true"></i><span className='ml-3 spans'>+91 6663336669</span>
                        </div>
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
                                <h1>Parent Detail</h1>
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
        </>


    )
}
{/* <div className='container mt-5'>
    <div className='row'>
        <div class="col-sm">
        </div>
        <div class="col-sm">
            <h1 className='profile'>Profile</h1>
        </div>
        <div class="col-sm">
        </div>
    </div>
    <div className='row'>
        <div className='col-sm-12'>
            <h5 className='profilename mt-3'>I'm a Web Developer</h5>
        </div>
    </div>
    <div className='row mt-3'>
        <div className='col-sm-12 mainprofile'>
       
        </div>
    </div>

    <div className='row '>
        <div className='col-sm-12 '>
            <h1 className='aboutheading'>About me</h1>

            <p className='container'>I am creative graphic designer.
                I am an expert in the Adobe Creative Suit and have worked with a varied myriad of clients.
                Connecting your ideas to customer perception & all the digital dots in between...</p>

        </div>
        <div className='col-sm-12 mt-3' style={{ textAlign: 'left' }}>
            <h1 className='Details'>Details:-</h1>
            <div className='row' mt-5>
                <div className='col-lg-6'>
                    <label className='lables'>Enrollment No:</label>  <span><h3 className='userdetails'>2000001</h3></span>
                    <label className='lables'>Name:</label>    <h3 className='userdetails'>User</h3>
                    <label className='lables'>Dob:</label>     <h3 className='userdetails'>06/12/2000</h3>
                    <label className='lables'>Course:</label>  <h3 className='userdetails'>Frontend Development</h3>
                    <label className='lables'>Status:</label>  <h3 className='userdetails'> Active</h3>
                    <label className='lables'>Contact:</label>  <h3 className='userdetails'>9996663332</h3>

                </div>
                <div className='col-lg-6'>
                    <label className='lables'>Father's Name:</label>  <h3 className='userdetails'> xyzbhai</h3>
                    <label className='lables'>Father's No:</label>  <h3 className='userdetails'>9996663332</h3>
                    <label className='lables'>Reference Id:</label>  <h3 className='userdetails'>9996663332</h3>
                </div>
            </div>
        </div>
    </div>
</div> */}