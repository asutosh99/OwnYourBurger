
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './Containers/cheackOut/checkOut'
import {Route,Switch} from 'react-router-dom'
import Orders from './Containers/Orders/Orders'
import Auth from './Containers/Auth/auth'

function App() {
  return (
    <div className="App">
     <Layout> 
       <Switch>
         <Route path='/orders' component={Orders}/>
         <Route path='/auth' component={Auth}/>
       <Route path='/checkout' component={CheckOut}/>
       <Route path='/'exact component={BurgerBuilder}/>
       </Switch>
   
     
     </Layout>

        </div>
  );
}

export default App;
