import React, { useState, useEffect } from 'react';

import Container from './components/Container';
import DealItem from './components/DealItem';
import api from './services/api';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    async function loadDeals() {
      const response = await api.get('/deals');

      setDeals(response.data);
    }

    loadDeals();
  }, []);

  const main = (
    <main>
      <ul>
        { deals ? deals.map(deal => ( <DealItem key={deal._id} deal={deal} />  )) : "" }
      </ul>
    </main>
  );

  return (
    <Container children={main} />
  );
}

export default App;
