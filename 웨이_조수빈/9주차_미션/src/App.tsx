import './App.css'
import NavBar from './components/NavBar'
import CartList from './components/CartList'
import PriceBox from './components/PriceBox'
import { Provider } from 'react-redux'
import store from './store/store'

function App() {

  return (
    <>
      <Provider store={store}>
        <NavBar/>
        <CartList/>
        <PriceBox/>
      </Provider>
      
    </>
  )
}

export default App
