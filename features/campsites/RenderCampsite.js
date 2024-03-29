import { useRef } from "react";
import { Text, View, StyleSheet, PanResponder, Alert, Share } from "react-native";
import { Card, Icon } from "react-native-elements";
import { baseUrl } from "../../shared/baseUrl";
import * as Animatable from 'react-native-animatable'
import CampsiteInfoScreen from "../../screens/CampsiteInfoScreen";

const RenderCampsite = (props) => {
    const { campsite } = props;

    const isRightSwipe = ({ dx }) => dx > 200;

    const view = useRef();

    const isLeftSwipe = ({ dx }) => dx < -200;
    const panResponder = PanResponder.create({
        onPanResponderGrant: () => {
            view.current
                .rubberBand(1000)
                .then((endState) => console.log(endState.finished ? 'finished' : 'canceled'))
        },
        onStartShouldSetPanResponder: () => true,
        onPanResponderEnd: (e, gestureState) => {
            console.log(gestureState)
            if (isLeftSwipe(gestureState)) {
                Alert.alert('Add Favorite', 'Are you sure you wish to add ' + campsite.name + ' to favorites?', [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => console.log('Cancel pressed')
                    },
                    {
                        text: 'OK',
                        onPress: () =>
                            props.isFavorite
                                ? console.log('Already set as favorite')
                                : props.markFavorite()
                    }
                ],
                { cancelable: false }
                );
            } else if (isRightSwipe(gestureState)) {
                console.log('Swiped right')
                props.onShowModal()
            }
        }
    });

    const shareCampsite = (title, message, url) => {
        Share.share({
            title,
            message: `${title}: ${message} ${url}`,
            url
        }, {
            dialogTitle: 'Share' + title
        });
    } 

    if (campsite) {
        return (
        <Animatable.View
            ref={view}
            animation='fadeInDownBig'
            duration={2000}
            delay={1000}
            {...panResponder.panHandlers}
        >
            <Card containerStyle={styles.cardContainer}>
                <Card.Image source={{ uri: baseUrl + campsite.image }}>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text style={styles.cardText}>
                            {campsite.name}
                        </Text>
                    </View>
                </Card.Image>
                <Text style={{ margin: 20 }}></Text>
                <View style={styles.cardRow}>
                    <Icon 
                    name={props.isFavorite ? 'heart' : 'heart-o'}
                    onPress={() =>
                        props.isFavorite
                            ? console.log('Already set as favorite')
                            : props.markFavorite()
                    }
                    type="font-awesome"
                    color='#f50'
                    raised
                    reverse 
                    />
                    <Icon 
                        name="share"
                        type="font-awesome"
                        color="#5637DD"
                        raised
                        reverse
                        onPress={() => {
                            shareCampsite(
                                campsite.name,
                                campsite.description,
                                baseUrl + campsite.image
                            )
                        }}
                    />
                </View>
            </Card>
        </Animatable.View>
        )
    }
    return <View />
};

const styles = StyleSheet.create({
    cardContainer: {
        padding: 0,
        margin: 0,
        marginBottom: 20
    },
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardText: {
        textShadowColor: 'rgba(0,0,0,1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 20,
        textAlign:'center',
        color: 'white',
        fontSize: 20
    }
});

export default RenderCampsite;