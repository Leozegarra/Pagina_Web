import React from 'react';
import {useNavigate} from 'react-router-dom';

const ItemList = () =>{

    const navigate = useNavigate();
    const items = [
        {id:1, name: 'Producto 1'},
        {id:2, name: 'Producto 2'},
        {id:3, name: 'Producto 3'},
        {id:4, name: 'Producto 4'},
    ];
    const manejaClick = (id) => {
        navigate(`/items/${id}`);
    }


    return (
        <div>
            <h2>Lista de Productos </h2>
            <ul>
                {items.map( (item) =>{
                    return <li key={item.id}
                               onClick={ () => manejaClick(item.id)}
                               style= { {cursor: 'pointer', textDecoration: 'underline', color:'green'}} 
                           >
                        {item.name}
                    </li>
                })}
            </ul>
        </div>
    )
}

export default ItemList;