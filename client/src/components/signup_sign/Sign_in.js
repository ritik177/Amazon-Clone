import React, { useState, useContext } from "react";
import "./signup.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from "../context/ContextProvider";

const Sign_in = () => {


;

  const {account , setAccount} = useContext(LoginContext);
  
  const history = useNavigate("");

  const [logdata,setData] = useState({
    email:"",
    password:""
  });
  console.log(logdata)


const adddata = (e)=>{
  const {name , value}= e.target;

  setData(()=>{
    return{
      ...logdata,
      [name]:value
    }
  })
}


const senddata = async(e)=>{
  e.preventDefault();
  const { email, password } = logdata;

  try{
  const res = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email, password 
    })
  });

  const data =  await res.json ();
  console.log(data);

  if (res.status === 400 || !data ){
    console.log("invalid details");
    toast.error("Invalid details",{
      position: "top-center"
    })
  }else{
    // console.log("data valid ");
    setAccount(data);
    setData ({...logdata , email:"", password:""});
    toast.success("You are successfully login",{
      position: "top-center"
    })
    
    history("/");
  }
}
catch (error) {
  console.log("login page ka error" + error.message);
}
}


  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <img src="./blacklogoamazon.png" alt="amazonlogo" />
          </div>
          <div className="sign_form">
            <form method="POST">
              <h1>Sign-In</h1>
              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input type="text" 
                onChange={adddata}
                value={logdata.email}
                name="email" id="email"  placeholder="enter your email" />
              </div>
              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input type="password" 
                onChange={adddata}
                value={logdata.password}
                name="password" id="password" placeholder="At least 6 character" />
              </div>
              <button className="signin_btn" onClick={senddata}>Continue</button>
            </form>
            <ToastContainer />
          </div>
          <div className="create_accountinfo">
            <p>New To Amazon</p>
            <button>
            {" "}
            <NavLink to="/register"><button> Create Your Amazon Account</button></NavLink> 
            </button>
          </div>
        </div>
        
      </section>
    </>
  );
};

export default Sign_in;
