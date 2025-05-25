import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Recover() {
  const [inputEmail, setEmail] = useState();
  const [inputPassword, setPassword] = useState();
  const [inputname, setname] = useState();
  const [inputsname, setsname] = useState();


  const handleSubmit = (e) => {
    e.preventDefault();

    const Email = sessionStorage.getItem('useremail');
    const password = sessionStorage.getItem('userpass');
    const name = sessionStorage.getItem('name');
    const sname = sessionStorage.getItem('sname');

    if (inputEmail === Email && inputname === name && inputsname === sname)  {
      // Autenticación exitosa
      sessionStorage.setItem('userpass', window.prompt('Establece tu nueva contraseña: '));
      alert('Cuenta verificada');
    }

  };

  return (
    <>


      <div >
        <div className='main'>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend className='legend'>Recuperar contraseña</legend>
              <div>
                <p>Ingresa los datos de tu cuenta: </p>

                <label htmlFor="username">Nombre</label><br />
                <input className='minput' type='text' value={inputname} placeholder='Nombre de Usuario' autoFocus
                  onChange={(e) => setname(e.target.value)}
                  required
                />
                <input
                  type="text"
                  value={inputsname}
                  placeholder='Apellido'
                  onChange={(e) => setsname(e.target.value)}
                  required
                /> <br />

                <label htmlFor="email">Email</label><br />
                <input
                  type="email"
                  value={inputEmail}
                  placeholder='example@gmail.com'
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  required
                /><br />

              </div><br />
              <button type="submit" className='bbutton sbutton'>Enviar</button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}


export default Recover;
