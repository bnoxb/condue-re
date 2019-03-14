import React, { Component } from 'react';
import SVG from 'react-inlinesvg';
import '../style.css';
import { Card, CardText, CardBody, Button, Alert } from 'reactstrap';
import { withRouter } from 'react-router-dom';
class PatioCard extends Component {
    constructor(){
        super();

        this.state = {
            day: '',
        }
    }
    // render function
    render(){
        const date = new Date(this.props.weather.time *1000);
        const day = date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        let patioMsg = '';
        if(this.props.weather.temperatureHigh < 60) {
            patioMsg = `Come and warm up inside with us!`;
        } else {
            patioMsg = 'Its a perfect day for Patio!';
        }
    
        // an array of an object with keys: the icon message value: icon image source *note these messages are specific to darksky weather api
        const iconMsgArray = [
            {
                'clear-day': '/assets/amcharts_weather_icons_1.0.0/animated/day.svg',
            },
            {
                'clear-night': '/assets/amcharts_weather_icons_1.0.0/animated/night.svg',
            },
            {
                'rain': '/assets/amcharts_weather_icons_1.0.0/animated/rainy-1.svg',
            },
            {
                'snow': '/assets/amcharts_weather_icons_1.0.0/animated/snowy-1.svg',
            },
            {
                'sleet': '/assets/amcharts_weather_icons_1.0.0/animated/rainy-4.svg',
            },
            {
                'wind': '/assets/amcharts_weather_icons_1.0.0/animated/day.svg',
            },
            {
                'fog': '/assets/amcharts_weather_icons_1.0.0/animated/cloudy.svg',
            },
            {
                'cloudy': '/assets/amcharts_weather_icons_1.0.0/animated/cloudy.svg',
            },
            {
                'partly-cloudy-day': '/assets/amcharts_weather_icons_1.0.0/animated/cloudy-day-1.svg',
            },
            {
                'partly-cloudy-night': '/assets/amcharts_weather_icons_1.0.0/animated/cloudy-night-1.svg',
            }
        ]
        let imgSrc;
        for(let i = 0; i < iconMsgArray.length; i++){
            if(this.props.weather.icon === Object.keys(iconMsgArray[i])[0]){
                imgSrc = Object.values(iconMsgArray[i])[0];
            }
        }
    
        
    
        return(
            <div>
    
                <Card className="card text-center patio-card">
    
                    <CardBody>
                        <h1>{day}</h1>
               
                        <p>{this.props.weather.summary}</p><br/>
    
                    </CardBody>
                        <SVG
                            src={imgSrc}
                            className="svgImage"
                        >
                        </SVG>
                    <CardBody className="patio-card">
                        <CardText>High of: {this.props.weather.temperatureHigh}</CardText>
                        <CardText>Low of: {this.props.weather.temperatureLow}</CardText>
                        <CardText>{patioMsg}</CardText>
                        {this.props.userLogged ? <Button onClick={()=>{
                                                    this.props.setTargetDate(day);
                                                    this.props.history.push('/reservation');
                                                }}>Make Res</Button>
                                                : null }
                        <CardText><span className="darkSkySpan"><a id="darkSkySpan" href="https://darksky.net/poweredby/">Powered By DarkSky</a></span></CardText>

                    </CardBody>
                </Card>   
            </div>
        )
    }
    
}

export default withRouter(PatioCard);