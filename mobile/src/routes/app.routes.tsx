import { useTheme } from 'native-base'
import { Platform } from 'react-native' // Para descobrir em qual ambiente a aplicação está rodando
import { PlusCircle, SoccerBall } from 'phosphor-react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { New } from '../screens/New';
import { Pools } from '../screens/Pools';
import { Find } from '../screens/Find';
import { Details } from '../screens/Details';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes(){
    // Acessando colors e sizes de dentro dos themas criados
    const { colors, sizes } = useTheme()

    const size = sizes[6];

    return(
        <Navigator screenOptions={{
            headerShown: false,
            tabBarLabelPosition: 'beside-icon',
            tabBarActiveTintColor: colors.yellow[500],
            tabBarInactiveTintColor: colors.gray[300],
            tabBarStyle: {
                position: 'absolute',
                height: sizes[22],
                borderTopWidth: 0,
                backgroundColor: colors.gray[800]
            },
            tabBarItemStyle: {
                position: 'relative',
                top: Platform.OS === 'android' ? -10 : 0
            }
        }}>
            <Screen
                // rota new, renderizando o componente NEW
                name="new"
                component={New}
                options={{
                    tabBarIcon: ({color}) => <PlusCircle color={color} size={size}/>,
                    tabBarLabel: 'Novo bolão'
                }}
            />

            <Screen
                name="pools"
                component={Pools}
                options={{
                    tabBarIcon: ({color}) => <SoccerBall color={color} size={size} />,
                    tabBarLabel: 'Meus bolões'
                }}
            />


            {/* Não queremos que esta rota apareça */}
            {/* options={{ tabBarButton: () => null}} desta forma será retirado do menu mas a rota continuará existindo na aplciação */}
            <Screen
                name="find"
                component={Find}
                options={{ tabBarButton: () => null}}
            />

            <Screen
                name="details"
                component={Details}
                options={{ tabBarButton: () => null}}
            />

        </Navigator>
    )
}