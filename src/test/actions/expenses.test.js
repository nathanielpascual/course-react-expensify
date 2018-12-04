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
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const uid = 'abc1234';
const defaultAuthState ={auth : { uid }};
const createMockStore = configureStore([thunk]);

beforeEach((done)=>{
    const expenseData = {};

    expenses.forEach(({id,description,note,amount,createdAt}) => {
        expenseData[id]={description,note,amount,createdAt};
    });
    database.ref(`Users/${uid}/Expenses`).set(expenseData).then(()=>done());
});

test('should setup remove expense action object',() =>{
    const action = removeExpense({id:'1234'});

    expect(action).toEqual({type:'REMOVE_EXPENSE',id:'1234'});
});

test('should remove expense from firebase',()=>{
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;

    store.dispatch(startRemoveExpense({id}))
         .then(()=>{
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type : 'REMOVE_EXPENSE',
                id
            });
            return database.ref(`Users/${uid}Expense/${id}`).once('value')
            .then((snapshot)=>{
                expect(snapshot.val()).toBeFalsy();
                done();
         });
    });
    
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

test('should edit expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    const updates = { amount: 21045 };
    store.dispatch(startEditExpense(id, updates)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates
      });
      return database.ref(`Users/${uid}/Expenses/${id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val().amount).toBe(updates.amount);
      done();
    });
  });

test('should setup add expense action object with provide values',() =>{
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type:'ADD_EXPENSE',
        expense : expenses[2]
    });
});

test('should add expense to database and store',(done)=>{
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description : 'Mouse',
        amount : 3000,
        note : 'This one is better',
        createdAt : 100
    };
    store.dispatch(startAddExpense(expenseData)).then(()=>{
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type : 'ADD_EXPENSE',
            expense : {
             id: expect.any(String),
                ...expenseData
             }
        });

        return database.ref(`Users/${uid}/Expenses/${actions[0].expense.id}`).once('value');
               
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData); 
        done();  
    });
});

test('should add expense with default to database and store',()=>{
    const store = createMockStore(defaultAuthState);
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

        return database.ref(`Users/${uid}/Expenses/${actions[0].expense.id}`).once('value');
               
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

test('should fetch expense from firebase',()=>{
    const store = createMockStore(defaultAuthState);
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

