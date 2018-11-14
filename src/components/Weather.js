import React from 'react';

export default class Weather extends React.Component {
    state = {
        city: '',
        country: '',
        temp: '',
        icon: '',
        latitude: '',
        longitude: '',
        celcius: true
    }

    componentWillMount() {
        this.getWeather();
    }

    getWeather = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const posLat = position.coords.latitude
            const posLon = position.coords.longitude
            this.setState(() => ({
                latitude: posLat,
                longitude: posLon
            }));
            fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${this.state.latitude}&lon=${this.state.longitude}`)
                .then((response) => {
                    return response.json();
                })
                .then((myJson) => {
                    console.log(JSON.stringify(myJson));
                    this.setState(() => ({
                        city: myJson.name,
                        country: myJson.sys.country,
                        temp: myJson.main.temp,
                        icon: myJson.weather[0].icon
                    }))
                })
        })
    }

    handleUnitChange = () => {
        if (this.state.celcius === true) {
            this.setState(() => ({
                temp: (this.state.temp * 1.8) + 32,
                celcius: false
            }))
        } else {
            this.setState(()=> ({
                temp: ( this.state.temp - 32 ) * 5 / 9,
                celcius: true
            }))
        }
    }


// Pass all the li into components of choice and style
    render() {
        return (
            <div>
                <h1>Weather App</h1>
                <ul>
                    <li>City: {this.state.city}</li>
                    <li>County: {this.state.country}</li>
                    <li>Temperature: {this.state.temp}</li>
                    <li><img src={this.state.icon} /></li>
                    <li>Latitude: {this.state.latitude}</li>
                    <li>Longitude: {this.state.longitude}</li>
                </ul>
                <button onClick={this.handleUnitChange}>Temp Change</button>
            </div >
        )
    }
}