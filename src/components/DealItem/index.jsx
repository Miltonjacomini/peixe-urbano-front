import React from 'react';

import './styles.css';

function DealItem({ deal }) {
    return (
        <li className="deal-item">
            <header>
                <div className="user-info">
                    <strong>{deal.title}</strong>
                </div>
            </header>
            <p>{deal.text}</p>
            <a href={`https://github.com/${deal.url}`}>Acessar a oferta</a>
        </li>   
    )
}

export default DealItem;