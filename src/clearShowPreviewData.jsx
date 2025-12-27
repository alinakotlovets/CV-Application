import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
function ButtonsClearAddData({setData, cvRef}) {
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

    const downloadPDF = () => {
        const input = cvRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4", true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 10;
            pdf.addImage(
                imgData,
                "PNG",
                imgX,
                imgY,
                imgWidth * ratio,
                imgHeight * ratio
            );
            pdf.save("Cv.pdf");
        });
    };

    return (
        <div className="cv-builder-buttons-box">
            <button onClick={previewData}>Preview data</button>
            <button className="btn-red-white" onClick={clearData}>Clear data</button>
            <button className="btn-white-blue" onClick={downloadPDF}>Download Cv</button>
        </div>
    )
}
export default ButtonsClearAddData;