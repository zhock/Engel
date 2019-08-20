import {  
    createStackNavigator,   
    createAppContainer
} from "react-navigation";

import RegisterForm from "../src/components/RegisterForm";    
import UserDetails from "../src/components/UserDetails";

const AppNavigator = createStackNavigator(
    {               
        RegisterForm: {screen:RegisterForm},
        UserDetails: {screen:UserDetails}
    },
    {
    headerMode: "none"
    }
);


const NavigatorApp = createAppContainer(AppNavigator);
export default NavigatorApp;