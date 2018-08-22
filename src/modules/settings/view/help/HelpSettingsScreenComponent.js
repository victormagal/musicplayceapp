import React from 'react';
import { ScrollView, StyleSheet, TouchableHighlight, View } from 'react-native';
import {Card} from 'react-native-elements';
import { 
	MPHeader,
	MPTextField,
	MPToggleList,
	MPText,
	MPLoading
} from '../../../../components';
import { MPArrowRightIcon } from '../../../../assets/svg';

class HelpSettingsScreenComponent extends React.Component {
  state = {
    searchText: ''
  };

	render() {
	  const { searchText } = this.state;
		const { onBack, faqs, onQuestionNotFound } = this.props;
		return (
			<View style={styles.parent}>
        <MPHeader
          back={true}
          onBack={onBack}
          title={"Pesquise sua dúvida ou consulte na lista abaixo"}
        />
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <View style={{ marginHorizontal: 20 }}>
              <MPTextField
                label={"Pesquisar"}
                value={searchText}
                onChangeText={(searchText) => this.setState({ searchText })}
              />
            </View>
						<View style={styles.borda}>
              { !!faqs && faqs
                .filter(faq => faq.attributes.question.includes(searchText) || faq.attributes.answer.includes(searchText))
                .map(faq => (
                <MPToggleList key={faq.id} title={faq.attributes.question}>
                  <MPText style={styles.text}>
                    { faq.attributes.answer }
                  </MPText>
                </MPToggleList>
              ))}
							<TouchableHighlight
                underlayColor="transparent"
                onPress={() => onQuestionNotFound('sendHelp')}
              >
							<Card style={{margin: 20, paddingHorizontal: 10, paddingVertical: 15,}}>
								<View style={styles.item}>
									<MPText style={styles.textItem}>
                    Não encontrei minha dúvida
                  </MPText>
                  <View style={{ flex: 0, width: 30, alignItems: 'flex-end' }}>
									  <MPArrowRightIcon />
                  </View>
								</View>
							</Card>
							</TouchableHighlight>
						</View>
						<MPLoading visible={this.props.loading} />
					</View>
        </ScrollView>
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
	borda: {
		borderTopWidth: 1,
		borderTopColor: '#DFDFDF',
		marginTop: 30
	},
	scroll: {
		flex: 2
	},
	container: {
		marginBottom: 30
	},
	lista: {
		marginTop: 30,
		marginBottom: 15
	},
	text: {
		fontSize: 16,
		fontFamily: 'Montserrat-Regular',
		color: '#686868'
	},
	link: {
		fontSize: 16,
		fontFamily: 'Montserrat-Regular',
		color: '#5994DB',
		textDecorationLine: 'underline'
	},
	item: {
		backgroundColor: '#FFFFFF',
		flexDirection: 'row',
    alignItems: 'center'
	},
	textItem: {
	  flex: 1,
		color: 'black',
		fontFamily: 'Montserrat-Regular',
		fontSize: 16
	}
});

export { HelpSettingsScreenComponent };
