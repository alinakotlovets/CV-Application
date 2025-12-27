import React, {useState} from 'react';
import './App.css'
import Preview from "./preview.jsx";
import ButtonsClearAddData from "./clearShowPreviewData.jsx";
import SectionBox from "./renderInputsForms.jsx";
import {useRef} from "react";


function App() {
    const [inputValue, setInputValue] = useState({
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
    })

    const placeholders = {
        general: {
            firstName: "First Name",
            lastName: "Last Name",
            jobPosition: "Job Position",
            email: "Email",
            phoneNumber: "Phone Number",
            address: "Address",
            languages: "Languages",
            skills: "Skills",
            personalSummary: "Personal Summary"
        },
        education: {
            school: "School name",
            title: "Degree",
            dateFrom: "Start Date",
            dateTo: "End Date",
            isActive: "Current"
        },
        experience: {
            company: "Company Name",
            position: "Position",
            dateFrom: "Start Date",
            dateTo: "End Date",
            tasks: "Experience with"
        }
    }
    const sections = [
        {key: "general", title: "General"},
        {key: "education", title: "Education"},
        {key: "experience", title: "Experience"}
    ]
    const [currentSection, setCurrentSection] = useState("general");

    const onClick = (key) => {
        setCurrentSection(key);
    }

    const cvRef = useRef(null)

    return (
        <div className="cv-builder-content">
            <div className="cv-builder-left-box">
                <ul className="cv-builder-buttons-box">
            {sections.map((section) => (
                    <li>
                <button key={section.key} onClick={() => onClick(section.key)}>{section.title}</button>
                    </li>
            ))
            }</ul>
            <SectionBox title={sections.find(section => section.key === currentSection).title}
                        sectionKey={currentSection} inputValue={inputValue} placeholders={placeholders}
                        setInputValue={setInputValue}/>
            </div>
            <div className="cv-builder-right-box">
            <ButtonsClearAddData cvRef={cvRef} setData={setInputValue}/>
            <Preview data={inputValue} cvRef={cvRef} sectionKey={currentSection}/>
            </div>
        </div>
    )
}
export default App
