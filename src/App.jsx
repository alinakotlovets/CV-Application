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
                languages: [],
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
    const [state, setState] = useState({state: "none", edit: null});
    const [sectionState, setSectionState] = useState({
        education: "none",
        experience: "none"
    });
    const [currentInput, setCurrentInput] = useState("");
    const [currentInputSection, setCurrentInputSection] = useState(null);

    const editContent = (index, value, state, stateItem) => {
        setEditItem({index: index, value: value});
        if (stateItem === "setState") {
            const newState = { education: "none", experience: "none"};
            setSectionState(newState);
            setCurrentInputSection(null);
            setState(state);
        }
        if (stateItem === "setSectionState") {
            const newState = { education: "none", experience: "none"};
            newState[sectionKey] = state;
            setSectionState(newState);
            setCurrentInputSection({...value})
        }
        setCurrentInput(state.state === "add" ? "" : value);
    }

    const deleteContent = (index, key) => {
        let newArr = [...inputValue[sectionKey][key]];
        newArr.splice(index, 1);
        const updatedSection = {...inputValue[sectionKey], [key]: newArr};
        setInputValue({...inputValue, [sectionKey]: updatedSection});
    }

    const deleteContentSection = (index) => {
        let newArr = [...inputValue[sectionKey]];
        newArr.splice(index, 1);
        const updatedSection = {...inputValue, [sectionKey]: newArr};
        setInputValue(updatedSection);
    }

    const cancelEdit = (sectionKey) => {
        if(sectionKey === "general"){
            setState({state: "none", edit: null});
        }
        if(sectionKey !== "general"){
            setSectionState(sectionState => ({...sectionState, [sectionKey]: "none"}));
        }
        setEditItem({index: null, value: null});
    }

    const AddNewContent = (value, key) => {
        let newArr = [...inputValue[sectionKey][key]];
        newArr.push(value);
        const updatedSection = {...inputValue[sectionKey], [key]: newArr};
        setInputValue({...inputValue, [sectionKey]: updatedSection});
        cancelEdit(sectionKey);
    }

    const AddNewContentSection = (value) => {
        let newArr = [...inputValue[sectionKey]];
        newArr.push(value);
        const updatedSection = {...inputValue, [sectionKey]: newArr};
        setInputValue(updatedSection);
        cancelEdit(sectionKey);
    }

    const saveEdit = (value, key, index) => {
        let newArr = [...inputValue[sectionKey][key]];
        newArr[index] = value;
        const updatedSection = {...inputValue[sectionKey], [key]: newArr};
        setInputValue({...inputValue, [sectionKey]: updatedSection});
        cancelEdit(sectionKey);
    }

    const saveEdiSection = (value, index) => {
        let newArr = [...inputValue[sectionKey]];
        newArr[index] = value;
        const updatedSection = {...inputValue, [sectionKey]: newArr};
        setInputValue(updatedSection);
        cancelEdit(sectionKey);
    }




    const meta = {
        DateOfBirth: "date",
        dateFrom: "date",
        dateTo: "date",
        isActive: "checkbox",
        phoneNumber: "tel",
        email: "email",
    }

    const renderData = (sectionKey, value, key, onChange, placeholders, meta) => {
        const isTextArea = key === "personalSummary";
        const isLanguage = key === "languages";
        const isSkill = key === "skills";


        if (sectionKey === "education" && value.isActive && key === "dateTo") return null;

        if (isTextArea) {
            return (
                <>
                    <label htmlFor={key}>{placeholders}</label>
                    <textarea
                        id={key}
                        value={value[key]}
                        placeholder={"Write your " + placeholders.toLowerCase()}
                        onChange={onChange}
                    />
                </>
            );
        }

        if (meta[key] === 'checkbox') {
            return (
                <>
                    <label htmlFor={key}>{placeholders}</label>
                    <input
                        id={key}
                        type={meta[key]}
                        checked={value[key]}
                        onChange={onChange}
                    />
                </>
            );
        }

        if (isLanguage || isSkill) {
            return (
                <>
                    <label htmlFor={key}>{placeholders}</label>
                    <button onClick={() => editContent(null, null, {state: "add", edit: key}, "setState")}>Add New
                    </button>
                    {value[key].map((item, index) => (
                        editItem.index === index && editItem.value === item && state.state === "edit" ? (
                            <div key={index}>
                                <input
                                    id={key}
                                    type="text"
                                    value={currentInput}
                                    onChange={(e) => setCurrentInput(e.target.value)}
                                />
                                <button onClick={() => saveEdit(currentInput, key, index)}>Save</button>
                                <button onClick={() => cancelEdit(sectionKey)}>Cancel</button>
                            </div>
                        ) : (
                            <div onClick={() => editContent(index, item, {state: "edit", edit: key}, "setState")}
                                 key={item}>
                                <h4>{item}</h4>
                                <button onClick={() => deleteContent(index, key)}>Delete</button>
                            </div>
                        )
                    ))}
                    {state.state === "add" && state.edit === key && (
                        <div key={key}>
                            <input
                                id={key}
                                type="text"
                                value={currentInput}
                                onChange={(e) => setCurrentInput(e.target.value)}
                            />
                            <button onClick={() => AddNewContent(currentInput, key)}>Add</button>
                            <button onClick={() => cancelEdit(sectionKey)}>Cancel</button>
                        </div>
                    )}
                </>
            );
        }


        return (
            <>
                <label htmlFor={key}>{placeholders}</label>
                <input
                    id={key}
                    type={meta[key] || "text"}
                    value={value[key]}
                    placeholder={"Write your " + placeholders.toLowerCase()}
                    onChange={onChange}
                />
            </>
        );
    }


    return (
        <>
            <h1>{title}</h1>
            {
                sectionKey === "education" || sectionKey === "experience" ? (
                    <button onClick={() => editContent(null, null, {...sectionState, [sectionKey]: "add"},  "setSectionState")}>Add New</button>
                ) : null
            }
            {sectionState[sectionKey] === "add" && sectionKey !== "general" && inputValue[sectionKey].length > 0 ? (
                <>
                    {Object.keys(inputValue[sectionKey][0]).map((key) => {
                        return (
                            <>
                                <div key={key}>
                                    <label htmlFor={key}>{placeholders[sectionKey][key]}</label>
                                    <input
                                        id={key}
                                        type={meta[key] || "text"}
                                        placeholder={"Write your " + placeholders[sectionKey][key].toLowerCase()}
                                        value={currentInputSection[key]}
                                        onChange={(e) => setCurrentInputSection(currentInputSection => ({...currentInputSection, [key]: e.target.value}))}
                                    />
                                </div>
                            </>
                        )
                    })}
                    <button onClick={() => AddNewContentSection(currentInputSection)}>Add</button>
                    <button onClick={() => cancelEdit(sectionKey)}>Cancel</button>
                </>
            ) : null}
            {(sectionKey === "education" || sectionKey === "experience") ? (
                inputValue[sectionKey].map((item, index) => (
                    <>
                        <div onClick={() => editContent(index, item, "edit", "setSectionState")} key={index}>

                            {sectionState[sectionKey] === "none" ?
                                (<>
                                    <div>
                                        {Object.keys(item).map((key) =>
                                            <h4>{item[key]}</h4>)}
                                    </div>
                                    <button onClick={(e) => {e.stopPropagation(); deleteContentSection(index);}}>Delete</button>
                                </>) : null}

                        </div>
                        {sectionState[sectionKey] === "edit" ? (
                            <>
                                {Object.keys(item).map((key) =>
                                    sectionState[sectionKey] === "edit" && editItem.index === index ? (
                                        <div key={item[key]}>
                                            <label htmlFor={key}>{placeholders[sectionKey][key]}</label>
                                            <input
                                                id={key}
                                                type={meta[key] || "text"}
                                                placeholder={"Write your " + placeholders[sectionKey][key].toLowerCase()}
                                                value={currentInputSection[key]}
                                                onChange={(e) => setCurrentInputSection(currentInputSection => ({...currentInputSection, [key]: e.target.value}))}
                                            />
                                        </div>
                                    ) : null)}
                            </>
                        ) : null}
                        {sectionState[sectionKey] === "edit" && editItem.index === index ? (
                            <>
                                <button onClick={() => saveEdiSection(currentInputSection, index)}>Save</button>
                                <button onClick={() => cancelEdit(sectionKey)}>Cancel</button>
                            </>
                        ) : null}
                    </>

                ))

            ) : (
                Object.keys(inputValue[sectionKey]).map((key) =>
                    renderData(sectionKey, inputValue[sectionKey], key, (e) => onChange(e, key), placeholders[sectionKey][key], meta)
                )
            )}
        </>
    );
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
