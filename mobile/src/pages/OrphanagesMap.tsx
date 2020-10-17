import React, {useState} from 'react';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import api from '../services/api'
import mapStyle from '../styles/CustomMapStyle';
import mapMarker from '../assets/images/marker.png';

interface IOrphanagesProps {
  id: string;
  name: string;
  longitude: number;
  latitude: number;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<IOrphanagesProps[]>([])
  const navigation = useNavigation();

  function handleNavigateToOrphanageDetails(id:  number) {
    navigation.navigate(`OrphanageDetails`, { id });
  }
  
  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  useFocusEffect(() => {
    api.get('orphanages').then(response => setOrphanages(response.data))
  })
  
  return (
    <View style={styles.container}>
      <MapView 
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.map} 
        initialRegion={{ 
          latitude: -27.1164307,
          longitude: -49.9944051,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map(orphanage => {
          return(
            <Marker 
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            >
              <Callout onPress={() => handleNavigateToOrphanageDetails(orphanage.id)} tooltip>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>
                    {orphanage.name}
                  </Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

        <RectButton 
          style={styles.createOrphanageButton}
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather name="plus" size={20} color="#FFF"/>
        </RectButton>
      </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  
  calloutContainer: {
    width: 160,
    height: 40,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  calloutText: {
    color: '#0089A5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 60,
    paddingLeft: 24,
    paddingRight: 2,
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
  },

  footerText: {
    color: '#8FA7B3',
    fontFamily: 'Nunito_700Bold',
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default OrphanagesMap;