import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import Header from './components/Header';

import OrphanageMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';

const { Navigator, Screen } = createStackNavigator()

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{headerShown: false, cardStyle: {
        backgroundColor: '#f2f3f5'
      }}}>
        <Screen 
          name="OrphanageMap" 
          component={OrphanageMap}
        />
        <Screen 
          name="OrphanageDetails" 
          component={OrphanageDetails}
          options={{
            headerShown: true,
            header: () => <Header showCancel={false} title="Detalhes do Orfanato"/>
          }}
        />
        <Screen 
          name="SelectMapPosition" 
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title="Selecione no Mapa"/>
          }}
        />
        <Screen 
          name="OrphanageData" 
          component={OrphanageData}
          options={{
            headerShown: true,
            header: () => <Header title="Informe os Dados"/>
          }}
        />
      </Navigator>
    </NavigationContainer>
  )
}

export default Routes;