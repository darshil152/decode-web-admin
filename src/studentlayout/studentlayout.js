import StudentSidebar from "./studentsidebar";
import StudentHeader from "./studentheader";
import StudentFooter from "./studentfooter"


function StudentLayout(props) {
    const removeLayer = () => {
        document.getElementById("root").classList.remove("dash-main-class-add");
    };

    return (
        <>
            <StudentHeader />
            <StudentSidebar />
            {props.children}
            <StudentFooter />
            <div className="overlay toggle-icon-main" onClick={removeLayer}></div>
        </>
    );
}

export default StudentLayout;
