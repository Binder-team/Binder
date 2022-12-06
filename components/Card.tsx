
// import React, { Component } from 'react';
// import { View, Animated, Image, Text, StyleSheet, Dimensions, PanResponder, } from 'react-native';

// export default class Card extends Component {

//   constructor(props: any) {
//     super(props);
//     this.state = {
//       pan: new Animated.ValueXY()
//     };
//   }

//   componentWillMount() {
//     this._panResponder = PanResponder.create({
//       onMoveShouldSetResponderCapture: () => true,
//       onMoveShouldSetPanResponderCapture: () => true,

//       // Set initial values to current state
//       onPanResponderGrant: (e, gestureState) => {
//         this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
//       },

//       // Set Delta values to the states pan position when object is dragged/panned
//       onPanResponderMove: Animated.event([
//         null, {dx: this.state.pan.x, dy: this.state.pan.y},
//       ]),

//       onPanResponderRelease: (e, {vx, vy}) => {
//         console.log(`panx: ${this.state.pan.x._value} pany: ${this.state.pan.y._value}`)

//         if (this.state.pan.x._value < -150) {
//           Animated.decay(this.state.pan, {
//             velocity: {x: -8, y: vy},
//             deceleration: 0.98
//           }).start()
//           this.props.onSwipe(this.props.index)
//         } else if (this.state.pan.x._value > 150) {
//           Animated.decay(this.state.pan, {
//             velocity: {x: 8, y: vy},
//             deceleration: 0.98
//           }).start()
//           this.props.onSwipe(this.props.index)
//         } else if (this.state.pan.y._value < -150) {
//           Animated.decay(this.state.pan, {
//             velocity: {x: vx, y: -9},
//             deceleration: 0.98
//           }).start()
//           this.props.onSwipe(this.props.index)
//         } else if (this.state.pan.y._value > 150) {
//           Animated.decay(this.state.pan, {
//             velocity: {x: vx, y: 9},
//             deceleration: 0.98
//           }).start()
//           this.props.onSwipe(this.props.index)
//         } else {
//           Animated.spring(this.state.pan, {
//             toValue: 0,
//           }).start()
//         }
//       }
//     });
//   }

//   componentWillUnmount() {
//     this.state.pan.x.removeAllListeners();
//     this.state.pan.y.removeAllListeners();
//   }

//   getStyleMainCard() {
//     // Destructure the value of pan from the state
//     let { pan } = this.state;

//     return [
//       Styles.mainCard,
//       { position: 'absolute' },
//       { left: -175 },
//       { top: -250 },
//       { transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate: this.state.pan.x.interpolate({inputRange: [-150, 0, 150], outputRange: ["-20deg", "0deg", "20deg"]}) }] },
//       { opacity: this.state.pan.x.interpolate({inputRange: [-150, 0, 150], outputRange: [0.5, 1, 0.5]}) }
//     ];
//     console.log(Styles.mainCard)
//   }

//   render() {
//     const { name, picture, email } = this.props;

//     return (
//       <Animated.View style={ this.getStyleMainCard() } {...this._panResponder.panHandlers}>
//         <View style={ Styles.card }>
//           <Image source={{uri: picture.large}} style={ Styles.cardImage }/>
//           <View style={ Styles.cardText }>
//             <Text style={ Styles.titleText }>{ name.first } { name.last }</Text>
//             <Text style={ Styles.description }>Description</Text>
//           </View>
//         </View>
//       </Animated.View>
//     );
//   }
// }




// const DIMENSIONS = Dimensions.get('window');

// const styles = [
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF'
//   },
//   cardContainer: {
//     flex: 1,
//     width: DIMENSIONS.width
//   },
//   cardStack: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   card: {
//     height: 500,
//     width: 350,
//     borderWidth: 1,
//     borderColor: 'lightgrey',
//     borderRadius: 8,
//     justifyContent: 'center',
//     backgroundColor: '#FFF',
//     overflow: 'hidden'
//   },
//   cardImage: {
//     flex: 1
//   },
//   cardText: {
//     margin: 20
//   },
//   titleText: {
//     textAlign: 'left',
//     fontSize: 20,
//     backgroundColor: 'transparent'
//   },
//   description: {
//     textAlign: 'left',
//     fontSize: 15,
//     color: 'grey',
//     backgroundColor: 'transparent'
//   }
// ];
