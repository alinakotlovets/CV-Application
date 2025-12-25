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
    const [state, setState] = useState({activeIndex: undefined, editItem: null})
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
        }
        if (stateItem === "setSectionState") {
            const newState = { education: "none", experience: "none"};
            newState[sectionKey] = state;
            setSectionState(newState);
            setCurrentInputSection({...value})
        }
        setCurrentInput(state === null ? "" : value);
    }
    const deleteContent = (index, key) => {
        let newArr;
        let updatedSection;
        if(key === null){
            newArr = [...inputValue[sectionKey]];
            newArr.splice(index, 1);
            updatedSection = {...inputValue, [sectionKey]: newArr};
            setInputValue(updatedSection);
        } else {
            newArr = [...inputValue[sectionKey][key]];
            newArr.splice(index, 1);
            updatedSection = {...inputValue[sectionKey], [key]: newArr};
            setInputValue({...inputValue, [sectionKey]: updatedSection});
        }
    }

    const cancelEdit = (sectionKey) => {
        if(sectionKey === "general"){
            setState({activeIndex: undefined, editItem: null})
        }
        if(sectionKey !== "general"){
            setSectionState(sectionState => ({...sectionState, [sectionKey]: "none"}));
        }
        setEditItem({index: null, value: null});
    }

    const saveEdit = (value, key, index) => {
        let newArr;
        let updatedSection;
       if(key === null){
           newArr = [...inputValue[sectionKey]];
           if(index === null){
               newArr.push(value)
           } else{
               newArr[index] = value;
           }
           updatedSection = {...inputValue, [sectionKey]: newArr};
           setInputValue(updatedSection);
       }
       else{
           newArr = [...inputValue[sectionKey][key]];
           if(index === null){
               newArr.push(value)
           } else{
               newArr[index] = value;
           }
           updatedSection = {...inputValue[sectionKey], [key]: newArr};
           setInputValue({...inputValue, [sectionKey]: updatedSection});
       }
        cancelEdit(sectionKey);
    }



    const isEndDateCurrent = (key, item) => {
        if(!item) return false;
        return  sectionKey === "education" && item.isActive && key === "dateTo";
    };

    const meta = {
        DateOfBirth: "date",
        dateFrom: "date",
        dateTo: "date",
        isActive: "checkbox",
        phoneNumber: "tel",
        email: "email",
    }

    const sectionTemplate = {
        education: { school: "", title: "", dateFrom: "", dateTo: "", isActive: false },
        experience: { company: "", position: "", dateFrom: "", dateTo: "", tasks: "" }
    };

    const handleInputChange = (key, e, type="text") => {
        const value = type === "checkbox" ? e.target.checked : e.target.value;
        setCurrentInputSection(prev => ({ ...prev, [key]: value }));
    };
    const renderInput = ({keyName, value, type="text", onChange}) => (
        <input
            id={keyName || undefined}
            type={type}
            {...(type === "checkbox" ? {checked: value} : {value})}
            onChange={onChange}
        />
    )

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
                        id={key || undefined}
                        value={value[key] || ""}
                        placeholder={"Write your " + placeholders.toLowerCase()}
                        onChange={onChange}
                    />
                </>
            );
        }


        if (isLanguage || isSkill) {
            return (
                <>
                    <label htmlFor={key}>{placeholders}</label>
                    <button onClick={() => {
                        setState({activeIndex:null, editItem:key});
                        editContent(null, null, state.activeIndex, "setState")
                    }}>Add New
                    </button>
                    {value[key].map((item, index) => (
                        state.activeIndex === index && state.editItem === key ? (
                            <div key={sectionKey + key + index}>

                                {renderInput({
                                    keyName: key,
                                    value: currentInput,
                                    type: meta[key] || "text",
                                    onChange: (e) => setCurrentInput(e.target.value)
                                })}
                                <button onClick={() => saveEdit(currentInput, key, index)}>Save</button>
                                <button onClick={() => cancelEdit(sectionKey)}>Cancel</button>
                            </div>
                        ) : (
                            <div onClick={() => {
                                setState({activeIndex:index, editItem:key});
                                editContent(index, item, state.activeIndex, "setState")}}
                                 key={sectionKey + key + index}>
                                <h4>{item}</h4>
                                <button onClick={(e) => {e.stopPropagation();  deleteContent(index, key)}}>Delete</button>
                            </div>
                        )
                    ))}
                    {state.activeIndex === null && state.editItem === key &&(
                        <div key={sectionKey + key}>
                            {renderInput({
                                keyName: key,
                                value: currentInput,
                                type: meta[key] || "text",
                                onChange: (e) => setCurrentInput(e.target.value)
                            })}
                            <button onClick={() => saveEdit(currentInput, key, null)}>Add</button>
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
                    id={key || undefined}
                    type={meta[key] || "text"}
                    value={value[key] || ""}
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
                    <button onClick={() => editContent(null, null, "add",  "setSectionState")}>Add New</button>
                ) : null
            }
            {sectionState[sectionKey] === "add" && sectionKey !== "general" ? (
                <>
                    {Object.keys(sectionTemplate[sectionKey]).map((key) => {
                        return (
                            <> { isEndDateCurrent(key, currentInputSection) ? null :
                                (<div key={sectionKey + key}>
                                    <label htmlFor={key}>{placeholders[sectionKey][key]}</label>
                                    {renderInput({
                                        keyName: key,
                                        value: currentInputSection[key],
                                        type: meta[key] || "text",
                                        onChange: (e) => handleInputChange(key, e, meta[key])
                                    })}
                                </div>)}
                            </>
                        )
                    })}
                    <button onClick={() => saveEdit(currentInputSection, null, null)}>Add</button>
                    <button onClick={() => cancelEdit(sectionKey)}>Cancel</button>
                </>
            ) : null}
            {(sectionKey === "education" || sectionKey === "experience") ? (
                inputValue[sectionKey].map((item, index) => (
                    <>
                        <div onClick={() => editContent(index, item, "edit", "setSectionState")} key={sectionKey + index}>

                            {sectionState[sectionKey] === "none" ?
                                (<>
                                    <div>
                                        {Object.keys(sectionTemplate[sectionKey]).map((key) => (
                                            isEndDateCurrent(key,item) ? (<h4>Current</h4>) : (<h4>{item[key]}</h4>)
                                        ))}
                                    </div>
                                    <button onClick={(e) => {e.stopPropagation(); deleteContent(index, null);}}>Delete</button>
                                </>) : null}

                        </div>
                        {sectionState[sectionKey] === "edit" && editItem.index === index && Object.keys(sectionTemplate[sectionKey]).map((key) => {
                            if (isEndDateCurrent(key, currentInputSection)) return null;
                            return (
                                <div key={sectionKey + key + index}>
                                    <label htmlFor={key}>{placeholders[sectionKey][key]}</label>
                                    {renderInput({
                                        keyName: item[key],
                                        value: currentInputSection[key],
                                        type: meta[key] || "text",
                                        onChange: (e) => handleInputChange(key, e, meta[key])
                                    })}
                                </div>
                            );
                        })}
                        {sectionState[sectionKey] === "edit" && editItem.index === index ? (
                            <>
                                <button onClick={() => saveEdit(currentInputSection, null, index)}>Save</button>
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
