import Nav from "../componenets/Nav.jsx"
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router";
import axios from "axios";
import fileDownload from 'js-file-download';
import { IoDocumentAttach } from "react-icons/io5";

export default function Translate() {
    const navigate = useNavigate();
    const api = "http://172.17.0.2:5000";
    const [src, setSrc] = useState("")
    const [target, setTarget] = useState("")
    const [file, setFile] = useState(null)
    const [download, setDownload]= useState(null)
    const [uploading, setUploading]= useState(false)
    const handleSrc = (e) => {
        setSrc(e.target.value)
    }
    const handleTarget = (e) => {
        setTarget(e.target.value)
    }
    useEffect(() => {
        if (localStorage.getItem("token") == undefined) {
            navigate("/")
        }
    })
    const handleUpload = async (e) => {
        var splitted = e.target.files[0].name.split(".")
        console.log(splitted[splitted.length - 1])
        if (splitted[splitted.length - 1] !== "docx" && splitted[splitted.length - 1] !== "pdf") {
            alert("Please upload a pdf or docx files")
            return;
        }

        const file = e.target.files[0];
        const filename = file.name.replace(/ /g, '_');


        const formData = new FormData();
        formData.append('file', file, filename);
        formData.append('src', src);
        formData.append('target', target);

    
        setUploading(true)

        await axios
            .post(
                api + "/api/document",
                formData,
                {
                    responseType: "arraybuffer",
                   
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`

                    },
                }
            )
            .then((response) => {
                if (response.status == 200 || response.status == 201) {
                    alert("file uploaded")
                    setFile(filename)
                    setDownload(response.data)
                    setUploading(false)
                }
            })
            
    };
    const Download = ()=>{
        fileDownload(download, file);

    }
    return (
        <>
            <div className="container">
                <br />
                <br />
                <Nav />
                <br />
                <div className='container '>
                    <center> <h2>Welcome to PdfWordEngine <IoDocumentAttach/></h2>
                        <p>You can upload docx or pdf file and get an accurate translation using our AI powered tools</p></center>
                </div>
                <br/>
                {uploading==true? <div className="container second-color">We are translating your document</div>: <></>}
                <br />
                <div className="container second-color">
                    <h2>Upload a File</h2>
                    <div className="row">
                        <div className="column">
                            <label>Source Language</label>
                            <input placeholder="Source Language e.g. english" onChange={handleSrc} />
                        </div>
                        <div className="column">
                            <label>Target Language</label>
                            <input placeholder="Target Language e.g. french" onChange={handleTarget} />
                        </div>
                    </div>
                    <div className="box">
                        <div className="one">
                            {file?<label><small>{file}</small></label>:<></>}
                            <label for="files" class="button button-black float-right file-label">Upload</label>

                            <input className="hide" id="files" type="file" onChange={handleUpload} />
                           {download==null?<button className="button button-black button-clear" onClick={Download} disabled>Download</button>:<button className="button button-black button-clear" onClick={Download}>Download</button>} 

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}