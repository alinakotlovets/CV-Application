import {useState} from 'react'
import './App.css'

function SectionBox({title, sectionKey}) {
    const [inputValue, setInputValue] = useState({
        general: {firstName: "", lastName: "", jobPosition: "", DateOfBirth: "Date of Birth"},
        education: {school: "", title: "", dateFrom: "From", dateTo: "To", isActive: "false"},
        experience: {company: "", position: "", tasks: "", dateFrom: "", dateTo: ""}
    })
    const onChange = (e, key) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const updatedSection = {...inputValue[sectionKey], [key]: value};
        setInputValue({...inputValue, [sectionKey]: updatedSection});
    }
    const placeholders = {
        general: {
            firstName: "First Name",
            lastName: "Last Name",
            jobPosition: "Job Position",
            DateOfBirth: "Date of Birth"
        },
        education: {school: "School", title: "Title", dateFrom: "From", dateTo: "To", isActive: "Current"},
        experience: {company: "Company", position: "Position", tasks: "Tasks", dateFrom: "From", dateTo: "To"}
    }

    return (
        <>
            <h1>{title}</h1>
            {
                Object.keys(inputValue[sectionKey]).map((key) => (
                        <>
                            <label htmlFor={key}>{placeholders[sectionKey][key]}</label>
                            {key === "DateOfBirth" || key === "date" || key === "dateFrom" || key === "dateTo"
                                ? (<input id={key} type="date" key={key} onChange={(e) => onChange(e, key)}
                                          value={inputValue[sectionKey][key]}/>)
                                : key === "isActive"
                                    ? (<input id={key} type="checkbox" onChange={(e) => onChange(e, key)}
                                              checked={inputValue[sectionKey][key]}
                                              key={key}/>)
                                    : (<input id={key} type="text" key={key} onChange={(e) => onChange(e, key)}
                                              value={inputValue[sectionKey][key]}
                                              placeholder={"Write your " + placeholders[sectionKey][key].toLowerCase()}/>)}

                            <h4>{inputValue[sectionKey][key]}</h4>
                        </>
                    )
                )}
        </>
    )
}

function App() {
    const sections = [
        {key: "general", title: "General"},
        {key: "education", title: "Education"},
        {key: "experience", title: "Experience"}
    ]
    const [currentSection, setCurrentSection] = useState("general");

    const onClick = (key) => {
        setCurrentSection(key);
    }
    return (
        <>
            {sections.map((section) => (
                <button key={section.key} onClick={() => onClick(section.key)}>{section.title}</button>
            ))
            }
            <SectionBox title={sections.find(section => section.key === currentSection).title}
                        sectionKey={currentSection}/>
        </>
    )
}

export default App
