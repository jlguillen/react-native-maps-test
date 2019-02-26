import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 51.556020187414525;
const LONGITUDE = -0.27951836585998535;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapWidget extends Component {
	constructor(props) {
		super(props);

		this.state = {
			markers: []
		};
	}
	renderMarker() {
		console.log('eeeeeh');

		return (
			<Marker
				coordinate={{
					latitude: LATITUDE + LATITUDE_DELTA / 2,
					longitude: LONGITUDE + LONGITUDE_DELTA / 2
				}}
			/>
		);
	}

	recordEvent(name, e) {
		console.log(name);
		console.log(e);
	}

	onPress(e) {
		console.log(e);
		this.setState({
			markers: [
				...this.state.markers,
				{
					coordinate: e.coordinate
				}
			]
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<MapView
					provider={PROVIDER_GOOGLE}
					style={styles.map}
					onMapReady={e => {
						this.recordEvent('onMapReady');
					}}
					onPress={e => {
						this.onPress(e.nativeEvent);
						this.renderMarker();
					}}
					onPoiClick={e => {
						this.recordEvent('onPoiClick', e.nativeEvent);
					}}
					region={{
						latitude: LATITUDE,
						longitude: LONGITUDE,
						latitudeDelta: LATITUDE_DELTA,
						longitudeDelta: LONGITUDE_DELTA
					}}
				>
					{this.state.markers.map((marker, index) => {
						return (
							<Marker key={index} {...marker}>
								<View style={styles.marker}>
									<Text style={styles.text}>marker text</Text>
								</View>
							</Marker>
						);
					})}
				</MapView>
				<Callout tooltip={true}>
					<View style={styles.calloutView}>
						<TextInput
							style={styles.calloutSearch}
							placeholder={'Search'}
						/>
					</View>
				</Callout>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject
	},
	map: {
		...StyleSheet.absoluteFillObject
	},
	marker: {
		backgroundColor: '#550bbc',
		padding: 5,
		borderRadius: 5
	},
	text: {
		color: '#FFF',
		fontWeight: 'bold'
	},
	calloutView: {
		flexDirection: 'row',
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		borderRadius: 10,
		width: '40%',
		marginLeft: '30%',
		marginRight: '30%',
		marginTop: 20
	},
	calloutSearch: {
		borderColor: 'transparent',
		marginLeft: 10,
		width: '90%',
		marginRight: 10,
		height: 40,
		borderWidth: 0.0
	}
});

export default MapWidget;
