import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };

  firebase.initializeApp(config);

  const database = firebase.database();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  googleAuthProvider.setCustomParameters({
    'prompt': 'select_account'
  });
  export {firebase,googleAuthProvider, database as default};
  
//   database.ref('Expenses').push({
//     description : 'House Rental',
//     amount : 8000,
//     notes : 'rental for the month of december',
//     createdAt : moment(0).add(2,'days').valueOf()
//   });
//   database.ref('Expenses').push({
//     description : 'Electricity bill',
//     amount : 2000,
//     notes : 'electril bill for the period of november to december',
//     createdAt : moment(0).add(3,'days').valueOf()
//   });

//   database.ref('Expenses').push({
//     description : 'Water bill',
//     amount : 1300,
//     notes : 'water bill for the period of november to december',
//     createdAt : moment(0).add(4,'days').valueOf()
//   });

//   database.ref().once('value')
//   .then((snapshot)=>{
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch((error)=>{
//     console.log('error')
//   });

// database.ref('Expenses')
// .once('value')
// .then((snapshot)=>{
//   const expenses = [];

//   snapshot.forEach((childSnapShot) => {
//       expenses.push({
//           id : childSnapShot.key,
//           ...childSnapShot.val()
//       });
//   });
//   console.log(expenses);
// })
// .catch((error)=>{
//   console.log(error)
// });
//  database.ref('Expenses')
// .on('value',(snapshot)=>{
//     const expenses = [];
  
//     snapshot.forEach((childSnapShot) => {
//         expenses.push({
//             id : childSnapShot.key,
//             ...childSnapShot.val()
//         });
//     });
//     console.log(expenses);
//   },(error)=>{
//     console.log(error)
//   });

//   database.ref('Expenses').on('child_removed',(snapshot)=>{
//       console.log(snapshot.key,snapshot.val());
//   });

//   database.ref('Expenses').on('child_changed',(snapshot)=>{
//      console.log(snapshot.key,snapshot.val());
//   });
  
//   database.ref('Expenses').on('child_added',(snapshot)=>{
//     console.log(snapshot.key,snapshot.val());
//   });
// const onValueChange = database.ref().on('value',(snapshot)=>{
//    const val = snapshot.val();
//    console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
//   },(e)=>{
//       console.log('error with data fetching ')
//   });
//   const onValueChange = database.ref().on('value',(snapshot)=>{
//     console.log(snapshot.val());
//   },(e)=>{
//       console.log('error with data fetching ')
//   });

//   setTimeout(() => {
//       database.ref('age').set(38);
//   }, 3500);

//   setTimeout(() => {
//     database.ref().off(onValueChange);
// }, 7000);

// setTimeout(() => {
//     database.ref('age').set(40);
// }, 10500);
//   database.ref().set({
//       name : 'nathan pascual',
//       age : 26,
//       stressLevel : 6,
//       job : {
//           title : 'software engineer',
//           company : 'google'
//       },
//       location :{
//           city : 'caloocan',
//           country : 'philippines'
//       }
//   }).then(()=>{
//      console.log('created');
//   }).catch((e)=>{
//      console.log('failed');
//   });

//   database.ref('isSingle')
//   .remove()
//   .then(()=>{
//       console.log('Removed succeeded')
//   })
//   .catch((error)=>{
//       console.log('removed failed.')
//   });
//   database.ref().update({
//     name : 'Nathan',
//     age : 36,
//     job : 'software developer',
//     isSingle : null
//   });
//   database.ref().update({
//       stressLevel : 9,
//       'job/company' : 'amazon',
//       'location/city' : 'makati'
//   }).then(()=>{
//     console.log('created');
//  }).catch((e)=>{
//     console.log('failed');
//  });
