import React, { useState, useEffect } from 'react';
import Container from '../Container';
import api from '../../services/api';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DialogBuyOption from './components/DialogBuyOption';
import { DialogBuyOptionProvider } from './components/DialogBuyOptionContext';
import DealTypeSelect from './components/DealTypeSelect';

import { makeStyles } from '@material-ui/core/styles';
import '../../css/Form.css';
import './styles.css';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

function DealForm({ onSubmit }) {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [createDate, setCreateDate] = useState(new Date());
    const [publishDate, setPublishDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [type, setType] = useState('');
    const [deals, setDeals] = useState([]);
    const [deal, setDeal] = useState('');

    const classes = useStyles();
   
    useEffect(() => {
        async function loadDeals() {
          const response = await api.get('/deals');
    
          setDeals(response.data);
        }
    
        loadDeals();
    }, []);

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
            
        setDeals([...deals, response.data]);

        console.log(response);

        setTitle('');
        setText('');
        setCreateDate('');
        setPublishDate('');
        setEndDate('');
        setType('');
    }

    const handleClickOpen = deal => {
        console.log('entrei no onClick');
        setDeal(deal);
        setOpenDialog(true);
    }

    return (
        <Container children={(
            <>
                <div className="form-deal"> 
                    <div className="form-deal-title">
                        <strong>Cadastro de oferta</strong>
                    </div>
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

                        <div className="input-block">
                            <DealTypeSelect onChange={setType} />
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
                <TableContainer component={Paper} className="table-deals">
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Text</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Data Publish</TableCell>
                            <TableCell align="center">Data End</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {deals.map(deal => (
                                <TableRow key={deal.id}>
                                    <TableCell align="left">{deal.title}</TableCell>
                                    <TableCell align="left">{deal.text}</TableCell>
                                    <TableCell align="center">{deal.type.descricao}</TableCell>
                                    <TableCell align="center">{deal.publishDate}</TableCell>
                                    <TableCell align="center">{deal.endDate}</TableCell>
                                    <TableCell align="center">
                                        <IconButton color="primary" aria-label="Add offers to shopping cart" onClick={() => handleClickOpen(deal)}>
                                            <AddIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <DialogBuyOptionProvider value={{openDialog: openDialog, setOpenDialog: setOpenDialog}}>
                    <DialogBuyOption deal={deal} />
                </DialogBuyOptionProvider>
            </>
        )} />
    );
}

export default DealForm;