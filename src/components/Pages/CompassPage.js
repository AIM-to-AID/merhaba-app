import { StyleSheet, View, Text, Image, useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';
import Navbar from '../Navbar'
import Requires from '../Requires';
import MyStatusBar from '../MyStatusBar';
import { getNextPrayerTime, getPrayerTimes } from '../../util/prayerTimes';
import { getQibla } from '../../util/qibla';
import { getRotateRadians, getReading, getRotate } from '../../util/compass';
import {C, R, Container, Background, Bold} from "../layout"
import { Magnetometer } from 'expo-sensors';
import { initLocation } from '../../util/location';

const MIN_UPDATE_INTERVAL = 200

function nameDegree(degree) {
  const ns = (degree) => degree <= 90 || degree >= 270 ? "n" : "s"
  const ew = (degree) => degree <= 180 ? "e" : "w"

  const mains = [
    {
      name: "n",
      degree: 0
    },
    {
      name: "e",
      degree: 90
    },
    {
      name: "s",
      degree: 180
    },
    {
      name: "w",
      degree: 270
    }
  ]

  for (const main of mains) {
    if (Math.abs(degree - main.degree) < 25) {
      return main.name
    }
  }

  return (ns(degree) + ew(degree))
}

export default function CompassPage({data, setData}) {
  /* TODO: make this less choppy ( and error resistant)

  // Here is how to make this better
  // integrate accelerometer
  // animations
  // redo the images 🤦
  */

  const [subscription, setSubscription] = useState(null)
  const [reading, setReading] = useState(null)
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();

  useEffect(() => {
    initLocation({data, setData})
  }, [])

  const subscribe = () => {
    setSubscription(
      Magnetometer.addListener((magnetometerData) => {
        const newReading = getReading(magnetometerData)
        const difference = Math.abs(newReading - reading)
        if (difference > 20) {
          setReading(newReading)
        } else if (difference > 5) {
          setReading((newReading + reading) / 2)
        }
      })
    )
  }

  const unsubscribe = () => {
    if (subscription) {
      subscription.remove()
    }
    setSubscription(null)
  }

  useEffect(() => {
    subscribe()
    return () => unsubscribe()
  }, [])

  Magnetometer.setUpdateInterval(MIN_UPDATE_INTERVAL)

  let nextPrayerTime = null
  let qibla = null
  if (data.location) {
    const {latitude, longitude} = data.location.coords
    nextPrayerTime = getNextPrayerTime({latitude, longitude})
    qibla = getQibla({latitude, longitude})
  }

  // beware... magic numbers..
  const compassCenter = {x: windowWidth * 0.5, y: windowHeight * 0.55}
  const northSize = windowWidth * 1.20
  const meccaSize = northSize * 0.44

  const compassStyles = StyleSheet.create({
    mecca: {
      position: "absolute",
      width: meccaSize,
      height: meccaSize,
      left: compassCenter.x - meccaSize / 2,
      top: compassCenter.y - meccaSize / 2,
      transform: [{rotate: getRotate({pointsTo: qibla, reading}) + 90 + "deg"}]
    },
    north: {
      position: "absolute",
      width: northSize,
      height: northSize,
      left: compassCenter.x - northSize / 2,
      top: compassCenter.y - northSize / 2,
      transform: [{rotate: getRotate({pointsTo: 0, reading}) + "deg"}]
    },
    centerInfo: {
      position: "absolute",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: 100,
      height: 100,
      left: compassCenter.x - 50,
      top: compassCenter.y - 50,
    },
  })

  function CompassText({pointsTo, text}) {
    const style = {
      position: "absolute",
      left: compassCenter.x + (northSize * 0.36 + 10) * Math.cos(getRotateRadians({pointsTo, reading})) - 50,
      top: compassCenter.y + (northSize * 0.36 + 10) * Math.sin(getRotateRadians({pointsTo, reading})) - 50,
      width: 100,
      height: 100,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }

    return <View style={style}>
      <Text style={{fontSize: 50, color: "white", fontWeight: "bold"}}>{text}</Text>
    </View>
  }

  return <Container>
    <Background source={require("../../../assets/page-specific/compass/Background.png")}/>
    {
      data.location
      ?
      <>
        <Image style={compassStyles.north} source={require("../../../assets/page-specific/compass/NorthCompassPointer.png")}/>
        <Image style={compassStyles.mecca} source={require("../../../assets/page-specific/compass/MeccaCompassPointer.png")}/>
        <CompassText text={"N"} pointsTo={0}/>
        <CompassText text={"E"} pointsTo={90}/>
        <CompassText text={"S"} pointsTo={180}/>
        <CompassText text={"W"} pointsTo={270}/>
        <CompassText text={"🕋"} pointsTo={qibla}/>
        <View style={compassStyles.centerInfo}>
          <Text style={{fontWeight: "bold", fontSize: 30, color: "black"}}>{nameDegree(qibla).toUpperCase()}</Text>
          <View style={{width: "80%", height: 3, backgroundColor: "black"}}></View>
          <Text style={{fontWeight: "bold", fontSize: 30, color: "black"}}>{Math.round(qibla * 10) / 10}°</Text>
        </View>
        <MyStatusBar backgroundColor={"black"}/>
        <R>
          <View style={{height: 100, flex: 1, flexDirection: "column-reverse"}}>
            <View style={{height: 3, backgroundColor: "white"}}/>
            <Text style={{marginLeft: 5, fontSize: 25, color: "white", fontWeight: "bold"}}>Qibla Compass بوصلة القبلة</Text>
          </View>
          <View style={{width: 40}}/>
          <C style={{paddingLeft: 10, marginTop: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: "white", height: 90}}>
            <Text style={{fontWeight: "bold", fontSize: 20}}>Next prayer time وقت الصلاة</Text>
            <Text style={{fontWeight: "bold", fontSize: 30, marginTop: -3}}>{nextPrayerTime}</Text>
          </C>
        </R>
      </>
      :
      <C style={{alignItems: "center", justifyContent: "center"}}>
        <Bold style={{color: "white"}}>This feature requires location permissions</Bold>
        <Bold style={{color: "white"}}>تتطلب هذه الميزة أذونات الموقع</Bold>
      </C>
    }
    <Navbar setPageId={(pageId) => setData({...data, pageId})} pageId={data.pageId}/>
  </Container>
}
