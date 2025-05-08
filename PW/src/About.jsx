import React from 'react';
import './About.css';

const numeros = Array.from(  {length: 9} , (_,i) => i + 1);
const About = () => {
    return (
        <section>
            <h1>Acerca de Nosotros ... </h1>
        <p>
        Esto es  un repeticion ( o sea una BIKA ) de una pregunta de la evaluacion 1
        </p>

        <ul>
            { numeros.map( (num) => {
                return <li key={num}>
                    <img src={`/images/00${num}.png`} />
                </li>
            })}
        </ul>


        </section>
    )

}

export default About;