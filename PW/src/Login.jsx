import './Login.css';
import React, { useState, useEffect } from 'react';

function Login() {
  const [inputEmail, setEmail] = useState('');
  const [inputpassword, setpassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene la navegación a la URL del enlace
  };


  return (
    <>
      <header>
        <img src={"./logoTech.jpeg"} alt="Zona Tech" />
      </header>
      <div>
        <div id='main'>
          <form onsubmit={handleSubmit}>
            <fieldset>
              <legend class='legend'>Login</legend>
              <div>
                <label htmlFor="email">Email</label><br />
                <input type="email" placeholder='example@gmail.com' autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  required
                /><br />

                <label htmlFor="Password">Password</label><br />
                <input type="password" placeholder='Password' 
                onChange={(e) => setpassword(e.target.value)}
                  required
                />
                
              </div><br />
              <button>Login</button>

            </fieldset>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
