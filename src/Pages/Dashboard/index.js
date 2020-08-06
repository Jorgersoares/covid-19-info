import React, { useState, useEffect } from 'react';

//Material ui
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

//Custom components
import Chart from '../../Components/Chart';
import Top5Countries from '../../Components/Top5Countries';
import ChartModal from '../../Components/ChartModal';

//Icons
import { FaReact } from 'react-icons/fa';

//Service
import ApiService from '../../Services';

const useStyles = makeStyles({
    title: {
        margin: 'auto auto'
    },
    appBarColor: {
        backgroundColor: '#1b262c',
        color: '#fff'
    },
    top_main_section: {
        marginTop: '60px',
        marginBottom: '100px',
        height: '35vh'
    },
    chartContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectContent: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    countryTop5: {
        backgroundColor: '#0f4c81',
        width: '100%',
        height: '49px',
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFF'
    },
    countryTop5Cards: {
        marginTop: '20px'
    },
    footer: {
        backgroundColor: '#1b262c',
        width: '100%',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '100px',
        color: '#fff'
    },
    react: {
        marginLeft: '5px',
        color: '#61dbfb'
    }
});

export default function DashBoard() {
    const classes = useStyles();

    const [countries, setCountries] = useState([]);

    const [countrieSelected, setCountrieSelected] = useState({});

    const [open, setOpen] = useState(false);

    const [modalCountry, setModalCountry] = useState({});

    useEffect(() => {
        async function fetchData() {
            await ApiService.GetCountries().then(response => {
                const { Countries } = response.data;
                const brazil = Countries.find(item => item.Country === 'Brazil');
                setCountrieSelected(brazil);
                setCountries(Countries);
            }).catch(err => {
                alert('Erro ao buscar dados no servidor');
            });
        }
        fetchData();
    }, []);

    function handleSelectCountry(event, value, reason) {
        console.log(value);
        switch (reason) {
            case 'select-option':
                var country = countries.find(countrie => countrie.Country === value.Country);
                if (!country)
                    return alert('Erro ao buscar dados desse país, tente novamente');
                setCountrieSelected(country);
                break;

            case 'clear':
                setCountrieSelected({});
                break;

            default:
                break;
        }
    }

    function handleButtonCountryCard(country) {
        const country_target = countries.find(countrie => countrie.Country === country);
        if (!country)
            return alert('Erro ao buscar dados desse país, tente novamente');
        setModalCountry(country_target);
        setOpen(true);
    }

    function handleCloseModal() {
        setOpen(false);
    }

    return (
        <div>
            <nav>
                <AppBar position="static" className={classes.appBarColor}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Covid-19 Info
						</Typography>
                    </Toolbar>
                </AppBar>
            </nav>

            <main>
                <Container fixed>
                    <Grid container className={classes.top_main_section}>

                        <Grid item lg={6} xs={12} className={classes.chartContent}>
                            <Chart countrie={countrieSelected} />
                        </Grid>

                        <Grid item lg={6} xs={12} className={classes.selectContent}>
                            <Autocomplete
                                id="country-select-demo"
                                freeSolo
                                style={{ width: '80%' }}
                                options={countries}
                                getOptionLabel={(option) => option.Country}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Pesquise e escolha um país"
                                        variant="outlined"
                                    />
                                )}
                                onChange={handleSelectCountry}
                            />
                        </Grid>

                    </Grid>

                    <Grid container>
                        <Grid item lg={12} className={classes.countryTop5}>
                            <Typography variant="h6">
                                Top 5 de países com mais casos
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container className={classes.countryTop5Cards}>
                        <Grid item xs={12}>
                            <Top5Countries countries={countries} function={handleButtonCountryCard} />
                        </Grid>
                    </Grid>

                    <ChartModal open={open} countrie={modalCountry} close={handleCloseModal} />

                </Container>
            </main>

            <footer>
                <div
                    className={classes.footer}>Made with
                    <span className={classes.react}>
                        <a href="https://pt-br.reactjs.org/" target="_blank" rel="noopener noreferrer">
                            <FaReact />
                        </a>
                    </span>
                </div>
            </footer>
        </div>
    );
}