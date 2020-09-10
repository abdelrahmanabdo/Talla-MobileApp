import React from 'react';
import { Text, View, ImageBackground, SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, RectButton, ScrollView } from 'react-native-gesture-handler';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


//Styles
import style from '../assets/styles/CalendarsStyle';
import GeneralStyle from '../assets/styles/GeneralStyle';

const Calendars = props  => {


    /**
     * Calendar arrow
     */
    const Arrow = ({direction}) => {
        return <FastImage source={require('../assets/icons/calendar-arrow.png')}
                          resizeMode={'contain'}
                          style={{width : 20 , height : 20 , transform :[{rotate : direction == 'right' ? '0deg' : '180deg'}]}} />
    }


   return  <View style={[GeneralStyle.container]}>
            <ImageBackground source={require('../assets/images/colored-bg.png')}
                            style={[GeneralStyle.header , {borderBottomLeftRadius : 0 , borderBottomRightRadius : 0}]}>
                <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                    <RectButton onPress={()=>{props.navigation.goBack()}}>
                        <FastImage source={require('../assets/icons/back-white.png')} style={{width : 25 , height : 25}} />
                    </RectButton>
                    <Text style={GeneralStyle.headerText}>
                       Calendar
                    </Text>
                    <View style={{flexDirection : 'row'}}>
                        <BorderlessButton onPress={() => {props.navigation.navigate('notifications')}}>
                            <FastImage source={require('../assets/icons/add-colored.png')}
                                    style={{width : 35,height : 35}} />
                        </BorderlessButton>
                    </View>
                </View>
            </ImageBackground>
            <ScrollView>
                <Calendar
                        markedDates={{
                            '2020-08-16': {customStyles : {container : {padding:20,elevation: 2}}, selected: true, selectedColor: '#D1AD67'},
                            '2020-08-17': {selected: true, selectedColor: '#DE4C69'},
                            '2020-08-18': { dotColor: 'red', activeOpacity: 0},
                            '2020-08-19': {disabled: true, disableTouchEvent: true}
                        }}
                        style={{flex:1}}
                        theme={{
                            backgroundColor: '#012647',
                            calendarBackground: '#012647',
                            textSectionTitleColor: '#b6c1cd',
                            textSectionTitleDisabledColor: '#d9e1e8',
                            selectedDayBackgroundColor: '#00adf5',
                            selectedDayTextColor: '#ffffff',
                            'stylesheet.calendar.header': {
                                week: {
                                  marginTop: 5,
                                  flexDirection: 'row',
                                  justifyContent: 'space-between'
                                }
                            },
                            todayTextColor: '#00adf5',
                            dayTextColor: '#2d4150',
                            textDisabledColor: '#d9e1e8',
                            dotColor: '#00adf5',
                            selectedDotColor: '#ffffff',
                            arrowColor: 'orange',
                            disabledArrowColor: '#d9e1e8',
                            monthTextColor: '#FFF',
                            indicatorColor: '#FFF',
                            textDayFontFamily: 'Roboto',
                            textMonthFontFamily: 'Roboto',
                            textDayHeaderFontFamily: 'Roboto',
                            textDayFontWeight: '300',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '300',
                            textDayFontSize: 16,
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 16
                        }}
                        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                        minDate={'2020-08-01'}

                        // Handler which gets executed on day press. Default = undefined
                        onDayPress={(day) => {
                            alert('selected day', day)
                        }}
                        // Handler which gets executed on day long press. Default = undefined
                        onDayLongPress={(day) => {console.log('selected day', day)}}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        monthFormat={'yyyy MM'}
                        // Handler which gets executed when visible month changes in calendar. Default = undefined
                        onMonthChange={(month) => {console.log('month changed', month)}}
                        // Replace default arrows with custom ones (direction can be 'left' or 'right')
                        renderArrow={(direction) => (<Arrow direction={direction}/>)}
                        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                        onPressArrowLeft={subtractMonth => subtractMonth()}
                        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                        onPressArrowRight={addMonth => addMonth()}
                        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                        disableAllTouchEventsForDisabledDays={true}
                        // Replace default month and year title with custom one. the function receive a date as parameter.
                        renderHeader={(date) => {
                            return <Text style={{marginVertical : 30,color : '#FFF',fontSize : 18}}>
                                Sep 2020
                                </Text>
                        }}
                        // Enable the option to swipe between months. Default = false
                        enableSwipeMonths={true}
                        />
                        <View style={style.grayRow}>
                            <View style={{flex:1,alignItems:'center'  , justifyContent:'center', flexDirection : 'row'}}>
                                <View style={[style.circle , {backgroundColor: '#DE4C69'}]}></View>
                                <Text style={[style.text , {color : '#012647'}]}>
                                  Stylist sessions
                                </Text>
                            </View>
                            <View style={{flex:1,alignItems:'center' , flexDirection : 'row' }}>
                               <View style={[style.circle , {backgroundColor: '#D1AD67'}]}></View>
                               <Text style={[style.text , {color : '#D1AD67'}]}>
                                  Outfit
                               </Text>
                            </View>
                        </View>
                        <SafeAreaView style={style.upcomingContainer}>
                            <FastImage source={require('../assets/icons/calendar-lines.png')}
                                       style={{width : 20,height : 100}} />
                            <View style={{flex:1,flexDirection:'column',marginStart : 5,marginEnd:5}}>
                                <Text style={{color : '#BFBFBF',fontSize : 15 , flex:.2 }}> 
                                    upcoming
                                </Text>
                                <View style={{flexDirection : 'row',flex : 2 ,alignItems:'center',width : '100%'}}>
                                    <FastImage source={require('../assets/icons/small-dot.png')}
                                                style={{width : 19,height : 19}} />
                                    <View style={{flexDirection : 'row',justifyContent:'space-between',marginStart : 10 }}>
                                        <View style={{flex:1}}>
                                            <Text style={style.mettingText}>
                                                Meeting's at Joe's
                                            </Text>
                                            <Text style={style.mettingDate}>
                                                12 Jul 2020
                                            </Text>
                                        </View>
                                        <View style={{flex:1,flexDirection : 'row',justifyContent:'space-between',
                                                        justifyContent:'center',alignItems:'center'}}>
                                            <View style={{padding : 8, borderRadius : 4,backgroundColor: '#012647',}}>
                                                <Text style={{fontSize : 19,color : '#FFF'}}>15:00</Text>
                                            </View>
                                            <BorderlessButton>
                                                <FastImage source={require('../assets/icons/arrow-bg.png')}
                                                           style={{width : 55,height : 55}} />
                                            </BorderlessButton>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </SafeAreaView>
            </ScrollView>
    </View>
}
 
export default Calendars;
