import {addExpense, startAddExpense, editExpense, removeExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureStore([thunk]);
test('should setup remove expense action object',() =>{
    const action = removeExpense({id:'123abc'});

    expect(action).toEqual({type:'REMOVE_EXPENSE',id:'123abc'});
});

test('should setup edit expense action object',() =>{
    const action = editExpense('123abc',{note:'new note'});

    expect(action).toEqual({
        type:'EDIT_EXPENSE',
        id:'123abc',
        updates : {
            note : 'new note'
        }
    });
});

test('should setup add expense action object with provide values',() =>{
    const action = addExpense(expenses[2]);

    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense : expenses[2]
    });
});

test('should add expense to database and store',()=>{
    const store = createMockStore({});
    const expenseData = {
        description : 'Mouse',
        amount : 3000,
        note : 'This one is better',
        createdAt : 100
    };
    store.dispatch(startAddExpense(expenseData))
         .then(()=>{
           const actions = store.getActions();

           expect(actions[0]).toEqual({
               type : 'ADD_EXPENSE',
               expense : {
                   id: expect.any(String),
                   ...expenseData
               }
           });

        return database.ref(`Expenses/${action[0].expense.id}`).once('value');
               
         }).then((snapshot)=>{
            expect(snapshot.val()).toEqual(expenseData);   
            done();
        });
});

test('should add expense with default to database and store',()=>{
    const store = createMockStore({});
    const expenseDefaults = {
        description : '',
        amount : 0,
        note : '',
        createdAt : 0
    };
    store.dispatch(startAddExpense(expenseDefaults))
         .then(()=>{
           const actions = store.getActions();

           expect(actions[0]).toEqual({
               type : 'ADD_EXPENSE',
               expense : {
                   id: expect.any(String),
                   ...expenseDefaults
               }
           });

        return database.ref(`Expenses/${action[0].expense.id}`).once('value');
               
         }).then((snapshot)=>{
            expect(snapshot.val()).toEqual(expenseDefaults);   
            done(); 
        });
});
