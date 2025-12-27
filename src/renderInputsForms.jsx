import React, {useState} from "react";
import "./renderInputsForms.css"
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



    const isSchoolOrCompany = (key) => {
      return key === "school" || key === "company";
    };

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
    const renderInput = ({keyName, value, type="text", onChange, className}) => (
        <input
            className={className}
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
                <div className="cv-builder-forms-label-input-box">
                    <label htmlFor={key}>{placeholders}</label>
                    <textarea
                        id={key || undefined}
                        value={value[key] || ""}
                        placeholder={"Write your " + placeholders.toLowerCase()}
                        onChange={onChange}
                    />
                </div>
            );
        }


        if (isLanguage || isSkill) {
            return (
                <div className="margin-top-bottom-10px">
                    <div className="cv-builder-buttons-box">
                    <label htmlFor={key}>{placeholders}</label>
                    <button className="btn-white-blue" onClick={() => {
                        setState({activeIndex:null, editItem:key});
                        editContent(null, null, state.activeIndex, "setState")
                    }}>Add New
                    </button>
                    </div>
                    <ul className="cv-builder-forms-box">
                        {value[key].map((item, index) => (
                        state.activeIndex === index && state.editItem === key ? (
                            <li className="cv-builder-forms-edit-box" key={sectionKey + key + index}>
                                {renderInput({
                                    keyName: key,
                                    value: currentInput,
                                    type: meta[key] || "text",
                                    onChange: (e) => setCurrentInput(e.target.value),
                                    className: "input-edit"
                                })}
                                <div className="edit-form-btns-box">
                                <button onClick={() => saveEdit(currentInput, key, index)}>Save</button>
                                <button className="btn-red-white" onClick={() => cancelEdit(sectionKey)}>Cancel</button>
                                </div>
                            </li>
                        ) : (

                            <li className="cv-builder-forms-box-item" onClick={() => {
                                setState({activeIndex:index, editItem:key});
                                editContent(index, item, state.activeIndex, "setState")}}
                                 key={sectionKey + key + index}>
                                <h4>{item}</h4>
                                <button className="btn-white-red btn-sm" onClick={(e) => {e.stopPropagation();  deleteContent(index, key)}}>Delete</button>
                            </li>
                        )
                    ))}</ul>
                    {state.activeIndex === null && state.editItem === key &&(
                        <div className="cv-builder-forms-edit-box" key={sectionKey + key}>
                            {renderInput({
                                keyName: key,
                                value: currentInput,
                                type: meta[key] || "text",
                                onChange: (e) => setCurrentInput(e.target.value)
                            })}
                            <div className="edit-form-btns-box">
                            <button onClick={() => saveEdit(currentInput, key, null)}>Add</button>
                            <button className="btn-red-white" onClick={() => cancelEdit(sectionKey)}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div className="cv-builder-forms-label-input-box">
                <label htmlFor={key}>{placeholders}</label>
                <input
                    id={key || undefined}
                    type={meta[key] || "text"}
                    value={value[key] || ""}
                    placeholder={"Write your " + placeholders.toLowerCase()}
                    onChange={onChange}
                />
            </div>
        );
    }

    return (
        <div className="cv-builder-forms">
            <div className="cv-builder-buttons-box margin-bottom-sm">
            <h1>{title}</h1>
            {
                sectionKey === "education" || sectionKey === "experience" ? (
                    <button className="btn-white-blue" onClick={() => editContent(null, null, "add",  "setSectionState")}>Add New</button>
                ) : null
            }
            </div>
            {sectionState[sectionKey] === "add" && sectionKey !== "general" ? (
                <>
                    {Object.keys(sectionTemplate[sectionKey]).map((key) => {
                        return (
                            <> { isEndDateCurrent(key, currentInputSection) ? null :
                                (<div className={key === "isActive" ? "cv-builder-forms-label-checkbox" :"cv-builder-forms-label-input-box"} key={sectionKey + key}>
                                    <label htmlFor={key}>{placeholders[sectionKey][key]}</label>
                                    {renderInput({
                                        keyName: key,
                                        value: currentInputSection[key],
                                        type: meta[key] || "text",
                                        onChange: (e) => handleInputChange(key, e, meta[key]),
                                        className: key === "isActive" ? "checkbox" : undefined
                                    })}
                                </div>)}
                            </>
                        )
                    })}
                    <div className="edit-form-btns-box">
                    <button onClick={() => saveEdit(currentInputSection, null, null)}>Add</button>
                    <button className='btn-red-white' onClick={() => cancelEdit(sectionKey)}>Cancel</button>
                    </div>
                </>
            ) : null}
            {(sectionKey === "education" || sectionKey === "experience") ? (
                    <>
                        <>
                            {sectionState[sectionKey] === "none" && (
                                <div className="cv-builder-forms-section-box">
                                    {inputValue[sectionKey].map((item, index) => (
                                        <div className="cv-builder-forms-box-item" onClick={() => editContent(index, item, "edit", "setSectionState")} key={sectionKey + index}>
                                            <div className="cv-builder-forms-section-box-item-text-box">
                                                {Object.keys(sectionTemplate[sectionKey]).map((key) => (
                                                    isSchoolOrCompany(key) ? (<h4>{item[key]}</h4>) : null
                                                ))}
                                            </div>
                                            <button className="btn-white-red btn-sm" onClick={(e) => {e.stopPropagation(); deleteContent(index, null);}}>Delete</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                        { sectionState[sectionKey] === "edit" && (
                            inputValue[sectionKey].map((item, index) => (editItem.index === index && Object.keys(sectionTemplate[sectionKey]).map((key) => {
                            if (isEndDateCurrent(key, currentInputSection)) return null;
                            return (
                                <div  className={key === "isActive" ? "cv-builder-forms-label-checkbox" :"cv-builder-forms-label-input-box"} key={sectionKey + key + index}>
                                    <label htmlFor={key}>{placeholders[sectionKey][key]}</label>
                                    {renderInput({
                                        keyName: item[key],
                                        value: currentInputSection[key],
                                        type: meta[key] || "text",
                                        onChange: (e) => handleInputChange(key, e, meta[key]),
                                        className: key === "isActive" ? "checkbox" : undefined
                                    })}
                                </div>
                            );
                        }))))}
                        {sectionState[sectionKey] === "edit" &&  (
                            inputValue[sectionKey].map((item, index) => (editItem.index === index ? (
                            <div className="edit-form-btns-box">
                                <button onClick={() => saveEdit(currentInputSection, null, index)}>Save</button>
                                <button className="btn-red-white" onClick={() => cancelEdit(sectionKey)}>Cancel</button>
                            </div>
                        ) : null)))}
                    </>

            ) : (
                Object.keys(inputValue[sectionKey]).map((key) =>
                    renderData(sectionKey, inputValue[sectionKey], key, (e) => onChange(e, key), placeholders[sectionKey][key], meta)
                )
            )}
        </div>
    );
}

export default SectionBox;