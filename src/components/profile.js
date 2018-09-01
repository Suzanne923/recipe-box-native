import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import Dimensions from 'Dimensions';
import * as actions from '../actions';
import screens from '../screens';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontText from './font-text';

class Profile extends React.Component {
  render() {
    const { navigate, email } = this.props;

    return (
      <View style={styles.container}>
        <View style={style=styles.titleBar}>
          <FontAwesome style={styles.icon} name="user-circle" size={70} color="white" />
          <Text style={styles.title}>PROFILE</Text>
        </View>
        <ScrollView style={styles.profileInfo}>
          <View style={styles.profileItem}>
            <Text style={[styles.text, { color: "#a92b00"}]}>Email:</Text>
            <FontText style={styles.text}>{email}</FontText>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({ email: state.auth.email });

export default connect(mapStateToProps, actions)(Profile);

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleBar: {
    paddingTop: 30,
    paddingBottom: 10,
    backgroundColor: "#c14130",
    width: DEVICE_WIDTH,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontFamily: "OpenSans-Bold",
    color: "white",
    textAlign: "center",
    marginTop: 30,
  },
  profileInfo: {
    backgroundColor: "white"
  },
  profileItem: {
    flexDirection: "column",
    padding: 11,
    paddingTop: 14
  },
  text: {
    width: DEVICE_WIDTH,
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    color: "#333"
  }
});
