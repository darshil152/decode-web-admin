import React, { useState } from "react";
import { useEffect } from "react";
import AdminLayout from "./adminlayout/adminlayout"
import Upload from "./img/upload-icon.svg"
import PhoneInput from "react-phone-input-2";
import { Formik } from "formik";
import * as Yup from "yup";
// import toastr from "toastr";
import { Checkbox, jssPreset } from "@material-ui/core";
import { ThemeProvider } from "react-bootstrap";
import firebaseApp from "./firebase/firebase";
import { Button, Modal } from "react-bootstrap";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { data } from "jquery";




function AddStudent() {


    const [imageAsUrl, setImageAsUrl] = useState('');
    const [file, setFile] = useState('');
    const [ernum, setErnum] = useState(23000001)
    const [fetchdata, setFetchdata] = useState([]);
    const [refe, setRef] = useState("");
    const [refamount, setAmout] = useState("")
    const [show, setShow] = useState(false);
    const [refData, setTemp] = useState({
        refId: 'decode',
        refAmount: 0
    });
    const handleShow = () => setShow(true);
    const [checked, setChecked] = useState(false);
    const [currentid, setCurrentid] = useState('')
    const [acticestatus, setActivestatus] = useState("")

    useEffect(() => {
        getdata();
    }, [])

    const handleClose = () => {
        setChecked(false);
        setShow(false);
    }

    const submitStudentData = (formData, resetForm) => {
        // UploadImageTOFirebase(formData);
        abc(formData);
        console.log("student :: ", formData);
    };

    const handlesave = (event) => {
        setShow(false)
        setTemp({
            refId: refe,
            refAmount: refamount
        })
        setChecked(false);
    }


    const abc = (formData) => {
        let idtoupdate = ''
        let updatedData = []
        for (let i = 0; i < fetchdata.length; i++) {
            if (fetchdata[i].id == refData.refId) {
                fetchdata[i].myref.push(currentid)
                console.log(refData.refId)
                updatedData = fetchdata[i].myref
                idtoupdate = fetchdata[i].id
            }

        }
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

    }




    const handleref = (event) => {
        setRef(event.target.value);
    }

    const handlerefamount = (event) => {
        setAmout(event.target.value);
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

    const handleChange = (e) => {
        console.log(e.target.files);
        setImageAsUrl(URL.createObjectURL(e.target.files[0]));
        setFile((e.target.files[0]));
    }


    const UploadImageTOFirebase = (data) => {
        const guid = () => {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return String(s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4());
        }


        let myPromise = new Promise((resolve, reject) => {

            const myGuid = guid();
            const storageUrl = firebaseApp.storage('gs://hey1-portfolio.appspot.com/')
            const storageRef = storageUrl.ref();

            const uploadTask = storageRef.child('decode').child('profile').child(myGuid).put(file)
            uploadTask.on('state_changed',
                (snapShot) => {

                }, (err) => {
                    //catches the errors
                    console.log(err)
                    reject(err)
                }, () => {

                    firebaseApp
                        .storage('gs://hey1-portfolio.appspot.com/')
                        .ref()
                        .child('decode')
                        .child('profile')
                        .child(myGuid)
                        .getDownloadURL()
                        .then(fireBaseUrl => {
                            resolve(fireBaseUrl)
                        }).catch(err => {
                            console.log('error caught', err)
                        })
                })
        })
        myPromise.then(url => {
            console.log(url)
            sendMessage(data)
        }).catch(err => {
            console.log('error caught', err)
        })
    }



    const getdata = async () => {
        setCurrentid(makeid(16))
        let entry = []
        let activeStudents = []
        const db = firebaseApp.firestore();
        db.collection('Students').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                entry.push(doc.data())
                // temp.push(doc.data())
            })
            console.log(entry, 'product array')
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
                email: data.email,
                eme_phone: data.eme_phone,
                courses: data.courses,
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
                createdAt: new Date().getTime(),
                id: makeid(16),
                password: makepass(8),
                project: "Decode",
                status: 1,
                myref: [],

            })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    resolve(docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                    reject(error);
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
                                        f_f_name: '',
                                        f_l_name: '',
                                        occupation: '',
                                        qualification: '',
                                        f_phone: '',
                                        line_1: '',
                                        line_2: '',
                                        city: '',
                                        state: '',
                                        country: '',
                                        zipcode: '',
                                        reference: {},
                                        amount: "",
                                    }}
                                    validationSchema={Yup.object({
                                        f_name: Yup.string().required("First name is required."),
                                        // l_name: Yup.string().required("Last name is required."),
                                        // email: Yup.string().required("email is required."),
                                        // courses: Yup.string().required("please choose your course."),
                                        // phone: Yup.string().required("phone is required."),
                                        // dob: Yup.string().required("Date Of Birth is required."),
                                        // eme_phone: Yup.string().required("Emergency Contact number is required."),
                                        // f_f_name: Yup.string().required("First name is required."),
                                        // f_l_name: Yup.string().required("Last name is required."),
                                        // occupation: Yup.string().required("Occupation is required."),
                                        // f_phone: Yup.string().required("Contact number is required."),
                                        // line_1: Yup.string().required("Address is required."),
                                        // line_2: Yup.string().required("Address is required."),
                                        // city: Yup.string().required("city is required."),
                                        // state: Yup.string().required("state is required."),
                                        // country: Yup.string().required("country is required."),
                                        // zipcode: Yup.string().required("Zipcode is required"),

                                        // amount: Yup.string().required("reference is required"),

                                    })}
                                    onSubmit={(formData, { resetForm }) => {
                                        submitStudentData(formData, resetForm);

                                    }}
                                >
                                    {(runform) => (
                                        <form className="row" onSubmit={runform.handleSubmit}>
                                            <div className="stsg-box-list d-flex align-items-center stsg-box-list-text mb-4">
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
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Enrollment Number</label>
                                                <input type="text" name="er_num" value={ernum} className="form-control input-style" placeholder="" />

                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">First Name</label>
                                                <input type="text" name="f_name" {...formAttr(runform, "f_name")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "f_name")}
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Last Name</label>
                                                <input type="text" name="l_name" {...formAttr(runform, "l_name")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "l_name")}
                                            </div>


                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Select courses:</label>
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
                                                </select>
                                                {errorContainer(runform, "courses")}

                                            </div>

                                            {/* <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Standard</label>
                                                <input type="text" name="standard" {...formAttr(runform, "standard")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "standard")}
                                            </div> */}


                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Date Of Birth</label>
                                                <input type="date" name="dob" {...formAttr(runform, "dob")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "dob")}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Email Address</label>
                                                <input type="email" name="email" {...formAttr(runform, "email")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "email")}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Contact Number</label>
                                                <div className="phone-cust-input">
                                                    <input type="tel" name="phone" {...formAttr(runform, "phone")} className="form-control input-style" maxLength='10' placeholder="" />
                                                    {errorContainer(runform, "phone")}
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Emergency Contact Number</label>
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
                                                <label className="lbl-comn-info">Father's First Name</label>
                                                <input type="text" name="f_f_name" {...formAttr(runform, "f_f_name")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "f_f_name")}
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Father's Last Name</label>
                                                <input type="text" name="f_l_name" {...formAttr(runform, "f_l_name")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "f_l_name")}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Father's Occupation</label>
                                                <input type="text" name="occupation" {...formAttr(runform, "occupation")} className="form-control input-style" placeholder="" />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Father's Qualification</label>
                                                <input type="qualification" name="qualification" {...formAttr(runform, "qualification")} className="form-control input-style" placeholder="" />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Father's Contact Number</label>
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
                                                <label className="lbl-comn-info">Line 1</label>
                                                <input type="text" name="line_1" {...formAttr(runform, "line_1")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "line_1")}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Line 2</label>
                                                <input type="text" name="line_2" {...formAttr(runform, "line_2")} className="form-control input-style" placeholder="" />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">City</label>
                                                <input type="text" name="city" {...formAttr(runform, "city")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "city")}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">State</label>
                                                <input type="text" name="state" {...formAttr(runform, "state")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "state")}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Country</label>
                                                <input type="text" name="country" {...formAttr(runform, "country")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "country")}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="lbl-comn-info">Zipcode</label>
                                                <input type="tel" name="zipcode" {...formAttr(runform, "zipcode")} className="form-control input-style" placeholder="" />
                                                {errorContainer(runform, "zipcode")}
                                            </div>

                                            <div className="col-12">
                                                <div className="comn-title-info">
                                                    <h1>Reference By</h1>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-3"  {...formAttr(runform, "reference")} >


                                                <input type="checkbox" onClick={handleShow} checked={checked} onChange={() => setChecked(!checked)} />
                                                <label className="lbl-comn-info" style={{ display: "inline", marginLeft: 20 }}>Reference</label>



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

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Reference</Modal.Title>
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

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AddStudent;