import React, {useState} from 'react';
import './App.css'


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
                language: "en-US",
                personalSummary: "Passionate developer with 5 years of experience."
            },
            education: {
                school: "MIT",
                title: "B.Sc Computer Science",
                dateFrom: "2010-09-01",
                dateTo: "2014-06-01",
                isActive: false
            },
            experience: {
                company: "Google",
                position: "Software Engineer",
                tasks: "Developed web applications",
                dateFrom: "2015-01-01",
                dateTo: "2020-12-31"
            }

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
                language: "",
                personalSummary: ""
            },
            education: {
                school: "",
                title: "",
                dateFrom: "",
                dateTo: "",
                isActive: false
            },
            experience: {
                company: "",
                position: "",
                tasks: "",
                dateFrom: "",
                dateTo: ""
            }

        }
        setData(clearObject);

    }
    return (
        <div>
            <button onClick={previewData}>Preview data</button>
            <button onClick={clearData}>Clear data</button>
        </div>
    )
}

function Preview({data}) {
    const renderSchoolTitle = (edu) => {
        if (!edu.school && !edu.title) return null;
        return (
            <p>
                {edu.school} — {edu.title}
            </p>
        );
    };

    const renderEducationData = (edu) => {
        if (!edu.dateFrom && !edu.dateTo) return null;
        return (
            <p>
                {edu.dateFrom} — {edu.isActive ? "Current" : edu.dateTo}
            </p>
        )
    }

    const renderExperienceCompany = (exp) => {
        if (!exp.company && !exp.position) return null;
        return (
            <p>{exp.company} — {exp.position}</p>
        )
    }

    const renderExperienceData = (expDat) => {
        if (!expDat.dateFrom && !expDat.dateTo) return null;
        return (
            <p>{expDat.dateFrom} — {expDat.dateTo}</p>
        )
    }

    return (
        <div className="preview">
            <div>
                <h1>{data.general.firstName} {data.general.lastName}</h1>
                <h2>{data.general.jobPosition}</h2>
            </div>
            <div>
                <h3>Contact</h3>
                <p>{data.general.email}</p>
                <p>{data.general.phoneNumber}</p>
                <p>{data.general.address}</p>
            </div>
            <div>
                <h3>Profile</h3>
                <p>{data.general.personalSummary}</p>
            </div>
            <div>
                <h3>Languages</h3>
                <p>{data.general.language}</p>
            </div>
            <div>
                <h3>Education</h3>
                {renderSchoolTitle(data.education)}
                {renderEducationData(data.education)}
            </div>
            <div>
                <h3>Experience</h3>
                {renderExperienceCompany(data.experience)}
                {renderExperienceData(data.experience)}
                <p>{data.experience.tasks}</p>
            </div>
        </div>
    )
}

function SectionBox({title, sectionKey, inputValue, placeholders, setInputValue}) {
    const onChange = (e, key) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const updatedSection = {...inputValue[sectionKey], [key]: value};
        setInputValue({...inputValue, [sectionKey]: updatedSection});
    }

    return (
        <>
            <h1>{title}</h1>
            {
                Object.keys(inputValue[sectionKey]).map((key) => {
                        const hideDateTo = sectionKey === "education" && inputValue[sectionKey].isActive && key === "dateTo";
                        const isCheckbox = key === "isActive";
                        const isDateField = ["DateOfBirth", "dateFrom", "dateTo"].includes(key);
                        const isTextArea = key === "personalSummary";

                        return (
                            <>
                                {hideDateTo ? null : (
                                    <>
                                        <label htmlFor={key}>{placeholders[sectionKey][key]}</label>
                                        {isDateField ? (
                                            <input id={key} type="date" value={inputValue[sectionKey][key]}
                                                   onChange={(e) => onChange(e, key)}/>
                                        ) : isCheckbox ? (
                                            <input id={key} type="checkbox" checked={inputValue[sectionKey][key]}
                                                   onChange={(e) => onChange(e, key)}/>
                                        ) : isTextArea ? (
                                                <textarea id={key} value={inputValue[sectionKey][key]}
                                                          placeholder={"Write your " + placeholders[sectionKey][key].toLowerCase()}
                                                          onChange={(e) => onChange(e, key)}></textarea>)
                                            : (
                                                <input
                                                    id={key}
                                                    type="text"
                                                    value={inputValue[sectionKey][key]}
                                                    placeholder={"Write your " + placeholders[sectionKey][key].toLowerCase()}
                                                    onChange={(e) => onChange(e, key)}
                                                />
                                            )}
                                    </>
                                )}
                            </>

                        )
                    }
                )}
        </>
    )
}

function App() {
    const [inputValue, setInputValue] = useState({
        general: {
            firstName: "John",
            lastName: "Doe",
            jobPosition: "Frontend Developer",
            email: "john.doe@example.com",
            phoneNumber: "+1234567890",
            address: "123 Main Street, Toronto, ON, Canada",
            language: "en-US",
            personalSummary: "Passionate developer with 5 years of experience."
        },
        education:
            {
                school: "MIT",
                title: "B.Sc Computer Science",
                dateFrom: "2010-09-01",
                dateTo: "2014-06-01",
                isActive: false
            },
        experience: {
            company: "Google",
            position: "Software Engineer",
            tasks: "Developed web applications",
            dateFrom: "2015-01-01",
            dateTo: "2020-12-31"
        }
    })

    const placeholders = {
        general: {
            firstName: "First Name",
            lastName: "Last Name",
            jobPosition: "Job Position",
            email: "Email",
            phoneNumber: "Phone Number",
            address: "Address",
            language: "Languages",
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
            tasks: "Skills",
            dateFrom: "Start Date",
            dateTo: "End Date"
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
    return (
        <>
            {sections.map((section) => (
                <button key={section.key} onClick={() => onClick(section.key)}>{section.title}</button>
            ))
            }
            <SectionBox title={sections.find(section => section.key === currentSection).title}
                        sectionKey={currentSection} inputValue={inputValue} placeholders={placeholders}
                        setInputValue={setInputValue}/>
            <ButtonsClearAddData setData={setInputValue}/>
            <Preview data={inputValue} sectionKey={currentSection}/>

        </>
    )
}

export default App
