import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

class PressDemo extends Component {

    state = {
        pressing: false,
        pressColor: "#FF0000"
    };

    _onPressIn = () => {
        this.setState({
            pressing: true,
            pressColor: "#4b91ee"
        });
    };

    _onPressOut = () => {
        this.setState({
            pressing: false,
            pressColor: "#FF0000"
        });
    };

    _onPress = () => {
        this.setState({
            pressing: true,
            pressColor: "#41ff74"
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.touchable}
                onPressIn={this._onPressIn}
                onPressOut={this._onPressOut}
                onPress = {this._onPress}>
                    <View style={[styles.button, {backgroundColor: this.state.pressColor}]}>
                        <Text style={styles.welcome}>
                            {this.state.pressing? "EEK" : "PUSH ME"};
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    touchable: {
        borderRadius: 100
    },
    button: {
        backgroundColor: "#FF0000",
        borderRadius: 100,
        height: 200,
        width: 200,
        justifyContent: "center"
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        color: "#FFFFFF"
    }
});

export default PressDemo;