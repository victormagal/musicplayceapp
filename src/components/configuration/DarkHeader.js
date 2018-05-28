import React from 'react';
import { View, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class DarkHeaderComponent extends React.Component {

  render() {
    let { title, back, onBack } = this.props;
    return (
      <View style={styles.parent}>
        <StatusBar barStyle="light-content"/>
        <View style={styles.header}>

          {back && (
            <TouchableOpacity onPress={onBack}>
              <Svg style={styles.back}  viewBox="0 0 10 12">
                <Path fill="#FFF"  d="M9.214 0c.434 0 .786.352.786.786l-.003 10.43a.783.783 0 0 1-1.194.666L.383 6.675a.784.784 0 0 1-.01-1.34L8.743.157A.783.783 0 0 1 9.214 0z"/>
              </Svg>
            </TouchableOpacity>
          )}

          <Svg style={styles.logo} viewBox="0 0 192 32">
            <Path
              d="M179.792 14.89c0.237-3.715 2.21-6.134 4.829-6.134 2.89 0 4.488 2.76 4.658 6.134h-9.488zM185.163 25.075c2.653 0 4.49-1.022 6.088-2.656l-1.395-1.568c-1.224 1.226-2.651 2.043-4.59 2.043-2.787 0-5.202-2.179-5.474-6.098h11.901c0.023-0.266 0.036-0.575 0.036-0.887 0-0.048-0-0.096-0.001-0.144l0 0.007c0-5.347-2.653-9.163-7.107-9.163-4.149 0-7.312 3.782-7.312 9.2v0.17c0 5.621 3.536 9.096 7.856 9.096zM170.363 25.075c2.619 0 4.387-1.158 5.714-2.656l-1.427-1.637c-1.123 1.158-2.416 2.045-4.149 2.045-2.992 0-5.44-2.691-5.44-6.883v-0.168c0-4.122 2.379-6.917 5.338-6.917 1.837 0 3.094 0.954 4.149 2.011l1.462-1.84c-1.36-1.363-3.061-2.419-5.578-2.419-4.421 0-7.888 3.782-7.888 9.165v0.24c0 5.381 3.365 9.061 7.821 9.061zM137.568 23.032c-2.109 0-3.776-1.397-3.776-3.611v-0.104c0-2.248 1.566-3.712 4.389-3.712 1.734 0 3.162 0.306 4.285 0.715v2.214c0 2.589-2.176 4.531-4.898 4.496zM137.024 25.075c2.619 0 4.352-1.294 5.408-2.963v2.589h2.413v-11.413c0-2.080-0.611-3.714-1.701-4.805-1.155-1.158-2.822-1.771-4.963-1.771-2.176 0-3.91 0.613-5.578 1.43l0.782 2.011c1.224-0.648 2.754-1.194 4.523-1.194 2.856 0 4.522 1.533 4.522 4.395v1.056c-1.326-0.408-2.686-0.715-4.557-0.715-3.91 0-6.528 2.078-6.528 5.725v0.134c0 3.51 2.72 5.52 5.678 5.52zM125.829 24.701h2.448v-24.598h-2.448v24.598zM114.939 22.827c-2.789 0-5.373-2.658-5.373-6.814v-0.341c0-4.157 2.584-6.848 5.373-6.848 2.72 0 5.034 2.555 5.034 6.882v0.274c0 4.362-2.245 6.848-5.034 6.848zM107.219 29.811h2.448v-8.416c1.157 1.942 2.926 3.646 5.749 3.646 3.605 0 7.072-3.168 7.072-9.062v-0.341c0-5.894-3.467-9.029-7.072-9.029-2.789 0-4.557 1.738-5.747 3.747v-3.406h-2.448v22.861zM96.315 25.178c3.298 0 5.747-1.43 7.379-3.816l-4.251-3.85c-0.68 0.92-1.394 1.499-2.517 1.499-1.461 0-2.549-1.363-2.549-3.646v-0.067c0-2.045 1.019-3.475 2.584-3.475 0.986 0 1.701 0.544 2.381 1.533l4.318-3.883c-1.394-2.25-3.843-3.782-7.072-3.782-5.408 0-9.149 4.192-9.149 9.642v0.374c0 5.418 3.638 9.472 8.875 9.472zM78.954 24.701h7.107v-18.605h-7.107v18.603zM78.851 4.872h7.346v-4.872h-7.344v4.872zM70.298 25.144c4.659 0 7.448-2.453 7.448-6.406v-0.067c0-3.339-2.314-4.736-6.326-6.064-1.664-0.546-2.141-0.784-2.141-1.194v-0.067c0-0.341 0.304-0.614 1.053-0.614 1.328 0 3.299 0.648 4.898 1.568l2.347-4.667c-2.211-1.363-4.864-1.976-7.414-1.976-4.454 0-7.413 2.384-7.413 6.302v0.069c0 3.611 2.517 4.906 6.427 6.131 1.701 0.546 2.040 0.819 2.040 1.227v0.034c0 0.41-0.339 0.648-1.054 0.648-1.802 0-3.877-0.75-5.814-2.011l-2.381 4.635c2.55 1.702 5.475 2.453 8.331 2.453zM49.195 25.144c2.381 0 3.979-1.363 5.034-2.794v2.35h7.141v-18.605h-7.141v10.733c0 1.261-0.816 2.010-1.734 2.010-0.952 0-1.666-0.749-1.666-2.010v-10.731h-7.142v13.016c0 3.68 2.040 6.030 5.509 6.030zM14.253 24.701h7.107v-10.8c0-1.227 0.784-1.942 1.701-1.942 0.885 0 1.598 0.715 1.598 1.942v10.8h7.107v-10.8c0-1.227 0.782-1.942 1.699-1.942 0.918 0 1.6 0.715 1.6 1.942v10.8h7.141v-13.014c0-3.68-2.075-6.032-5.578-6.032-2.55 0-4.216 1.261-5.509 2.864-0.85-1.773-2.448-2.864-4.795-2.864-2.312 0-3.944 1.363-4.965 2.795v-2.352h-7.107v18.603z"
              fill="#FFFFFF"
            />
            <Path
              d="M1.45 4.192c-0.8 0-1.45 0.688-1.45 1.538l0.005 20.406c0 0.275 0.070 0.554 0.216 0.805 0.419 0.72 1.309 0.944 1.987 0.499l15.533-10.192c0.203-0.13 0.367-0.301 0.486-0.503l0.004-0.007c0.418-0.72 0.208-1.664-0.47-2.109l-15.443-10.131c-0.235-0.189-0.538-0.304-0.867-0.304h-0zM160.040 7.824h2.614l-6.282 18.214c-1.256 3.712-2.784 4.984-5.162 4.984-1.12 0-2.174-0.275-3.192-0.826l0.747-2.061c0.678 0.378 1.426 0.653 2.309 0.653 1.325 0 2.173-0.757 3.056-3.059l-6.79-17.904h2.648l5.296 14.742 4.755-14.742z"
              fill="#E13223"
            />
          </Svg>
        </View>

        {
          title ? (
            this.props.fontLoaded ? (
              <Text style={styles.title}>
                {title}
              </Text>
            ) : null
          ) : null
        }
      </View>
    );
  }
}

DarkHeaderComponent.propTypes = {
  title: PropTypes.string.isRequired,
  back: PropTypes.bool,
  onBack: PropTypes.func
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: 'black',
    paddingBottom: 15,
    marginBottom: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30
  },
  back: {
    width: 10,
    height: 20,
    marginLeft: 20
  },
  logo: {
    flex: 1,
    width: 120,
    height: 20,
    alignSelf: 'center'
  },
  title: {
    fontFamily: 'montSerrat',
    marginTop: 20,
    fontSize: 20,
    color: 'white',
    paddingHorizontal: 50,
    textAlign: 'center'
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const DarkHeader = connect(mapStateToProps)(DarkHeaderComponent);
export { DarkHeader };