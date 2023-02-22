import React, { useState } from "react";
import { useEffect } from "react";
import AdminLayout from "./adminlayout/adminlayout"
import Upload from "./img/upload-icon.svg"
import { Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebaseApp from "./firebase/firebase";
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { Button, Modal } from "react-bootstrap";




function AddStudent() {

    let location = useLocation();


    const [imageAsUrl, setImageAsUrl] = useState('');
    const [file, setFile] = useState('');
    const [ernum, setErnum] = useState(23000001)
    const [fetchdata, setFetchdata] = useState([]);
    const [refe, setRef] = useState("");
    const [refamount, setAmout] = useState("")
    const [otherRefName, setOtherRefName] = useState("")
    const [otherRefAmount, setOtherRefAmount] = useState("")
    const [show, setShow] = useState(false);
    const [refData, setTemp] = useState({
        refId: 'decode',
        refAmount: 0
    });
    const [otherRef, setOtherRef] = useState({
        refName: '',
        refAmount: 0
    })

    const [checked, setChecked] = useState(false);
    const [otherRefCheck, setOtherRefCheck] = useState(false);
    const [otherRefModalShow, setOtherRefModalShow] = useState(false);
    const [currentid, setCurrentid] = useState('')
    const [acticestatus, setActivestatus] = useState("")


    const navigate = useNavigate();
    useEffect(() => {
        getdata();
    }, [])



    const handleShow = () => setShow(true);

    const handleClose = () => {
        setChecked(false);
        setShow(false);
    }

    const handleOtherRefModalShow = () => {
        setOtherRefModalShow(true)
    }

    const handleOtherRefModalClose = () => {
        setOtherRefCheck(false)
        setOtherRefModalShow(true)
    }



    const submitStudentData = (formData, resetForm) => {
        // UploadImageTOFirebase(formData);
        // sendMessage(formData);
        abc(formData);

    };

    const handlesave = (event) => {
        setShow(false)
        setTemp({
            refId: refe,
            refAmount: refamount
        })
        // setOtherRef({
        //     refName: '',
        //     refAmount: 0
        // })
        // setOtherRefCheck(false)
    }

    const handleOtherRefSave = () => {
        setOtherRefModalShow(false)
        setOtherRef({
            refName: otherRefName,
            refAmount: otherRefAmount
        })
        // setTemp({
        //     refId: 'decode',
        //     refAmount: 0
        // })
        // setChecked(false)
    }


    const abc = (formData) => {
        let idtoupdate = ''
        let updatedData = []
        console.log('fetch data :: ', fetchdata)
        for (let i = 0; i < fetchdata.length; i++) {
            if (fetchdata[i].id == refData.refId) {
                fetchdata[i].myref.push(currentid)
                if (fetchdata[i].myref.length > 0) {
                    updatedData = fetchdata[i].myref
                }
                idtoupdate = fetchdata[i].id
            }

        }
        if (idtoupdate !== '') {
            console.log('come')
            const db = firebaseApp.firestore();
            db.collection('Students').where('id', '==', idtoupdate).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.ref.id)

                    var updateCollection = db.collection("Students").doc(doc.ref.id);
                    return updateCollection.update({
                        myref: updatedData
                    })
                        .then(() => {
                            console.log("Document successfully updated!");
                            sendMessage(formData)
                            // window.location.href = '/table'

                        })
                        .catch((error) => {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                })

            }).catch(err => {
                console.error(err)
            });
        } else {
            console.log('else')
            sendMessage(formData)
        }


    }




    const handleref = (event) => {
        setRef(event.target.value);
    }

    const handlerefamount = (event) => {
        setAmout(event.target.value);
    }
    const handleOtherrefamount = (event) => {
        setOtherRefAmount(event.target.value);
    }
    const handleOtherrefName = (event) => {
        setOtherRefName(event.target.value);
    }

    const errorContainer = (form, field) => {
        return form.touched[field] && form.errors[field] ? <span className="error text-danger">{form.errors[field]}</span> : null;
    };

    const formAttr = (form, field) => ({
        onBlur: form.handleBlur,
        onChange: form.handleChange,
        value: form.values[field],
    });

    // const uploadImage = (images) => {
    //     getBase64(images[0])
    // }


    // const getBase64 = (file) => {
    //     let dataurl = ''
    //     var reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => {
    //         console.log(reader.result);
    //         dataurl = reader.result
    //         // setImage(reader.result);
    //     };
    //     setImageAsUrl(dataurl)
    // }






    const getdata = async () => {
        setCurrentid(makeid(16))
        let entry = []
        let activeStudents = []
        const db = firebaseApp.firestore();
        db.collection('Students').where("status", "==", 1).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                entry.push(doc.data())
                // temp.push(doc.data())
            })
            if (entry.length > 0) {
                entry.sort(compare);
                let lastErNum = entry[entry.length - 1].er_num;
                setErnum(ernum => 1 + lastErNum)
                setFetchdata(entry)


                for (let i = 0; i < entry.length; i++) {
                    if (entry[i].status == 1) {
                        console.log(entry[i].status)
                        activeStudents.push(entry[i])
                    }
                }
                setActivestatus(activeStudents)
            }


        }).catch(err => {
            console.error(err)
        });
    }


    const compare = (a, b) => {
        if (a.er_num < b.er_num) {
            return -1;
        }
        if (a.er_num > b.er_num) {
            return 1;
        }
        return 0;
    }

    const makeid = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }


    const makepass = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }



    const sendMessage = (data) => {
        console.log(refData)
        let registerQuery = new Promise((resolve, reject) => {
            let db = firebaseApp.firestore();
            db.collection("Students").add({
                er_num: Number(ernum),
                f_name: data.f_name,
                l_name: data.l_name,
                dob: data.dob,
                phone: data.phone,
                profile_img: '',
                email: data.email,
                eme_phone: data.eme_phone,
                courses: data.courses,
                course_fees: data.course_fees,
                f_f_name: data.f_f_name,
                f_l_name: data.f_l_name,
                occupation: data.occupation,
                qualification: data.qualification,
                f_phone: data.f_phone,
                line_1: data.line_1,
                line_2: data.line_2,
                city: data.city,
                state: data.state,
                country: data.country,
                zipcode: data.zipcode,
                reference: refData,
                other_ref: otherRef,
                createdAt: new Date().getTime(),
                id: currentid,
                password: makepass(8),
                project: "Decode",
                userRole: 1,
                status: 1,
                myref: [],
                myAttend: [],
                fees: [],
                terms: false,
            })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    resolve(docRef.id);
                    toast.success('Form submitted successfully', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    navigate('/dashboard')

                })
                .catch(function (error) {
                    console.error("Please check form again ", error);
                    reject(error);
                    toast.error('Attendance is already added', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                });
        });
        registerQuery.then(result => {
            console.warn('register successful')
            // toast.success("Thank you for reaching out. We will contact you soon.")
        }).catch(error => {
            console.error(error)
        })
    }


    return (
        <AdminLayout>
            <div className="content-main-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="comn-title-info">
                                <h1>Student Details</h1>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="white-box-main">
                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        er_num: ernum,
                                        file: '',
                                        f_name: '',
                                        l_name: '',
                                        dob: '',
                                        email: '',
                                        phone: '',
                                        eme_phone: '',
                                        courses: '',
                                        course_fees: '',
                                        f_f_name: '',
                                        f_l_name: '',
                                        occupation: '',
                                        qualification: '',
                                        f_phone: '',
                                        line_1: '',
                                        line_2: '',
                                        city: '',
                                        state: '',
                                        country: 'India',
                                        zipcode: '',
                                        reference: {},
                                        amount: "",
                                    }}
                                    validationSchema={Yup.object({
                                        f_name: Yup.string().required("First name is required."),
                                        l_name: Yup.string().required("Last name is required."),
                                        email: Yup.string().required("email is required."),
                                        courses: Yup.string().required("please choose your course."),
                                        course_fees: Yup.string().required("please Enter Fees of Course."),
                                        phone: Yup.string().required("phone is required."),
                                        dob: Yup.string().required("Date Of Birth is required."),
                                        eme_phone: Yup.string().required("Emergency Contact number is required."),
                                        f_f_name: Yup.string().required("First name is required."),
                                        f_l_name: Yup.string().required("Last name is required."),
                                        f_phone: Yup.string().required("Contact number is required."),
                                        line_1: Yup.string().required("Address is required."),
                                        city: Yup.string().required("city is required."),
                                        state: Yup.string().required("state is required."),
                                        zipcode: Yup.string().required("Zipcode is required"),
                                    })}
                                    onSubmit={(formData, { resetForm }) => {
                                        submitStudentData(formData, resetForm);

                                    }}
                                >
                                    {(runform) => (
                                        <form className="row" onSubmit={runform.handleSubmit}>
                                            {/* <div className="col-12 stsg-box-list d-flex align-items-center stsg-box-list-text mb-4">
                                                <span className="d-block">
                                                    <img src={imageAsUrl} alt="profile" />
                                                </span>
                                                <div className="stsg-box-list-text ps-3">
                                                    <bdi className="d-block">Upload your profile</bdi>
                                                    <p className="mb-0">You can upload image of max size of 5mb. Image will be cropped to 256*256px.</p>
                                                    <div className="upload-btn-wrapper mt-3">
                                                        <button className="btn">
                                                            <img src={Upload} className="pe-2" alt="profile" />
                                                            Upload Image
                                                        </button>
                                                        <input type="file" name="myfile"  {...formAttr(runform, "file")} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div> */}

                                            <div className="col-12 mb-3">
                                                <label className="lbl-comn-info">Enrollment Number</label>
                                                <input type="text" name="er_num" value={ernum} className="form-control input-style" placeholder="" />

                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">First Name <span className="text-danger">*</span></label>
                                                <input type="text" name="f_name" {...formAttr(runform, "f_name")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "f_name")}
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Last Name <span className="text-danger">*</span></label>
                                                <input type="text" name="l_name" {...formAttr(runform, "l_name")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "l_name")}
                                            </div>


                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Select courses: <span className="text-danger">*</span></label>
                                                <select className="selectcourse"
                                                    name="courses"

                                                    {...formAttr(runform, "courses")}

                                                >
                                                    <option value="" label="Select a course">
                                                        Select a courses{" "}
                                                    </option>
                                                    <option value="1" label="Master In Web design ">
                                                        {" "}
                                                        Master In Web design
                                                    </option>
                                                    <option value="2" label="Master In Frontend Development">
                                                        Master In Frontend Development
                                                    </option>
                                                    <option value="3" label="Master In Backend Development">
                                                        Master In Backend Development
                                                    </option>
                                                    <option value="4" label="firebase">
                                                        firebase
                                                    </option>
                                                    <option value="5" label="Master in 360 & 3D Website">
                                                        Master in 360 & 3D Website
                                                    </option>
                                                    <option value="6" label="Master In Fullstack Development">
                                                        Master In Fullstack Development
                                                    </option>
                                                    <option value="7" label="Master In MERN-stack Development">
                                                        Master In MERN-stack Development
                                                    </option>
                                                </select>
                                                {errorContainer(runform, "courses")}

                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Course Fees <span className="text-danger">*</span></label>
                                                <input type="text" name="course_fees" {...formAttr(runform, "course_fees")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "course_fees")}
                                            </div>


                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Date Of Birth <span className="text-danger">*</span></label>
                                                <input type="date" name="dob" {...formAttr(runform, "dob")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "dob")}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Email Address <span className="text-danger">*</span></label>
                                                <input type="email" name="email" {...formAttr(runform, "email")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "email")}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Contact Number <span className="text-danger">*</span></label>
                                                <div className="phone-cust-input">
                                                    <input type="tel" name="phone" {...formAttr(runform, "phone")} className="form-control input-style" maxLength='10' placeholder="" />
                                                    {errorContainer(runform, "phone")}
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Emergency Contact Number <span className="text-danger">*</span></label>
                                                <div className="phone-cust-input">
                                                    <input type="tel" name="eme_phone" {...formAttr(runform, "eme_phone")} className="form-control input-style" maxLength='10' placeholder="" />
                                                    {errorContainer(runform, "eme_phone")}
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="comn-title-info">
                                                    <h1>Parent's Details</h1>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Father's First Name <span className="text-danger">*</span></label>
                                                <input type="text" name="f_f_name" {...formAttr(runform, "f_f_name")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "f_f_name")}
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Father's Last Name <span className="text-danger">*</span></label>
                                                <input type="text" name="f_l_name" {...formAttr(runform, "f_l_name")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "f_l_name")}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Father's Occupation</label>
                                                <input type="text" name="occupation" {...formAttr(runform, "occupation")} className="form-control input-style" placeholder="" />
                                            </div>
                                            {/* <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Father's Qualification</label>
                                                <input type="qualification" name="qualification" {...formAttr(runform, "qualification")} className="form-control input-style" placeholder="" />
                                            </div> */}
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Father's Contact Number <span className="text-danger">*</span></label>
                                                <div className="phone-cust-input">
                                                    <input type="tel" name="f_phone" {...formAttr(runform, "f_phone")} className="form-control input-style" maxLength='10' placeholder="" />
                                                    {errorContainer(runform, "f_phone")}
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="comn-title-info">
                                                    <h1>Address Details</h1>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Line 1 <span className="text-danger">*</span></label>
                                                <input type="text" name="line_1" {...formAttr(runform, "line_1")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "line_1")}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Line 2</label>
                                                <input type="text" name="line_2" {...formAttr(runform, "line_2")} className="form-control input-style" placeholder="" />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">City <span className="text-danger">*</span></label>
                                                <input type="text" name="city" {...formAttr(runform, "city")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "city")}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">State <span className="text-danger">*</span></label>
                                                <input type="text" name="state" {...formAttr(runform, "state")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "state")}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Country <span className="text-danger">*</span></label>
                                                <input type="text" name="country" {...formAttr(runform, "country")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "country")}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Zipcode <span className="text-danger">*</span></label>
                                                <input type="tel" name="zipcode" {...formAttr(runform, "zipcode")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "zipcode")}
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <div className="comn-title-info">
                                                    <h1>Reference By Old Student</h1>
                                                </div>
                                                <div>
                                                    <input type="checkbox" onClick={handleShow} checked={checked} onChange={() => setChecked(!checked)} />
                                                    <label className="lbl-comn-info" style={{ display: "inline", marginLeft: 20 }}>Reference</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <div className="comn-title-info">
                                                    <h1>Reference By Other</h1>
                                                </div>
                                                <div>
                                                    <input type="checkbox" onClick={handleOtherRefModalShow} checked={otherRefCheck} onChange={() => setOtherRefCheck(!otherRefCheck)} />
                                                    <label className="lbl-comn-info" style={{ display: "inline", marginLeft: 20 }}>Reference</label>
                                                </div>
                                            </div>




                                            <div className="col-12 pt-4 text-md-end text-center">
                                                <button type="submit" className="btn-comn-all" style={{ marginRight: 15 }}>
                                                    Save
                                                </button>
                                                <button type="button" className="btn-comn-all3 ms-3">
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </Formik>

                                <Modal show={show && checked} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Reference By Old Student</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <select className="form-control input-style" name="reference" onChange={handleref} value={refe} >
                                            <option value="⬇️ Select a fruit ⬇️" > -- Select a reference -- </option>
                                            {acticestatus.length && acticestatus.map((items) => (
                                                <option value={items.id}>{items.f_name} {items.l_name}</option>
                                            ))}
                                        </select>
                                        <label className="lbl-comn-info" onChange={refamount} >Number of Amount :</label>

                                        <input className="form-control input-style" id="amount" name="amount" onChange={handlerefamount}
                                        />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={handlesave}>
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>


                                <Modal show={otherRefModalShow && otherRefCheck} onHide={handleOtherRefModalClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Reference By Other</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <label className="lbl-comn-info"  > Refered By:</label>

                                        <input className="form-control input-style" id="referedBy" name="referedBy" onChange={handleOtherrefName} />
                                        <label className="lbl-comn-info"  >Number of Amount :</label>

                                        <input className="form-control input-style" id="otherRefAmount" name="otherRefAmount" onChange={handleOtherrefamount}
                                        />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleOtherRefModalClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={handleOtherRefSave}>
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </AdminLayout>

    );
}

export default AddStudent;