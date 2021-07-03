import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { getWeatherReport } from '../services/api';
const Home = () => {
    let [loader, setLoader] = useState(false);
    const [location, setLocation] = useState({});
    const [address, setAddress] = useState('');
    const [WeatherData,setWeatherData] = useState([])
    useEffect(() => {
        getLocation();
    }, [])
    const getLocation = async () => {
        Geolocation.getCurrentPosition(async (info) => {
            if (info) {
                const { latitude, longitude } = info.coords;
                await setLocation(info.coords);
                let WeatherData =  await getWeatherReport(info.coords);
                console.log(WeatherData)
                setWeatherData(WeatherData)
                getFormattedAddress(info.coords);
            }
        });

    };
    const getFormattedAddress = (location) => {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.latitude + ',' + location.longitude + '&key=' + 'AIzaSyCdx--GXh-1uSdczvv_4NoVuBqVFb1Kh4s')
        .then((response) => response.json())
        .then((responseJson) => {
            setAddress(responseJson.results[0]);
            // console.log(responseJson.results[0])
         }) 
      }
    return (
        <View>
            {loader ?
                <View>
                    <Image style={styles.image} source={require('../assets/226-splashy-loader.gif')} />
                </View>
                : null}

        </View>
    )
}

const styles = StyleSheet.create({

    image: {
        height: '100%',
        width: '100%',
    }
});

export default Home;