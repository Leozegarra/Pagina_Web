import React, { useState } from 'react';

const SearchBar = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = data.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ margin: '10px 0' }}>
            <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    padding: '8px',
                    width: '60%',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                }}
            />
            {searchTerm && (
                <ul style={{ marginTop: '5px', listStyleType: 'none', padding: 0 }}>
                    {filteredData.map((item, index) => (
                        <li key={index} style={{ padding: '4px 0' }}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
