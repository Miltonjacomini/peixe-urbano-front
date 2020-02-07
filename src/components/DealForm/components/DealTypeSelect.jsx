import React, { useState, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import api from '../../../services/api';

function DealTypeSelect({ onChange }) {

    const [dealTypes, setDealTypes] = useState([]);
    const [type, setType] = useState('');

    useEffect(() => {
      async function loadDealTypes() {
        const response = await api.get('/deal-types');
  
        setDealTypes(response.data);
      }

      loadDealTypes();
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        setType(e.target.value);
        onChange(type);
    };

    return (
        <>
            <InputLabel id="label-select-deal-type">Type</InputLabel>
            <Select
                labelId="label-select-deal-type"
                id="select-deal-type"
                value={type}
                onChange={handleChange}>
                {dealTypes.map(dealType => (
                    <MenuItem key={dealType.name} value={dealType}>{dealType.descricao}</MenuItem>
                ))}
            </Select>
        </>
    );
}

export default DealTypeSelect;