import React from 'react';
import { StyleSheet, View, Text,FlatList,Image } from 'react-native';
import { Card } from 'react-native-elements';
import moment from 'moment';
const WeatherCard = ({ WeatherData }) => {
    const renderItems = ({ item }) => {
        return (<Card containerStyle={styles.currentCard}>
            <Card.Title>{moment.unix(item.dt).format("dddd")}</Card.Title>
            <Card.Divider></Card.Divider>
            <View>
               <View>
                    <View style={{ flexDirection : 'row' }}>
                        <Text style={styles.tempText}>{item.temp.day}&deg;c</Text>
                        {/* <Text>feels like  - {WeatherData.current.feels_like}&deg;c</Text> */}
                        <View style={styles.weather}>
                            <Image style={{ height: 100, width: 100 }} source={{ uri: `https://openweathermap.org/img/w/${item.weather[0].icon}.png` }} ></Image>
                            <Text>{item.weather[0].main}({item.weather[0].description})</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Card>
        )
    }

    return (
            <FlatList
                data={WeatherData}
                renderItem={renderItems}
                style={{flex:0,marginBottom:'60%'}}
                keyExtractor={(item, index) => index.toString()}
            />
    )
}
const styles = StyleSheet.create ({
    image: {
        height: '100%',
        width: '100%',
    },
    currentCity : {
        fontSize:15,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:'10%'

    },
    currentCard : {
        borderRadius: 10,
        elevation: 10,
    },
    tempText : {
        marginTop:'5%',
        fontSize:27,
        flex:1
    },
    weather :  {
        marginTop:-20
    }
})

export default WeatherCard;