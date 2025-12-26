import React from "react";

function ButtonsClearAddData({setData}) {
    const previewData = () => {
        let previewObject = {
            general: {
                firstName: "John",
                lastName: "Doe",
                jobPosition: "Frontend Developer",
                email: "john.doe@example.com",
                phoneNumber: "+1234567890",
                address: "123 Main Street, Toronto, ON, Canada",
                languages: ["en-US", "uk"],
                skills: ["react", "html", "javascript", "css", "nodejs"],
                personalSummary: "Passionate developer with 5 years of experience building responsive web applications using React, JavaScript, and modern UI frameworks."
            },
            education: [
                {
                    school: "MIT",
                    title: "B.Sc Computer Science",
                    dateFrom: "2010-09-01",
                    dateTo: "2014-06-01",
                    isActive: false
                },
                {
                    school: "Some University",
                    title: "B.Sc Computer Science",
                    dateFrom: "2015-12-01",
                    dateTo: "2019-08-01",
                    isActive: false
                }],
            experience: [{
                company: "Google",
                position: "Software Engineer",
                dateFrom: "2015-01-01",
                dateTo: "2020-12-31",
                tasks: "Developed and maintained client-facing websites using React and Tailwind CSS."
            }]
        }
        setData(previewObject);
    }

    const clearData = () => {
        let clearObject = {
            general: {
                firstName: "",
                lastName: "",
                jobPosition: "",
                email: "",
                phoneNumber: "",
                address: "",
                languages: [],
                skills: [],
                personalSummary: ""
            },
            education: [],
            experience: []

        }
        setData(clearObject);

    }
    return (
        <div className="cv-builder-buttons-box">
            <button onClick={previewData}>Preview data</button>
            <button className="btn-red-white" onClick={clearData}>Clear data</button>
        </div>
    )
}
export default ButtonsClearAddData;