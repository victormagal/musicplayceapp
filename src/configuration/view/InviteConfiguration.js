import React from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { DarkHeader } from '../../components/configuration/DarkHeader';
import { ItemList } from '../../components/configuration/ItemList';
import { NavFooter } from '../../components/configuration/NavFooter';

class InviteConfigurationScreen extends React.Component {

  list = {
    data: [
      {
        id: '00',
        rota: 'editConfiguration',
        name: 'Enviar por e-mail',
        width: '20',
        height: '20',
        viewBox: '0 0 32 32',
        paths: [
          {
            fill: 'none',
            stroke: '#E13223',
            strokeWidth: '1.6',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            d: 'M31.2 13.171l-11.387-12.371h-16.445c-1.397 0-2.568 1.309-2.568 2.965v24.47c0 1.656 1.171 2.965 2.568 2.965h25.264c1.397 0 2.568-1.309 2.568-2.965v-15.064z'
          },
          {
            fill: 'none',
            stroke: '#E13223',
            strokeWidth: '1.6',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            d: 'M12.52 23.2l18.339-18.56-3.696-3.52-18.363 18.352v3.728h3.72z'
          }
        ]
      },
      {
        id: '01',
        rota: 'editConfiguration',
        name: 'Enviar por Facebook',
        width: '18',
        height: '22',
        viewBox: '0 0 26 32',
        paths: [
          {
            fill: 'none',
            stroke: '#E13223',
            strokeWidth: '1.4545',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            d: 'M23.818 12.844v-0.017c0.167-7.219-4.413-12.099-10.727-12.099-6.249 0-10.727 4.825-10.727 12.116v7.67c0 0.785-0.255 1.321-0.86 2.161l-0.096 0.132c-0.518 0.716-0.681 1.055-0.681 1.543 0 0.611 0.49 1.104 1.095 1.104h22.537c0 0 0 0 0 0 0.605 0 1.095-0.49 1.095-1.095 0-0.003 0-0.005-0-0.008v0c0-0.378-0.151-0.7-0.598-1.34l-0.089-0.127c-0.687-0.979-0.95-1.527-0.95-2.371v-7.671zM10.176 28.364l0.007 0.029c0.349 1.303 1.519 2.247 2.909 2.247 1.387 0 2.554-0.939 2.901-2.216l0.005-0.021 0.010-0.039h-5.833z'
          }
        ]
      },
      {
        id: '02',
        rota: 'editConfiguration',
        name: 'enviar por SMS',
        width: '23',
        height: '20',
        viewBox: '0 0 37 32',
        paths: [
          {
            fill: 'none',
            stroke: '#E13223',
            strokeWidth: '1.6',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            d: 'M13.6 0.8c-3.626 0-6.179 2.384-6.179 6.088 0 3.926 2.79 7.072 6.179 7.072 3.392 0 6.181-3.146 6.181-7.072 0-3.704-2.554-6.088-6.181-6.088zM26.392 27.539l-0.006-0.397c-0.006-0.409-0.013-0.739-0.022-1.069l0.003 0.125-0.008-0.219c-0.563-4.722-5.083-7.040-12.56-7.040l-0.091 0.003-0.123 0.003-0.091-0.003h-0.005l-0.088-0.002c-7.478 0-11.998 2.317-12.56 7.040-0.005 0.037-0.014 0.456-0.027 1.16l-0.006 0.402c3.594 2.416 7.882 3.659 12.794 3.658 4.826 0 9.187-1.27 12.792-3.661z'
          },
          {
            fill: '#E13223',
            stroke: 'none',
            strokeWidth: '0',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            d: 'M29.6 6.4c0.442 0 0.8 0.358 0.8 0.8v12.8c0 0.442-0.358 0.8-0.8 0.8s-0.8-0.358-0.8-0.8v-12.8c0-0.442 0.358-0.8 0.8-0.8z'
          },
          {
            fill: '#E13223',
            stroke: 'none',
            strokeWidth: '0',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            d: 'M23.2 12.8h12.8c0.442 0 0.8 0.358 0.8 0.8s-0.358 0.8-0.8 0.8h-12.8c-0.442 0-0.8-0.358-0.8-0.8s0.358-0.8 0.8-0.8z'
          }
        ]
      },
      {
        id: '03',
        rota: 'editConfiguration',
        name: 'Copiar o link',
        width: '9',
        height: '19',
        viewBox: '0 0 18 32',
        paths: [
          {
            fill: 'none',
            stroke: '#E13223',
            strokeWidth: '1.6',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            d: 'M1.6 7.68c0.966-4.051 3.491-6.080 7.574-6.080s6.336 2.027 6.76 6.080c0.36 3.744-0.746 6.362-3.314 7.85-2.57 1.488-3.843 3.925-3.821 7.312v2.758'
          },
          {
            fill: '#E13223',
            stroke: 'none',
            strokeWidth: '0',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            d: 'M11.2 30.4c0 0.884-0.716 1.6-1.6 1.6s-1.6-0.716-1.6-1.6c0-0.884 0.716-1.6 1.6-1.6s1.6 0.716 1.6 1.6z'
          }
        ]
      }
    ]
  };

  render() {
    return (
      <View style={styles.parent}>
        <DarkHeader style={styles.header} title={"Configure o MusicPlayce do seu jeitinho"} />
        <ScrollView style={styles.scroll}>
          <FlatList
            data={this.list.data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <ItemList item={item} {...this.props} />
              )
            }}
          />
        </ScrollView>
        <NavFooter style={styles.footer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FCFCFC',
    justifyContent: 'flex-end'
  },
  header: {
    flex: 1
  },
  scroll: {
    flex: 2
  },
  footer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end'
  }
});

export { InviteConfigurationScreen };