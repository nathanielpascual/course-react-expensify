import database from '../firebase/firebase';

const addCategory=(cat='',uid)=>{
    database.ref(`Users/${uid}/Categories`).push({
        description : cat,
        parentId : '0'
    });
};

const CategoriesFixture=(uid)=>{

    database.ref(`Users/${uid}/Categories`)
        .once('value')
        .then((snapshot)=>{
         const expenses = [];

         snapshot.forEach((childSnapShot) => {
            expenses.push({
                id : childSnapShot.key,
                ...childSnapShot.val()
            });
        });

        if(expenses.length===0 || expenses===undefined)
        {
            addCategory('Child Care',uid);
            addCategory('Daily Life',uid);
            addCategory('Debt Payment',uid);
            addCategory('Electronics',uid);
            addCategory('Home and HouseHold',uid);
            addCategory('Health and Maintenance',uid);
            addCategory('Insurance',uid);
            addCategory('Personal Care',uid);
            addCategory('School and Education',uid);
            addCategory('Sports and Recreation',uid);
            addCategory('Transportation',uid);
            addCategory('Utilities',uid);
        };  
      
        })
        .catch((error)=>{
        console.log(error)
        });

    
};

export default CategoriesFixture;






