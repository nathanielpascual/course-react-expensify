import uuid from 'uuid';
import database from '../firebase/firebase';

export const addCategory=(category)=> ({
    type : 'ADD_CATEGORY',
    category
});

export const startAddCategory=(categoryData={})=>{
    return(dispatch,getState)=>{
        const uid = getState().auth.uid;
        const {
                description = '',
                parentId='0'
        }=categoryData;

        const category = { description, parentId };

        return database.ref(`Users/${uid}/Categories`)
                       .push(category)
                       .then((ref)=>{
                           dispatch(addCategory({id:ref.key, ...category}))
                       });
    };
};

export const editCategory = (id ,updates)=>({
    type : 'EDIT_CATEGORY',
    id,
    updates
});

export const removeCategory = ({id}={})=>({
    type : 'REMOVE_CATEGORY',
    id
});

export const setCategories = (categories)=>({
    type : 'SET_CATEGORIES',
    categories
});

export const startSetCategories = ()=>{
    return (dispatch,getState) => {
        const uid = getState().auth.uid;
           return database.ref(`Users/${uid}/Categories`)
            .once('value')
            .then((snapShot)=>{
                const categories=[];

                snapShot.forEach((child)=>{
                    categories.push({
                        id:child.key,
                        ...child.val()
                    });
                });
                dispatch(setCategories(categories));
            });
        };
};