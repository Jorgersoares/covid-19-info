import React from 'react';
import { getCode } from 'country-list';

//Material ui
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 200,
        transition: 'transform 0.5s',
        willChange: 'transform',
        '&:hover': {
            transform: 'translateY(10px)',
        }
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
});

export default function Top5Countries(props) {
    const classes = useStyles();

    function generateTop5Countries() {
        const { countries } = props;
        const top5arr = [...countries];
        return top5arr.sort((a, b) => (a.TotalConfirmed > b.TotalConfirmed) ? -1 : 1).slice(0, 5);
    }

    return (
        <div>
            <Grid container justify="center" spacing={1}>
                {generateTop5Countries().map(countrie => {
                    return (
                        <Grid item key={countrie.Country}>
                            <Card className={classes.root}>
                                <CardContent className={classes.card}>
                                    <p>{countrie.Country}</p>
                                    <img src={`https://www.countryflags.io/${getCode(countrie.Country)}/flat/64.png`} alt='flag' />
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => props.function(countrie.Country)} id={countrie.Country}>Ver gráfico</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}
