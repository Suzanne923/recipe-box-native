import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions, View, ScrollView, TouchableHighlight, Text, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as actions from '../actions';
import screens from '../screens';

class Profile extends React.Component {
  navigateToRandomRecipe = () => {
    const {
      navigate,
      recipes,
      setRecipe
    } = this.props;

    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    setRecipe(randomRecipe.id);
    navigate(screens.RECIPE);
  }

  handleSignout = () => {
    const { signoutUser, navigate } = this.props;

    Alert.alert('', 'Are you sure you want to sign out?', [
      { text: "Yes", onPress: () => { signoutUser(() => { navigate(screens.SIGNIN); }); } },
      { text: "No", onPress: () => null }
    ]);
  }

  render() {
    const { email } = this.props;
    const ProfileButtonItem = ({ onPress, children }) => (
      <TouchableHighlight
        onPress={onPress}
        underlayColor="#ccc"
        activeOpacity={1}
        style={styles.profileItem}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {children}
        </View>
      </TouchableHighlight>
    );

    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <FontAwesome style={styles.icon} name="user-circle" size={70} color="white" />
          <Text style={styles.title}>PROFILE</Text>
        </View>
        <ScrollView style={styles.profileInfo}>
          <View style={styles.profileItem}>
            <Text style={[styles.text, { color: "#a92b00" }]}>Email:</Text>
            <Text style={styles.text}>{email}</Text>
          </View>
          <ProfileButtonItem onPress={this.navigateToRandomRecipe}>
            <FontAwesome name="random" size={16} color="#a92b00" />
            <Text style={[styles.text, { marginLeft: 5 }]}>Random Recipe</Text>
          </ProfileButtonItem>
          <ProfileButtonItem onPress={this.handleSignout}>
            <FontAwesome name="sign-out" size={16} color="#a92b00" />
            <Text style={[styles.text, { marginLeft: 5 }]}>Sign Out</Text>
          </ProfileButtonItem>
        </ScrollView>
      </View>
    );
  }
}

Profile.propTypes = {
  signoutUser: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  email: PropTypes.string,
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  setRecipe: PropTypes.func.isRequired
};

Profile.defaultProps = { email: '' };

const mapStateToProps = state => ({
  email: state.auth.email,
  recipes: state.recipes.storedRecipes
});

export default connect(mapStateToProps, actions)(Profile);

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: { flex: 1 },
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
    marginTop: 30
  },
  profileInfo: { backgroundColor: "white" },
  profileItem: {
    flexDirection: "column",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  text: {
    width: DEVICE_WIDTH,
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    color: "#333"
  }
});
