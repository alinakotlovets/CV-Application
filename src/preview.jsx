import React from "react";
import "./preview.css";
import emailIcon from "./img/email.svg";
import phoneIcon from "./img/phone.svg";
import locationIcon from "./img/location.png";

function Preview({data, cvRef}) {
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
        <div ref={cvRef} className="cv-builder-preview">
        <div className="underline-2px">
                <h1>{data.general.firstName} {data.general.lastName}</h1>
                <h2>{data.general.jobPosition}</h2>
            </div>
            <div className="preview-content-box">
            <div className="preview-left-box">
            <div className="preview-section">
                <h3 className="underline-1px">Contact</h3>
                <ul className="preview-list">
                    <li className="preview-list-item">
                        <img className="contact-icon" src={emailIcon} alt="email icon"/>
                        <p>{data.general.email}</p>
                    </li>
               <li className="preview-list-item">
                   <img className="contact-icon" src={phoneIcon} alt="phone icon"/>
                   <p>{data.general.phoneNumber}</p>
               </li>
                    <li className="preview-list-item">
                        <img className="contact-icon" src={locationIcon} alt="location icon"/>
                        <p>{data.general.address}</p>
                    </li>
                </ul>
            </div>
            <div className="preview-section">
                <h3 className="underline-1px">Skills</h3>
                <ul className="preview-list-grid">
                {data.general.skills.map((skill) => (
                    <li className="preview-list-grid-item">{skill}</li>
                ))}
                </ul>
            </div>
            <div className="preview-section">
                <h3 className="underline-1px">Languages</h3>
                <ul className="preview-list">
                {data.general.languages.map((language) => (
                    <li className="preview-list-item">{language}</li>
                ))}
                </ul>
            </div>
            </div>
            <div className="preview-right-box">
            <div className="preview-section">
                <h3 className="underline-1px">Profile</h3>
                <p>{data.general.personalSummary}</p>
            </div>
            <div className="preview-section">
                <h3 className="underline-1px">Education</h3>
                <ul className="preview-list">
                {data.education.map((education) => {
                    return (
                        <li className="preview-list-item">
                            <div>
                            {renderSchoolTitle(education)}
                            {renderEducationData(education)}
                            </div>
                        </li>
                    )
                })}
                </ul>
            </div>
            <div className="preview-section">
                <h3 className="underline-1px">Experience</h3>
                <ul className="preview-list">
                {data.experience.map((experience) => {
                    return (
                        <li className="preview-list-item">
                            <div>
                            {renderExperienceCompany(experience)}
                            {renderExperienceData(experience)}
                            <p>{experience.tasks}</p>
                            </div>
                        </li>
                    )
                })} </ul>
            </div>
            </div>
            </div>
        </div>
    )
}
export default Preview;