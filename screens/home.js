import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, FlatList } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { getWeatherReport } from '../services/api';
import { Button, Card } from 'react-native-elements';
import WeatherCard from '../components/weatherCard';
import { LogBox } from 'react-native';
const Home = () => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    let [loader, setLoader] = useState(false);
    const [location, setLocation] = useState({});
    const [address, setAddress] = useState('');
    const [WeatherData, setWeatherData] = useState([]);
    const [err,setErr] = useState(false);
    useEffect(() => {
        getLocation();
    }, [])
    const getLocation = async () => {
        Geolocation.getCurrentPosition(async (info) => {
            setErr(false)
            if (info) {
                setLoader(true)
                const { latitude, longitude } = info.coords;
                await setLocation(info.coords);
                getFormattedAddress(info.coords);
                let WeatherData = await getWeatherReport(info.coords);
                // console.log(WeatherData)
                setWeatherData(WeatherData)
                setLoader(false)

            }
        }, err => {
            console.log('err')
            setErr(true);
        });

    };
    const getFormattedAddress = (location) => {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.latitude + ',' + location.longitude + '&key=' + {PUT_YOUR_API_KEY})
            .then((response) => response.json())
            .then((responseJson) => {
                setAddress(responseJson.results[0]);
                // console.log(responseJson.results[0])
            })
    }
    return (
        <View>
            {loader && <Image style={styles.image} source={require('../assets/226-splashy-loader.gif')} />}
            {!err && !loader && <View>   
            <Card containerStyle={styles.currentCard}>
                <Card.Title style={{color:'white',fontSize:18}}>Today' Weather</Card.Title>
                <Card.Divider></Card.Divider>
                <View>
                    {address != '' && !loader && <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.tempText}>{WeatherData.current.temp}&deg;c</Text>
                            {/* <Text>feels like  - {WeatherData.current.feels_like}&deg;c</Text> */}
                            <View style={styles.weather}>
                                <Image style={{ height: 100, width: 100 }} source={{ uri: `https://openweathermap.org/img/w/${WeatherData.current.weather[0].icon}.png` }} ></Image>
                                <Text style={{color:'white',top:'-10%'}}>{WeatherData.current.weather[0].main}({WeatherData.current.weather[0].description})</Text>
                            </View>
                        </View>

                        <Text style={styles.currentCity}>{address.formatted_address} </Text>

                    </View>
                    }
                </View>
            </Card>
            <WeatherCard WeatherData={WeatherData.daily} />
            </View> }
            {err &&
                <View>
                    <Text style={styles.errText}>Something went wrong</Text>
                    <Button
                        containerStyle={{width:'40%',marginLeft:'30%'}}
                        title="RETRY"
                        type="outline"
                        onPress={() =>getLocation()}
                    />
                </View>}
        </View>
    )
}

const styles = StyleSheet.create({

    image: {
        marginLeft:'-20%'
    },
    currentCity: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '10%',
        color:'white'

    },
    currentCard: {
        borderRadius: 10,
        elevation: 10,
        backgroundColor:'#4BA2EE'
    },
    tempText: {
        marginTop: '5%',
        fontSize: 35,
        flex: 1,
        color:'white'
    },
    weather: {
        marginTop: -20
    },
    errText : {
        fontSize:20,
        textAlign:'center',
        padding:10
    }
});

export default Home;