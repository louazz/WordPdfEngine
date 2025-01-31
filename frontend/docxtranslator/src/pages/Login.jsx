
import Nav from "../componenets/Nav.jsx"
import { useNavigate} from "react-router";
import { useState, useEffect , useRef} from 'react'
import axios from "axios";
import { IoDocumentAttach } from "react-icons/io5";

function Login() {
  const myRef = useRef(null)

  const executeScroll = () => myRef.current.scrollIntoView()  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const api = "http://172.17.0.2:5000";
  const submit = () => {
      if (username === null || username.match(/^ *$/) !== null || password === null || password.match(/^ *$/) !== null){
          return;
        } 
      axios.post(api + "/api/login", {
          username: username,
          password: password
      }
      ).then(
          res => {


              if (res.status == 200 || res.status==201 || res.status==201) {
                  localStorage.setItem("userId",  res.data["userId"])
                  localStorage.setItem("token", res.data["token"])
                  navigate("/translate")
              } else {

                  alert("try logging in again, an error has occured")
              }
          }
      ).catch(
          function (error) {
              alert("internal server error")
          }
      )
  }
  useEffect(() => {
      if (localStorage.getItem("token") != undefined) {
          navigate("/browse")
      }
  })
  const handleUsername = (e) => {
      setUsername(e.target.value)
  }
  const handlePassword = (e) => {
      setPassword(e.target.value)
  }

  
  return (
   
    <>
    <div className='container '>
      <br/>
      <br/>
      <Nav scrolls={executeScroll}/>
      <br/>
      <div className='container '>
       <center> <h2>PdfWordEngine is all you need!  <IoDocumentAttach/></h2></center>
        <p>Translate Word and PDF documents to any language and keep the same layout as the original document. We use AI-based tools to translate documents to any language and from any language</p>
        <center><button className='button button-light'>Tutorial</button></center>
      </div>
  
    <br/>
    <div className='container second-color' ref={myRef}>
      <h2>Login</h2>
      <p>Please enter a unique user credientials in order to use the application</p>
      <div className='row'>
        <div className='column'>
          <label>Enter your Username</label>
          <input placeholder='Username' onChange={handleUsername}/>
        </div>
        <div className='column'>
          <label>Enter your Password</label>
          <input placeholder='password'  type="password"  onChange={handlePassword}/>
        </div>
      </div>
      <button className='button button-black ' onClick={submit}>Login</button>

      </div>
    <br/>
      <div className='row'>
        <div className='column'>
          All rights reserved <br/> @PdfWordEngine
        </div>
        <br/>
        <div className='column'>
          This Web application is <br/>responsive and could be used in <br/> mobile devices.
        </div>
        <br/>
        <div className='column'>
          Penglais Road <br/> Aberystwyth <br/>United Kingdom <br/>SY23 3LH
        </div>
      </div>
    </div>
    </>
  )
}

export default Login
