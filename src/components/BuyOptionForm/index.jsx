import React, { useState } from 'react';
import Container from '../Container';
import api from '../../services/api';

import '../../css/Form.css';
import './styles.css';

function BuyOptionForm() {

    const [title, setTitle] = useState('');
    const [normalPrice, setNormalPrice] = useState('');
    const [percentageDiscount, setPercentageDiscount] = useState('');
    const [quantityCupom, setQuantityCupom] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        
        const response = await api.post('/buy-option', {
            title,
            normalPrice,
            percentageDiscount,
            quantityCupom,
            startDate,
            endDate
        });
            
        console.log(response);

        setTitle('');
        setNormalPrice('');
        setPercentageDiscount('');
        setQuantityCupom('');
        setStartDate('');
        setEndDate('');
    }

    return (
        <Container children={(
            <>
                <div className="form-deal-title">
                    <strong>Cadastre a opção de oferta</strong>
                </div>
                <div className="form-deal"> 
                    <form onSubmit={handleSubmit}>

                        <div className="input-group">
                            <div className="input-block">
                                <label htmlFor="title">Title</label>
                                <input id="title" name="title" 
                                    value={title} onChange={e => setTitle(e.target.value)} required/>
                            </div>
                            <div className="input-block">
                                <label htmlFor="quantityCupom">Quantity cupom</label>
                                <input id="quantityCupom" name="quantityCupom" type="number" 
                                    value={quantityCupom} onChange={e => setQuantityCupom(e.target.value)} 
                                    required/>
                            </div>
                        </div>

                        <div className="input-group">
                            <div className="input-block">
                                <label htmlFor="normalPrice">Normal price</label>
                                <input id="normalPrice" type="number" name="normalPrice" 
                                    value={normalPrice} onChange={e => setNormalPrice(e.target.value)} required/>
                            </div>
                            <div className="input-block">
                                <label htmlFor="percentageDiscount">Percentage discount</label>
                                <input id="percentageDiscount" type="number" name="percentageDiscount" value={percentageDiscount} 
                                    onChange={e => setPercentageDiscount(e.target.value)} required/>
                            </div>
                        </div>

                        <div className="input-group">
                            <div className="input-block">
                                <label htmlFor="startDate">Start Date</label>
                                <input id="startDate" type="date" name="startDate" 
                                    value={startDate} onChange={e => setStartDate(e.target.value)} required/>
                            </div>
                            <div className="input-block">
                                <label htmlFor="endDate">End Date</label>
                                <input id="endDate" type="date" name="endDate" 
                                    value={endDate} onChange={e => setEndDate(e.target.value)} required/>
                            </div>
                        </div>
                        <button type="submit">Salvar</button>
                    </form>
                </div>
            </>
        )} />
    );
}

export default BuyOptionForm;