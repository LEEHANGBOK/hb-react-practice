import React, {Component} from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground } from 'react-native';
import Forecast from './Forecast';
import OpenWeatherMap from './src/weather/open_weather_map'
import PressDemo from './src/practice/PressDemo'
import PanResponderExample from "./src/practice/PanResponderExample";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          zip: "",
          forecast: null
        }
    }

    _handleTextChange = e => {
      let splited = e.nativeEvent.text.split(',');
      let zip = splited[0];
      let city = splited[1];
      console.log('zip: ' + zip, 'city: ' + city);
      OpenWeatherMap.fetchForecast(zip, city).then(forecast => {
        console.log(forecast);
        this.setState({forecast: forecast});
      });
    };

    render() {
        let content = null;
        if(this.state.forecast != null) {
          content = (<Forecast
            main={this.state.forecast.main}
            description={this.state.forecast.description}
            temp={this.state.forecast.temp}
          />)
        }

        return (
            <View style={styles.container}>
                {/*<ImageBackground source={require('./flowers.png')} style={styles.backdrop} resizeMode="cover">
                    <View style={styles.overlay}>
                        <View style={styles.row}>
                            <Text style={styles.mainText}>
                                Current weather for
                            </Text>
                            <View style={styles.zipContainer}>
                                <TextInput style={[styles.zipCode, styles.mainText]} onSubmitEditing={this._handleTextChange}/>
                            </View>
                        </View>
                        {content}
                    </View>
                </ImageBackground>*/}
                <PanResponderExample/>
            </View>
        );
    }
}
const baseFontSize = 16;
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    backdrop: {
        flex: 1,
        flexDirection: "column"
    },
    row: {
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "flex-start",
        padding: 30
    },
    overlay: {
        paddingTop: 5,
        backgroundColor: "#000000",
        opacity: 0.5,
        flexDirection: "column",
        alignItems: "center"
    },
    zipContainer: {
        height: 50,
        borderBottomColor: "#DDDDDD",
        borderBottomWidth: 1,
        marginLeft: 5,
        marginTop: 3
    },
    zipCode: {
        flex: 1,
        flexBasis: 1,
        width: 100,
        height: baseFontSize
    },
    mainText: {
        fontSize: baseFontSize,
        color: "#FFFFFF"
    }
});

export default App;