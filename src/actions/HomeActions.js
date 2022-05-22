import React, {useEffect, useState} from 'react';
import { ComposableMap, Geographies, Geography} from 'react-simple-maps';
import axios from 'axios';
import { Apikey, BASE_URL } from '../service/URL';
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import {
    AppBar,
    Button,
    Container,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem, Paper,
    Select,
    Toolbar,
    Typography
} from "@mui/material";

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

function HomeActions({ setTooltipContent }) {
    const [ isDataCharged, setIsDataCharged ] = useState(false)
    const [ cases, setCases ] = useState([]);
    const [ variant, setVariant ] = useState('Omicron')
    const [ date, setDate ] = useState([])
    const [ dateSelected, setDateSelected] = useState('11/05/2020')
    const [ dateValue, setDateValue ] = useState(0)
    const [ habilitateButton, setHabilitateButton ] = useState(true)

    const onChange = (e) => {
        setVariant(e.target.value)
    }
    function dateSelectedValue(value) {
        setDateValue(value)
        setDateSelected(date[value])
    }


    const getInfoCountry = () => {
        axios.get(`${BASE_URL}`, Apikey).then((resp) => {
            setCases(resp.data)
            dateCorrect();
            setIsDataCharged(true);
        })
            .catch((err) => {
                console.log(err.response);
            })
    };


    function getTotalCases(countryName) {
        const covidDataTemp = cases.filter((country) => country.location === countryName);
        const dadosFiltrados = [... new Set(covidDataTemp)]
        const infoMore = dadosFiltrados.filter((info) => info.date === dateSelected && info.variant === variant)
        return infoMore.reduce((previousValue, currentValue) => previousValue + currentValue.num_sequences_total, "")
    }


    const dateCorrect = () => {
        const arrayDatas = cases.map((res) => res.date)
        let arrayDatasFiltradas = [...new Set(arrayDatas)]
        arrayDatasFiltradas.sort(function(a,b) {
            a = a.split('/').reverse().join('');
            b = b.split('/').reverse().join('');
            return a.localeCompare(b);
        });
        let newArray = []
        for(let i = 0; i <= arrayDatasFiltradas.length; i+=5){
            newArray.push(arrayDatasFiltradas[i])
        }
        setDate(newArray)
        infoButton();
    }

    let arr = date;
    const onClickMap = () => {
        for(let x = dateValue; x <= arr.length; x++){
            (function(x){
                setTimeout(function(){
                    setDateSelected(arr[x]);
                    setDateValue(x)
                }, x * 1500);
            }(x));
        }
    }

    const infoButton = () => {
        setTimeout(function () {
            setHabilitateButton(false)
        }, 2500)
    }


    useEffect(() => {
        getInfoCountry();
    },[isDataCharged]);


    return (
        <Container maxWidth={"lg"}>
            <Paper elevation={4}>
                <AppBar position="static">
                    <Toolbar>
                        <CoronavirusOutlinedIcon fontSize={"large"}></CoronavirusOutlinedIcon>
                        <Typography variant="h4" style={{display: "flex", justifyContent:"center"}}  sx={{ flexGrow: 1 }}>
                            Casos diários de Covid
                        </Typography>
                        <CoronavirusOutlinedIcon fontSize={"large"}></CoronavirusOutlinedIcon>
                    </Toolbar>
                </AppBar>
            </Paper>

            <Paper elevation={4} style={{backgroundImage: "linear-gradient(to right, #d6dae0, #cbd3df, #c1ccdd, #b6c5dc, #abbeda)",
            marginBottom:"10px"}}>
                <div style={{display: "flex",
                    justifyContent:"center",
                    margin: "10px 0",
                }}>

                    <FormControl color={"primary"} sx={{ m: 1, minWidth: 250 }}>
                        <InputLabel><CoronavirusOutlinedIcon fontSize={"small"}></CoronavirusOutlinedIcon> Variante</InputLabel>
                        <Select color={"primary"} onChange={onChange} label={"Variante"}>
                            <FormHelperText>Selecione a variante</FormHelperText>
                            {cases.slice(0,24).map((dados) => {
                                return (
                                    <MenuItem key={dados.id} value={dados.variant}>
                                        {dados.variant}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                <Button variant={"outlined"}
                        sx={{m: 1, minWidth: 250}}
                        disabled={habilitateButton}
                        onClick={() => onClickMap()}>
                    ▶ Iniciar timelapse
                </Button>
            </div>

            <div style={{display: "flex", justifyContent: "center", marginTop: "25px"}}>
                <h2 style={{margin: "0 10%"}}>Data: {dateSelected}</h2>
                <h2 style={{margin: "0 10%"}}>Variante: {variant}</h2>
            </div>

            <div style={{width: "90%",
                marginLeft: "5%",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column"}}>
                <div style={{ display: "flex", justifyContent: "space-between"}}>
                    {date.map((dados, index) => {
                        return <p style={{padding: "2% 0", fontSize: "18px", fontWeight:"bold"}} key={index}>{dados}</p>
                    })}
                </div>
                <input
                    style={{marginBottom:"30px"}}
                    min='1'
                    max='8'
                    value={dateValue}
                    onChange={(e) => dateSelectedValue(e.target.value)}
                    type="range"
                />
            </div>
            </Paper>
            <div style={{backgroundImage: "linear-gradient(to right, #9296be, #7b7fba, #6468b5, #4d51af, #343aa8)"}} className="mx-1">
                <ComposableMap data-tip="" projectionConfig={{ scale: 180 }}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const infoGeo = geo.properties.NAME.slice(0,13);
                                const resultado = getTotalCases(infoGeo)
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onMouseEnter={() => {
                                            let data = [];
                                            const totalCases = getTotalCases(infoGeo)
                                            cases.forEach((info) => {
                                                if (info.location === infoGeo) {
                                                    data = info;
                                                }
                                            })
                                            setTooltipContent(`${data.location || infoGeo} - Total de casos: ${totalCases}`);
                                        }}
                                        onMouseLeave={() => setTooltipContent("")}
                                        fill={ resultado <= 4 ? '#dbbbb8' : resultado <= 200 ? '#e67a70' : resultado <= 1000 ? '#cf2e1f' : '#8f1106'}
                                        stroke={"black"}
                                        style={{hover: {
                                                fill: "#1B89AE",
                                                outline: "none"
                                            }}}
                                    />
                                )})
                        }
                    </Geographies>
                </ComposableMap>
            </div>
        </Container>
    );
};
export default HomeActions;