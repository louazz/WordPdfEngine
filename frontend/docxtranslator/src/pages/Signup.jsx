
import Nav from "../componenets/Nav.jsx"
import { useNavigate} from "react-router";
import { useState, useEffect , useRef} from 'react'
import axios from "axios";
import { IoDocumentAttach } from "react-icons/io5";

function SignUp() {
  const myRef = useRef(null)
  const executeScroll = () => myRef.current.scrollIntoView()  
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const api = "http://172.17.0.2:5000";
  const navigate = useNavigate();
  function submit() {
      console.log(username)
      console.log(password)
      if (username === null || username.match(/^ *$/) !== null || password === null || password.match(/^ *$/) !== null){
        return;
      } 
    axios.post(api + '/api/signup', {
      username: username,
      password: password,
      email: email
    }).then(
      res => {
        if (res.status == 201) {
          alert('registration succeeded')
          navigate("/login")
        } else if (res.status== 500){
          alert("Username exists")
        }else {
          alert("an error has occured, please try again")
        }
      }
    ).catch(function (error) {
      alert('Please change the credentials you entered as it might be already taken')
    })
  }
  useEffect(() => {
    if (localStorage.getItem("token") != undefined) {
      navigate("/browse")
    }
  })
   


  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleUsername = (e) => {
    setUsername(e.target.value)
  }
  return (
    <>
    <div className='container '>
      <br/>
      <br/>
      <Nav scrolls={executeScroll}/>
      <br/>
      <div className='container '>
       <center> <h2>PdfWordEngine is all you need! <IoDocumentAttach/></h2></center>
        <p>Translate Word and PDF documents to any language and keep the same layout as the original document. We use AI-based tools to translate documents to any language and from any language</p>
        <center><button className='button button-light'>Tutorial</button></center>
      </div>
  
    <br/>IoDocumentAttach
    <div className='container second-color' ref={myRef}>
      <h2>Sign Up Now!</h2>
      <p>Please enter a unique user credientials in order to use the application</p>
      <div className='row'>
        <div className='column'>
          <label>Enter a Username</label>
          <input placeholder='Username' onChange={handleUsername}/>
        </div>
        <div className='column'>
          <label>Enter your Email</label>
          <input placeholder='email' onChange={handleEmail}/>
        </div>
      </div>
      <div className='column'>
        <label>Enter a Password</label>
        <input placeholder='password' type="password" onChange={handlePassword}/>
      </div>
      <button className='button button-black' onClick={submit}>Sign Up</button>
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

export default SignUp
