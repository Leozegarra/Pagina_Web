import React from 'react';
import { useParams } from 'react-router-dom';

const ItemDetails = () => {
    {/* recibir parametros */}
    const {id} = useParams();

    return(
        <div>
            <h2>Detalle del Pokemon</h2>
            <p>ID del Recibido {id}</p>
            <em>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
            Modi tempore, sit, consequuntur quibusdam eos veritatis quae ut rem dolorum adipisci excepturi, odio quo. 
            Error at natus reiciendis debitis corporis unde.</em>
            
            <div>
                <img src="/images/images.jpg" alt="pokemon" />
            </div>
        </div>
    )

}

export default ItemDetails;