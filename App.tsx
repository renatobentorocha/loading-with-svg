import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Clock, Easing, block, cond, not, set, eq } from "react-native-reanimated";

import Logo from "./Logo";

const {timing, useCode, startClock, clockRunning} = Animated;

const runProgress = (clock: Clock) => {
  const state = { 
    finished: new Animated.Value(0), 
    position: new Animated.Value(0), 
    frameTime: new Animated.Value(0), 
    time: new Animated.Value(0) 
  };

  const config = { 
    toValue: new Animated.Value(1), 
    duration: 2000, 
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    timing(clock, state, config),
    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
      set(config.toValue, not(state.position))
    ]),
    state.position
  ])
  
}

export default function App() {
  const clock = useRef(new Clock()).current;
  const progress = useRef(new Animated.Value(5)).current;

  useCode(() => [startClock(clock), set(progress, runProgress(clock))], []);

  return (
    <View style={styles.container}>
      <Logo progress={progress}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
