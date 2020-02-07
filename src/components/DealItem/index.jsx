import React, { useState } from 'react';

import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import api from '../../services/api';

import { makeStyles } from '@material-ui/core/styles';
import './styles.css';

const useStyles = makeStyles(theme => ({
    root: {
      width: 500,
    },
    typography: {
      padding: theme.spacing(2),
    },
  }));

function DealItem({ deal }) {

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [placement, setPlacement] = useState();
    
    const classes = useStyles();

    const handleClick = newPlacement => event => {
        setAnchorEl(event.currentTarget);
        setOpen(prev => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    const handleClickAway = () => {
        setOpen(false);
    }

    async function comprar(buyOption) {
        const response = await api.post(`/buy-option/${buyOption.id}/sell`);
        console.log(response);
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <li className="deal-item">
                <header>
                    <div className="user-info">
                        <strong>{deal.title}</strong>
                    </div>
                </header>
                <div>
                    <p>
                        <>{deal.text}</>
                    </p>
                </div>
                <div>
                    <Button onClick={handleClick('bottom-start')}>View Options</Button>
                    <Popper open={open} anchorEl={anchorEl}
                        placement={placement}
                        disablePortal={false} transition>
                        <Paper>
                            <div className={classes.typography}>
                                { deal.buyOptions.length > 0 ? 
                                <Table className={classes.table} aria-label="simple table">
                                    <TableBody>
                                        {deal.buyOptions.map(buyOption => (
                                            <TableRow key={buyOption.id}>
                                                <TableCell align="left">{buyOption.title}</TableCell>
                                                <TableCell align="left">{buyOption.salePrice}</TableCell>
                                                <TableCell align="right">
                                                    <Button color="primary" aria-label="Buying option" 
                                                        disabled={buyOption.quantityCupom <= 0}
                                                        onClick={() => comprar(buyOption)}>
                                                        Comprar
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table> :
                                "Não hà opções de ofertas cadastradas ou válidas para essa oferta" }
                            </div>
                        </Paper>
                    </Popper>
                </div>
            </li>   
        </ClickAwayListener>
    )
}

export default DealItem;