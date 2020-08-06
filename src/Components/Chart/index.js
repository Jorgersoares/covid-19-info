/* eslint-disable react/prop-types */
import React from 'react';
import { Pie } from 'react-chartjs-2';

//Material ui
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    chartPaper: {
        width: '100%',
    }
});

export default function Chart(props) {
    const classes = useStyles();

    const configObj = {
        dataPie: {
            labels: [`Casos confirmados ${props.countrie.TotalConfirmed}`,
            `Curados ${props.countrie.TotalRecovered}`,
            `Mortes ${props.countrie.TotalDeaths}`
            ],
            datasets: [
                {
                    data: [props.countrie.TotalConfirmed, props.countrie.TotalRecovered, props.countrie.TotalDeaths],
                    backgroundColor: [
                        '#F7464A',
                        '#46BFBD',
                        '#FDB45C',
                    ],
                    hoverBackgroundColor: [
                        '#FF5A5E',
                        '#5AD3D1',
                        '#FFC870',
                    ]
                }
            ]
        }
    };

    if (JSON.stringify(props.countrie) === '{}') {
        return (
            <React.Fragment>
                <Alert severity="info">Escolha um país para ver o gráfico do número de casos</Alert>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Paper elevation={3} className={classes.chartPaper}>
                <Alert severity="success">Visualizando casos em {props.countrie.Country} </Alert>
                <Pie
                    data={configObj.dataPie} options={{
                        responsive: true, tooltips: {
                            enabled: false
                        }
                    }}
                />
            </Paper>
        </React.Fragment>
    );
}