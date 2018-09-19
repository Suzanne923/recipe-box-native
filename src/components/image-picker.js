import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity, Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
// eslint-disable-next-line
import ImageResizer from 'react-native-image-resizer';
import * as actions from '../actions';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      format: 'JPEG',
      imageSource: 'http://ec2-54-165-226-10.compute-1.amazonaws.com:8080/public/placeholder.png'
    };
  }

  options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

  resizeImage = async ({ data, maxHeight, maxWidth, format, rotation }) => {
    const resizedImageUri = await ImageResizer.createResizedImage(
      `data:image/jpeg;base64,${data}`,
      maxHeight,
      maxWidth,
      format,
      100,
      rotation
    );

    return resizedImageUri;
  };

  openImagePicker = () => {
    const { maxHeight, maxWidth, setImage } = this.props;
    const { format } = this.state;

    ImagePicker.showImagePicker(this.options, async (response) => {
      let rotation = 0;
      const { originalRotation } = response;

      if (response.didCancel) {
        return console.log('User cancelled image picker');
      }
      if (response.error) {
        return console.log('ImagePicker Error: ', response.error);
      }
      if (response.customButton) {
        return console.log('User tapped custom button: ', response.customButton);
      }

      if (originalRotation === 90) {
        rotation = 90;
      } else if (originalRotation === 180) {
        rotation = -180;
      } else if (originalRotation === 270) {
        rotation = -90;
      }

      const resizedImageUri = await this.resizeImage({
        data: response.data,
        maxHeight,
        maxWidth,
        format,
        rotation
      });

      if (Platform.OS === 'android' && resizedImageUri.uri.replace) {
        resizedImageUri.uri.replace('file:/data', '/data');
      }

      const source = resizedImageUri.uri;
      this.setState({ imageSource: source });
      setImage(resizedImageUri);
    });
  }

  /* handleUpload = () => {
    const { image } = this.state;
    const { uploadImage } = this.props;

    if (image) {
      const formData = new FormData();
      image.type = 'image/jpeg';
      formData.append('recipe-image', image);
      uploadImage(formData);
    }
  } */

  render() {
    const { imageSource } = this.state;
    const { maxHeight, maxWidth } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.openImagePicker}>
          <Image
            style={{ height: maxHeight, width: maxWidth }}
            resizeMode="cover"
            source={{ uri: imageSource }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

ImageUpload.propTypes = {
  maxHeight: PropTypes.number.isRequired,
  maxWidth: PropTypes.number.isRequired,
  setImage: PropTypes.func.isRequired
};

export default connect(null, actions)(ImageUpload);

const styles = StyleSheet.create({
  container: { borderWidth: 1, borderColor: "#ccc" },
  text: {
    color: "#333",
    fontSize: 16,
    fontFamily: "OpenSans-Regular",
    marginBottom: 10
  }
});
