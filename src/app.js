
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {firebase} from './firebase/firebase';
import {startSetExpenses} from './actions/expenses';
import AppRouter, { history }  from './routers/AppRouters';
import configureStore from './stores/configureStore';
import {login,logout} from './actions/auth';
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
    
);

ReactDOM.render(<LoadingPage/>,document.getElementById('app'));

let hasRendered = false;
const renderApp = ()=> {
    if(!hasRendered)
    {
        ReactDOM.render(jsx,document.getElementById('app'));
        hasRendered = true;
    }
}

firebase.auth().onAuthStateChanged((user)=>{
 if(user){
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(()=>{
        renderApp();

        if(history.location.pathname === '/'){
            history.push('/dashboard')
        }
    });
 }
 else{
     store.dispatch(logout());
    renderApp();
    history.push('/'); 
}
});
