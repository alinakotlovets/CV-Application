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
                languages: ["en-US", "uk"],
                skills: ["react", "html", "javascript", "css", "nodejs"],
                personalSummary: "Passionate developer with 5 years of experience."
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
                language: [],
                skills: [],
                personalSummary: ""
            },
            education: [{
                school: "",
                title: "",
                dateFrom: "",
                dateTo: "",
                isActive: false
            }],
            experience: [{
                company: "",
                position: "",
                dateFrom: "",
                dateTo: "",
                tasks: ""
            }]

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
                {data.general.languages.map((language) => (
                    <p>{language}</p>
                ))}
            </div>
            <div>
                <h3>Skills</h3>
                {data.general.skills.map((skill) => (
                    <p>{skill}</p>
                ))}
            </div>
            <div>
                <h3>Education</h3>
                {data.education.map((education) => {
                    return (
                        <>
                            {renderSchoolTitle(education)}
                            {renderEducationData(education)}
                        </>
                    )
                })}
            </div>
            <div>
                <h3>Experience</h3>
                {data.experience.map((experience) => {
                    return (
                        <>
                            {renderExperienceCompany(experience)}
                            {renderExperienceData(experience)}
                            <p>{experience.tasks}</p>
                        </>
                    )
                })}
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

    const [editItem, setEditItem] = useState({index: null, value: null});
    const [state, setState] = useState("none");
    const [currentInput, setCurrentInput] = useState("");

    const editContent = (index, value, state) => {
        setEditItem({index: index, value: value});
        setState(state);
        setCurrentInput(value);
        if (state === "add") {
            setCurrentInput("");
        }
    }

    const deleteContent = (index, key) => {
        let newArr = [...inputValue[sectionKey][key]];
        newArr.splice(index, 1);
        const updatedSection = {...inputValue[sectionKey], [key]: newArr};
        setInputValue({...inputValue, [sectionKey]: updatedSection});

    }

    const cancelEdit = () => {
        setEditItem({index: null, value: null});
        setState("none");
    }

    const AddNewContent = (value, key) => {
        let newArr = [...inputValue[sectionKey][key]];
        newArr.push(value);
        const updatedSection = {...inputValue[sectionKey], [key]: newArr};
        setInputValue({...inputValue, [sectionKey]: updatedSection});
        cancelEdit();

    }
    const saveEdit = (value, key, index) => {
        let newArr = [...inputValue[sectionKey][key]];
        newArr[index] = value;
        const updatedSection = {...inputValue[sectionKey], [key]: newArr};
        setInputValue({...inputValue, [sectionKey]: updatedSection});
        cancelEdit();
    }


    return (
        <>
            <h1>{title}</h1>
            {sectionKey === "education" || sectionKey === "experience" ? (
                    inputValue[sectionKey].map((item, index) => {
                        return (
                            <div key={index}>
                                {
                                    Object.keys(item).map((key) => {
                                        const hideDateTo = sectionKey === "education" && item.isActive && key === "dateTo";
                                        const isCheckbox = key === "isActive";
                                        const isDateField = ["DateOfBirth", "dateFrom", "dateTo"].includes(key);
                                        const isTextArea = key === "personalSummary";
                                        const isLanguage = key === "languages";
                                        const isSkill = key === "skills";

                                        return (
                                            <>
                                                {hideDateTo ? null : (
                                                    <>
                                                        <label htmlFor={key}>{placeholders[sectionKey][key]}</label>
                                                        {isDateField ? (
                                                            <input id={key} type="date" value={item[key]}
                                                                   onChange={(e) => onChange(e, key)}/>
                                                        ) : isCheckbox ? (
                                                            <input id={key} type="checkbox" checked={item[key]}
                                                                   onChange={(e) => onChange(e, key)}/>
                                                        ) : isTextArea ? (
                                                                <textarea id={key} value={item[key]}
                                                                          placeholder={"Write your " + placeholders[sectionKey][key].toLowerCase()}
                                                                          onChange={(e) => onChange(e, key)}></textarea>)
                                                            : isLanguage || isSkill ? (
                                                                    <>
                                                                        <button
                                                                            onClick={() => editContent(null, null, "add")}>Add
                                                                            New
                                                                        </button>
                                                                        {item[key].map((item, index) => (
                                                                            editItem.index === index && editItem.value === item && state === "edit" ?
                                                                                (
                                                                                    <div key={index}>
                                                                                        <input
                                                                                            id={key}
                                                                                            type="text"
                                                                                            value={currentInput}
                                                                                            onChange={(e) => setCurrentInput(e.target.value)}
                                                                                        ></input>
                                                                                        <button
                                                                                            onClick={() => saveEdit(currentInput, key, index)}>Save
                                                                                        </button>
                                                                                        <button onClick={cancelEdit}>Cansel
                                                                                        </button>
                                                                                    </div>
                                                                                )
                                                                                : (<div
                                                                                    onClick={() => editContent(index, item, "edit")}>
                                                                                    <h4 key={item}>{item}</h4>
                                                                                    <button
                                                                                        onClick={() => deleteContent(index, key)}>Delete
                                                                                    </button>
                                                                                </div>)
                                                                        ))}
                                                                        {state === "add" ? (
                                                                            <>
                                                                                <div key="additem">
                                                                                    <input
                                                                                        id="additem"
                                                                                        type="text"
                                                                                        value={currentInput}
                                                                                        onChange={(e) => setCurrentInput(e.target.value)}
                                                                                    ></input>
                                                                                    <button
                                                                                        onClick={() => AddNewContent(currentInput, key)}>Add
                                                                                    </button>
                                                                                    <button onClick={cancelEdit}>Cansel</button>
                                                                                </div>
                                                                            </>
                                                                        ) : null}
                                                                    </>)
                                                                : (
                                                                    <input
                                                                        id={key}
                                                                        type="text"
                                                                        value={item[key]}
                                                                        placeholder={"Write your " + placeholders[sectionKey][key].toLowerCase()}
                                                                        onChange={(e) => onChange(e, key)}
                                                                    />
                                                                )}
                                                    </>
                                                )}
                                            </>

                                        )

                                    })}
                            </div>
                        )

                    })

                ) :
                (Object.keys(inputValue[sectionKey]).map((key) => {
                        const hideDateTo = sectionKey === "education" && inputValue[sectionKey].isActive && key === "dateTo";
                        const isCheckbox = key === "isActive";
                        const isDateField = ["DateOfBirth", "dateFrom", "dateTo"].includes(key);
                        const isTextArea = key === "personalSummary";
                        const isLanguage = key === "languages";
                        const isSkill = key === "skills";

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
                                            : isLanguage || isSkill ? (
                                                    <>
                                                        <button onClick={() => editContent(null, null, "add")}>Add New</button>
                                                        {inputValue[sectionKey][key].map((item, index) => (
                                                            editItem.index === index && editItem.value === item && state === "edit" ?
                                                                (
                                                                    <div key={index}>
                                                                        <input
                                                                            id={key}
                                                                            type="text"
                                                                            value={currentInput}
                                                                            onChange={(e) => setCurrentInput(e.target.value)}
                                                                        ></input>
                                                                        <button
                                                                            onClick={() => saveEdit(currentInput, key, index)}>Save
                                                                        </button>
                                                                        <button onClick={cancelEdit}>Cansel</button>
                                                                    </div>
                                                                )
                                                                : (<div onClick={() => editContent(index, item, "edit")}>
                                                                    <h4 key={item}>{item}</h4>
                                                                    <button onClick={() => deleteContent(index, key)}>Delete
                                                                    </button>
                                                                </div>)
                                                        ))}
                                                        {state === "add" ? (
                                                            <>
                                                                <div key="additem">
                                                                    <input
                                                                        id="additem"
                                                                        type="text"
                                                                        value={currentInput}
                                                                        onChange={(e) => setCurrentInput(e.target.value)}
                                                                    ></input>
                                                                    <button
                                                                        onClick={() => AddNewContent(currentInput, key)}>Add
                                                                    </button>
                                                                    <button onClick={cancelEdit}>Cansel</button>
                                                                </div>
                                                            </>
                                                        ) : null}
                                                    </>)
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
                ))
            }

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
            languages: ["en-US", "uk"],
            skills: ["react", "html", "javascript", "css", "nodejs"],
            personalSummary: "Passionate developer with 5 years of experience."
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
