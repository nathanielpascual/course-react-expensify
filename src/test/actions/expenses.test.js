import {addExpense, 
    startAddExpense, 
    editExpense, 
    removeExpense, 
    setExpenses,
    startSetExpenses,
    startRemoveExpense,
    startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureStore([thunk]);

beforeEach((done)=>{
    const expenseData = {};

    expenses.forEach(({id,description,note,amount,createdAt}) => {
        expenseData[id]={description,note,amount,createdAt};
    });
    database.ref('Expenses').set(expenseData).then(()=>done());
});

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

test('should setup set expense action object with data',()=>{
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type : 'SET_EXPENSES',
        expenses
    })
});

test('should edit expense from firebase',(done)=>{
    const store = createMockStore({});
    const id = expenses[1].id;
    const updates = {
        note: 'for the house',
    }
    store.dispatch(startEditExpense(id,updates))
         .then(()=>{
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type : 'EDIT_EXPENSE',
                id,
                updates
            });
            return database.ref(`Expense/${id}`).once('value');
        }).then((snapshot)=>{
            expect(snapshot.val().note).toBe(updates.note);
            done();
        });
});


test('should fetch expense from firebase',()=>{
    const store = createMockStore({});
    store.dispatch(startSetExpenses())
         .then(()=>{
           const actions = store.getActions();

           expect(actions[0]).toEqual({
               type : 'SET_EXPENSES',
               expenses
           });
        done();
    });
});

test('should remove expense from firebase',()=>{
    const store = createMockStore({});
    const id = expenses[2].id;

    store.dispatch(startRemoveExpense({id}))
         .then(()=>{
            const actions = store.getActions();
            expect(actions[0].id).toEqual({
                type : 'REMOVE_EXPENSE',
                id
            });
            return database.ref(`Expense/${id}`).once('value')
            .then((snapshot)=>{
                expect(snapshot.val()).toBeFalsy();
                done();
         });
    });
    
});