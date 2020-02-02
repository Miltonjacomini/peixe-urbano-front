import React, { useState } from 'react';
import Container from '../Container';
import api from '../../services/api';

import '../../css/Form.css';
import './styles.css';

function DealForm({ onSubmit }) {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [createDate, setCreateDate] = useState(new Date());
    const [publishDate, setPublishDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [type, setType] = useState('LOC');

    async function handleSubmit(e) {
        e.preventDefault();
        
        const response = await api.post('/deal', {
            title,
            text,
            createDate,
            publishDate,
            endDate,
            type
        });
            
        console.log(response);

        setTitle('');
        setText('');
        setCreateDate('');
        setPublishDate('');
        setEndDate('');
        setType('');
    }

    return (
        <Container children={(
            <>
                <div className="form-deal-title">
                    <strong>Cadastro de oferta</strong>
                </div>
                <div className="form-deal"> 
                    <form onSubmit={handleSubmit}>
                        <div className="input-block">
                            <label htmlFor="title">Title</label>
                            <input id="title" name="title" 
                                value={title} onChange={e => setTitle(e.target.value)} required/>
                        </div>
                        
                        <div className="input-block">
                            <label htmlFor="text">Text</label>
                            <textarea id="text" name="text" value={text}
                                onChange={e => setText(e.target.value)} required/>
                        </div>

                        <div className="input-group">
                            <div className="input-block">
                                <label htmlFor="publishDate">Publish Date</label>
                                <input id="publishDate" type="date" name="publishDate" 
                                    value={publishDate} onChange={e => setPublishDate(e.target.value)}
                                    required/>
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

export default DealForm;