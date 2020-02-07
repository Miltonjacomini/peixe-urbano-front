import React, { useState, useEffect, useContext} from 'react';
import api from '../../../services/api';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

import DialogBuyOptionContext from './DialogBuyOptionContext';
import '../styles.css';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

const DialogBuyOption = ({ deal }) => {

    const { openDialog, setOpenDialog } = useContext(DialogBuyOptionContext);
    const [buyOptions, setBuyOptions] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        console.log('entrei no dialog');
        async function loadBuyOptions() {
          const response = await api.get('/buy-options');
    
          setBuyOptions(response.data);
        }
  
        loadBuyOptions();
      }, [])

    const handleClickClose = () => {
        setOpenDialog(false);
    }

    async function addOption(buyOption) {

        const response = await api.post(`/deal/${deal.id}/option/${buyOption.id}`);
        console.log(response);
        
        setBuyOptions(buyOptions.filter(buyOp => buyOp.id !== buyOption.id));
    }

    return (
        <Dialog open={openDialog} onClose={handleClickClose} maxWidth="md" aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Adicione as opções de ofertas </DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Sale Price</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {buyOptions.map(buyOption => (
                                <TableRow key={buyOption.id}>
                                    <TableCell align="left">{buyOption.title}</TableCell>
                                    <TableCell align="left">{buyOption.salePrice}</TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary" aria-label="Add offers to shopping cart" 
                                            onClick={() => addOption(buyOption)}>
                                            <AddIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClickClose} color="primary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogBuyOption;