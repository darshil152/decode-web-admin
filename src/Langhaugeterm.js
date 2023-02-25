
import React, { Component } from 'react'
import Rules from './Rules'
import firebaseApp from './firebase/firebase';
import Studentlayout from "./studentlayout/studentlayout"

export default class Langhaugeterm extends Component {
    constructor() {
        super();
        this.state = {
            language: true,
            rules: ['વિદ્યાર્થી એ સંસ્થા દ્વારા આપેલા સમય પર આવવાનુ રહેશે. જો કોઇ કારણસર આવવામાં મોડું થાય અથવા રજા જોઇતી હોય તો એક દિવસ પહેલા ફેકલ્ટીને જાણ કરવી.',

                ' ઇન્સ્ટિટ્યૂટ ની પ્રોપર્ટી ને નુકશાન કરવું નહિ  જો નુકશાન કરશો તો પ્રવેશ કેન્સલ કરવામાં આવશે અને કોર્ષ ફી રીટર્ન આપવામાં આવશે નહિ .',

                ' ઇન્સ્ટિટ્યૂટ માં એન્ટ્રી વખતે મોબાઇલ સાઇલેન્ટ કરીને આવવુ.',

                ' ઇન્સ્ટિટ્યૂટ માં દાખલ થયા પછી કઈ પણ ચીજ વસ્તુ ખાવી નહિ જો ખાતા પકડાશો તો પ્રેક્ટિ કલ માં બેસવા દેવામાં આવશે નહિ .',

                ' કોર્ષ ની સમય અવધિ અંદાજિ ત હોય છે જે વિદ્યાર્થી ની યાદ શક્તિ તેમજ તેમના પ્રેક્ટિકલ ની સ્પીડ પર આધારિત હોય છે એટલે સમય વધારેપણ થઈ શકે.',

                ' જોબ રિલેટેડ કોર્ષમાં ફેકલ્ટી જે પ્રેક્ટિકલ વર્ક ઘરે બનાવવા માટે આપેલ હોય તે ફરજીયાત કરવાનું રહેશે.',

                ' વિદ્યાર્થી ને કોઈ કારણ થી કોર્ષ કેન્સલ કરવાનો થાય તો કોર્ષની ભરેલી ફી રીટર્ન મળશે નહિ  તેમજ કોર્ષ ટ્રાન્સફર કરવાનો થાય તો શીખેલા કોર્ષની ફી ટ્રાન્સફર થશે નહિ  બાકીની ફી ટ્રાન્સફર કરી આપવામાં આવશે.',

                ' જોબ રિલેટેડ કોર્ષ માં ઇંગ્લિશ લખતા વાંચતા આવડવુ જરૂરી હોવાથી જો ઇંગ્લિશ ના આવડતું હોય તો સ્પોકન ઇંગ્લિ શનો કોર્ષ કોઇપણ ઇન્સ્ટિટ્યૂટ માંથી કરી લેવો જો કોર્ષ પૂરો થતા પહેલા ઇંગ્લિશ ના આવડતું હોય તે વિદ્યાર્થી ની જોબ ની ગેરંટી Decode Softtechની રહેશે નહિ વિદ્યાર્થી નો કોર્ષ પૂર્ણ થયા પછી તેમજ કોર્ષની ફી પૂર્ણ થયા પછી જ ઇન્ટરવ્યૂ માટેમોકલવામાં આવશે ચાલુ કોર્ષમાં ઇન્ટરવ્યૂ માં કેજોબ પર મોકલવામાં આવશે નહિ.',

                ' જોબ રિલેટેડ કોર્ષમાં કોર્ષ પૂરો થાય ત્યાર પછી ઓછા માં ઓછા 3 પ્રોજેક્ટ ફરજીયાત બનાવવાના રહેશે  ત્યારપછી થી જ કંપનીમાં ઇન્ટરવ્યૂ માટેમોકલવામાં આવશે .',

                ' Decode Softtech તરફથી જોબ પર જ્યાં મોકલવામાં આવે ત્યાં ઓછામાં ઓછા 18 મહિ ના નો બોન્ડ રહેશે . જો તમે એ બોન્ડ કરવા માટે તૈયાર ના હોવ તો જોબની જવાબદારી Decode Softtech ની રહેશે નહિ .',

                ' જોબ રિલેટેડ કોર્ષમાં વિદ્યાર્થી ની હાજરી ઓછામાં ઓછી 90% હોવી ફરજીયાત છે.',

                ' જો સતત 3 અઠવાડિયા થી વધુ ગેરહાજર હોય તો પ્રવેશ રદ કરવામાં આવશે અને ફી પરત કરવામાં આવશે નહીં.',
            ],
            Enrules: [
                'Decode Softtech offers a variety of courses in the field of IT, Multimedia (Designing & Development)',

                'Decode Softtech is an organization that runs a Training & Placement & (T&P) Department for the students and companies that are looking for potential candidates for their suitable requirements which will help to make Surat an IT HUB. However,Decode Softtech is not a placement consultancy, in particular, so after the selection of candidates,Decode Softtech is not bound to any responsibilities. Still, we will always be ready to provide necessary support and help, for which Decode Softtech will not take any charge.',

                'All the details regarding student placement such as student’s absence on the interview day, selection result, or any future update regarding student’s behavior and punctuality must be provided to the T&P department on a regular basis.',

                'The company can be applied for the campus interview If a company has more than 10 employees. In this procedure, the company can visit the institute for the selection process after letting the T&P department know.',

                'Institute can use the logo of a placement partner company, and can also enlist them as a partner list. Institute can send future students to visit the company for practical knowledge, and if needed the partner company must arrange the field expert for the knowledge sharing with students.',

                'If the candidate’s course is running and he\she gets selected on basis of his current knowledge, then to complete his remaining course company must arrange his job hours according to the lecture timing.',

                'The availability of the T&P department for contact is only on Tuesday and Friday from 12:00 PM to 1:00 PM & 2:00 PM to 4:00 PM',

                'After the selection of candidates, the company must issue the offer/joining letter of the same.',

                'We expect you to provide your experiences and feedback in the medium of video review via mail to us.',
            ],
            getid: "",
        }
    }



    componentDidMount() {
        const url = window.location.href;
        var ids = url.substring(url.lastIndexOf('/') + 1);
        this.setState({ getid: ids }, () => {
            this.getuserrole()
        })

    }

    getuserrole = () => {
        const db = firebaseApp.firestore();
        db.collection('Students').where("er_num", "==", Number(this.state.id)).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data())
                if (Number(localStorage.getItem('userrole')) !== 2) {
                    if (this.state.sc !== this.state.currentdata.password) {
                        window.location.href = '/'
                    }
                }
            });
        }).catch(err => {
            console.error(err)
        });
    }

    chagees = () => {
        this.setState({ language: !this.state.language })
    }

    render() {
        return (
            <>
                <Studentlayout >
                    <div className='content-main-section left'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-lg-12' style={{ textAlign: "end " }}>
                                    <button className="btn btn-primary mt-5" onClick={this.chagees}>{this.state.language == true ? 'English' : 'Gujarati'}</button>
                                </div>
                            </div>
                            <ul className='rules'>
                                {this.state.language == 0 ?
                                    this.state.Enrules.map((number, i) =>
                                        <li className='text-justify' key={i}>{number}</li>
                                    ) : this.state.rules.map((number, i) =>
                                        <li className='text-justify' key={i}>{number}</li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>

                </Studentlayout>
            </>
        )
    }
}
