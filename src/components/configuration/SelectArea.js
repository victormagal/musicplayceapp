import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import ActionSheet from 'react-native-actionsheet';
import { connect } from 'react-redux';

class SelectAreaComponent extends React.Component {

  showActionSheet = () => {
    this.ActionSheet.show()
  }

  render() {
    return (
      <View style={styles.parent}>
        {
          this.props.fontLoaded ? (
            <View>
              <TouchableHighlight onPress={this.showActionSheet} underlayColor="transparent">
                <View style={styles.areaSelection}>
                  <View style={styles.boxText}>
                    <Text style={styles.text}>Assunto do feedback</Text>
                  </View>
                  <View style={styles.boxFoward}>
                    <Svg width='8' height='14' viewBox='0 0 56 32'>
                      <Path
                        fill='#2424D3'
                        d='M28.040 23.388l-22.060-22.348c-0.629-0.642-1.505-1.040-2.474-1.040-0.975 0-1.856 0.403-2.485 1.051l-0.001 0.001c-0.631 0.65-1.021 1.539-1.021 2.518 0 0.985 0.394 1.879 1.033 2.531l-0.001-0.001 24.536 24.86c0.629 0.643 1.506 1.041 2.476 1.041s1.847-0.399 2.475-1.041l0.001-0.001 24.452-24.86c0.635-0.651 1.027-1.542 1.027-2.524s-0.392-1.873-1.027-2.525l0.001 0.001c-0.63-0.645-1.508-1.046-2.48-1.046s-1.85 0.4-2.479 1.045l-0.001 0.001-21.972 22.332z'
                      />
                    </Svg>
                  </View>
                </View>
              </TouchableHighlight>
              <ActionSheet 
                ref={o => this.ActionSheet = o}
                options={['Interface', 'Navegação', 'Experiência', 'Fechar']}
                cancelButtonIndex={3}
                onPress={(index) => { return false; }}
              />
            </View>
          ) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  areaSelection: {
    marginHorizontal: 40,
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#B1B1B1'
  },
  boxText: {
    alignItems: 'flex-start',
    flex: 0.9
  },
  text: {
    color: 'black',
    fontFamily: 'montSerrat',
    fontSize: 16
  },
  boxFoward: {
    alignItems: 'flex-end',
    flex: 0.1
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const SelectArea = connect(mapStateToProps)(SelectAreaComponent);
export { SelectArea };