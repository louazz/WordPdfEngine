import Nav from "../componenets/Nav.jsx"
import { useState, useEffect } from 'react'
import { useNavigate} from "react-router";
import fileDownload from 'js-file-download';
import { IoDocumentAttach } from "react-icons/io5";

import axios from "axios";

export default function Browse(){
    const api = "http://172.17.0.2:5000";

    const navigate = useNavigate()
    const [data, setData] = useState([
    ])
    const [res, setRes] = useState(data)
    const [checker, setChecker]= useState(false)
    const del = (id) =>{
        axios.post(
            api + "/api/document/delete",{
                "id": id
            },   {headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }}
        ).then(res =>{
            if (res.status == 200){
             setChecker(false)
            }
        })
    }
    const download =(id, name, target)=>{
        axios.post(
            api + "/api/document/download", {
                "name": name,
                "id": id,
                "target": target,
            },   {headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }}
        ).then(res =>{
            if (res.status== 200 || res.status == 201){
                fileDownload(res.data, name);
            }
                   
            
        })
    }
 
      useEffect(() => {
        if (localStorage.getItem("token") == undefined || localStorage.getItem("token") == null) {
            navigate("/login")
        } else {
            if (checker == false) {
                axios.get(api + "/api/document/find", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                }).then(
                    response => {
                        if (response.status == 200 || response.status == 201) {
                            console.log(response.data.docs)
                            setRes(response.data.docs)
                            setData(response.data.docs)
                            console.log(data)
                            setChecker(true)
                        } else {
                            localStorage.clear()
                            alert("An error has occured, please try to refresh the page")
                        }
                    }
                )
            }
        }
    })
    const handleChange = (e) => {

        if (e.target.value == "") {
            setRes(data)
        } else {
            setRes(data.filter(item => item.name.includes(e.target.value)))
        }

    }
    return (
        <>
        <div className="container">
            <br/>
            <br/>
            <Nav />
            <br/>
            <div className='container '>
       <center> <h2>Welcome to PdfWordEngine <IoDocumentAttach/></h2>
       <p>You can view and delete previously translated Word and PDF documents</p></center>
       </div>
       <div className="container second-color">
        <h2>Browse saved documents</h2>
        <input placeholder="Search for a document" onChange={handleChange}/>
        <div className="cards">
            
                  {res.length == 0? <h4>No document created ...</h4>:res.map(item => (
                    <article className="card">
                    <header>
                    <div className="content">
                   <center> <h5>{item.name}</h5></center>
                   <center> <small>{item.type}</small></center>                    </div>
                    </header>
                
                    <center> <small>{item.id}</small></center>
                   <div className="box">
                    <div className="one">
                    <center>   <small>from: {item.from}</small></center>
                    </div>
                    <div className="one">
                    <center><small >to: {item.to}</small></center>

                    </div>
                   </div>
                    <footer>
                        <div className="box">
                            <div className="one">
                                <button className="button button-light" onClick={()=>{download(item.id, item.name, item.to)}}>Download</button>
                            </div>
                            <div className="one">
                                <button className="button button-light float-right" onClick={()=>{del(item.id)}} > Delete</button>
                            </div>
                        </div>
                    </footer>
                </article>
                ))
            }
           <br/>
           <br/>
           
        </div>
        <br/>

       </div>
        </div>
       
        </>
    )
}