import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import TaskDetails from '../screens/taskdetails';

const screens = {
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'My Tasks'
        }
    },
    TaskDetails: {screen: TaskDetails,
        navigationOptions: {
            title: 'Task Details'    
            }
    }
};

const StackHome = createStackNavigator(screens,{
    defaultNavigationOptions: {
        headerStyle: {backgroundColor: '#8420CE'},
        headerTintColor: '#fff'
    }
});

export default createAppContainer(StackHome);