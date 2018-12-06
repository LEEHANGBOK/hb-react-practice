import React, {Component} from 'react';
import { StyleSheet, PanResponder, View, Text } from 'react-native';

const CIRCLE_SIZE = 40;
const CIRCLE_COLOR = 'blue';
const CIRCLE_HIGHLIGHT_COLOR = 'green';

class PanResponderExample extends Component {

    _panResponder = {};
    _previousLeft = 0;
    _previousTop = 0;
    _circleStyles = {};
    circle = null;

    constructor(props){
        super(props);
        this.state = {
            numberActiveTouches: 0,
            moveX: 0,
            moveY: 0,
            x0: 0,
            y0: 0,
            dx: 0,
            dy: 0,
            vx: 0,
            vy: 0
        };
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => { return true },
            onMoveShouldSetPanResponder: (event, gestureState) => { return true },
            onPanResponderGrant: (event, gestureState) => { this._highlight() },
            onPanResponderMove: (event, gestureState) => {
                this.setState({
                    stateID: gestureState.stateID,
                    moveX: gestureState.moveX,
                    moveY: gestureState.moveY,
                    x0: gestureState.x0,
                    y0: gestureState.y0,
                    dx: gestureState.dx,
                    dy: gestureState.dy,
                    vx: gestureState.vx,
                    vy: gestureState.vy,
                    numberActiveTouches: gestureState.numberActiveTouches
                });
                this._circleStyles.style.left = this._previousLeft + gestureState.dx;
                this._circleStyles.style.top = this._previousTop + gestureState.dy;
                this._updatePosition();
            },
            onPanResponderRelease: (event, gestureState) => {
                this._unHighlight();
                this._previousLeft += gestureState.dx;
                this._previousTop += gestureState.dy;
            },
            onPanResponderTerminate: (event, gestureState) => {
                this._unHighlight();
                this._previousLeft += gestureState.dx;
                this._previousTop += gestureState.dy;
            },
        });
        this._previousLeft = 50;
        this._previousTop = 50;
        this._circleStyles = {
            style: { left: this._previousLeft, top: this._previousTop }
        };
    }

    _highlight = () => {
        this.circle &&
            this.circle.setNativeProps({
                style: { backgroundColor: CIRCLE_HIGHLIGHT_COLOR}
            });
    };

    _unHighlight = () => {
        this.circle &&
            this.circle.setNativeProps({
                style: { backgroundColor: CIRCLE_COLOR}
            });
    };

    _updatePosition = () => {
        this.circle &&
            this.circle.setNativeProps(this._circleStyles)
    };

    componentDidMount() {
        this._updatePosition();
    }

    render() {
        return (
            <View>
                <View
                ref={circle => {this.circle = circle;}}
                style={styles.circle}
                {...this._panResponder.panHandlers}/>
                <Text>
                    {this.state.numberActiveTouches} touches,
                    dx: {this.state.dx},
                    dy: {this.state.dy},
                    vx: {this.state.vx},
                    vy: {this.state.vy}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE/2,
        backgroundColor: CIRCLE_COLOR,
        position: "absolute",
        left: 50,
        top: 50
    },
    container: { flex: 1, paddingTop: 64}
});

export default PanResponderExample;