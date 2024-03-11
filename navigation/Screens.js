//AUTHENTICATION
import Onboarding from '../screens/Auth/Onboarding';
import Signup from '../screens/Auth/Signup';
import Login from '../screens/Auth/Login';
import Verification from '../screens/Auth/Verification';
import BottomTab from './BottomTab';
import DrawerNav from './DrawerNavigator';

//HOME
import BudgetHome from '../screens/Budget/Budget';
import GoalHome from '../screens/Goal/Goal';
import DashboardHome from '../screens/Dashboard/Dashboard';
import WalletHome from '../screens/Wallet/Wallet';
import Profile from '../screens/Profile/Profile';

//GOAL

//WALLET-CARD

//INCOME

//KEYBOARD

//CALENDAR

const Screens = {
  UNAUTHENTICATED: [
    {name: 'Onboarding', component: Onboarding},
    {name: 'Signup', component: Signup},
    {name: 'Login', component: Login},
    {name: 'Verification', component: Verification},
  ],
  AUTHENTICATED: [
    {name: 'Tabs', component: BottomTab},
    {name: 'DrawerNav', component: DrawerNav},
    {name: 'BudgetHome', component: BudgetHome},
    {name: 'DashboardHome', component: DashboardHome},
    {name: 'GoalHome', component: GoalHome},
    {name: 'WalletHome', component: WalletHome},
    {name: 'Profile', component: Profile},
  ],
};

export default Screens;
