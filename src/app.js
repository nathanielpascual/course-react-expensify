
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouters';
import configureStore from './stores/configureStore';
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

const store = configureStore();
store.dispatch(addExpense({description:'Water Bill',amount : 100, createdAt:30000}));
store.dispatch(addExpense({description:'Gas Bill',amount : 50, createdAt:32000}));
store.dispatch(addExpense({description:'Rent',amount : 150, createdAt:39500}));
//store.dispatch(setTextFilter('Bill'));
//store.dispatch(setTextFilter('Water'));

// setTimeout(()=> {
//     store.dispatch(setTextFilter('bill'));
// },3000)


const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);

//console.log(visibleExpenses);

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
    
);
ReactDOM.render(jsx,document.getElementById('app'));
