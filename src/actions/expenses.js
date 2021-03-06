import uuid from 'uuid';
import database from '../firebase/firebase';
//=for redux only
// component call action generator
// action generator returns object
// component dispatches object
// redux store changes

//-for redux and firebase
// components calls action generator
// action generator returns function
// component dispatches function(?)
// function runs(has the ability to dispatch other actions and do whatever it wants)

//ADD_EXPENSE
export const addExpense = (expense) => ({
    type : 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch,getState) => {
        const uid = getState().auth.uid;
        const {
            description = '',
            category = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;

    const expense = {description, category, note, amount, createdAt};

    return database.ref(`Users/${uid}/Expenses`)
            .push(expense)
            .then((ref)=>{
                dispatch(addExpense({
                    id:ref.key,
                    ...expense
                }))
            });
    };
};
//REMOVE_EXPENSE
export const removeExpense = ({id}={}) => 
({
    type : 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = ({id}={}) =>{
    return (dispatch,getState)=>{
        const uid = getState().auth.uid;
        return database.ref(`Users/${uid}/Expenses/${id}`)
                .remove()
                .then(()=>{
                     dispatch(removeExpense({id}));
                })
                .catch((error)=>{
                     console.log(error);
                });
    };
};

//EDIT_EXPENSE
export const editExpense = (id, updates)=>({
    type : 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, updates)=> {
    return (dispatch,getState)=>{
        const uid = getState().auth.uid;
        return database.ref(`Users/${uid}/Expenses/${id}`)
              .update(updates)
              .then(()=>{
                  dispatch(editExpense(id,updates));
              });
    };
};

//SET_EXPENSES

export const setExpenses=(expenses)=>({
    type : 'SET_EXPENSES',
    expenses
}); 

export const startSetExpenses = ()=>{
    return (dispatch,getState) => {
        const uid = getState().auth.uid;
           return database.ref(`Users/${uid}/Expenses`)
            .once('value')
            .then((snapShot)=>{
                const expenses=[];

                snapShot.forEach((child)=>{
                    expenses.push({
                        id:child.key,
                        ...child.val()
                    });
                });
                dispatch(setExpenses(expenses));
            });
        };
};