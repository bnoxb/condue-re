import React, { Component } from 'react';
import PatioCard from './PatioCard/PatioCard';
import Whirligig from 'react-whirligig';

class PatioContainer extends Component {
    constructor(){
        super()

        this.state = {
            weather: [],
            currentWeather: {},
            isLoaded: false,
        }
    }

    componentDidMount( ){
        this.getWeather();
    }

    getWeather = async () => {
        try{
            const weatherResponse = await fetch(process.env.REACT_APP_DARKSKY + process.env.REACT_APP_DARKSKYKEY + `/39.693967,-104.911074?exclude=minutely,hourly`);

            if(!weatherResponse.ok){
                throw Error(weatherResponse.statusText);
            }

            const parsedWeather = await weatherResponse.json();

            this.setState({
                weather: parsedWeather.daily.data,
                currentWeather: parsedWeather.currently,
                isLoaded: true,
            })
        }catch(err){
            console.log(err);
        }
    }

    render(){
        const weatherList = this.state.weather.map((weather, i) => {
            return <PatioCard key={i} weather={weather} setTargetDate={this.props.setTargetDate} />     
                
        });
        let whirligig;
        const next = () => whirligig.next()
        const prev = () => whirligig.prev()
        return(
            <div className="patio-div patioParallax">
                <h1>Plan your next patio day!</h1>
                <button onClick={prev}>Prev</button>
                <button onClick={next}>Next</button>
                <Whirligig
                    visibleSlides={4}
                    gutter="1em"
                    ref={(_whirligigInstance) => { whirligig = _whirligigInstance}}
                >
                    {this.state.isLoaded ? weatherList : "Loading For this week....."}
                </Whirligig>
                <div className="sub-content-patio"></div>
            </div>
        )
    }
}

export default PatioContainer;