//OBJECT DESTRUCTURING

// console.log('destructuring');

// const person = {
//     name : 'nathan',
//     age : 37,
//     location : {
//         city : 'caloocan',
//         temperature : 27
//     }
// }

// const {name:firstname = 'Anonymous',age} = person;

// console.log(`${firstname} is ${age}`);

// const {city, temperature: temps} = person.location
// if(city && temps)
// {
//     console.log(`it's ${temps} in ${city}`);
// }

// const book = {
//     title : 'Ego is the enemy',
//     author : 'Ryan holiday',
//     publisher : {
//         name : 'Penguin'
//     }
// }

// const {name : publisherName = 'Self-Published'} = book.publisher;

// console.log(publisherName);


//ARRAY DESTRUCTURING

// const address=['15 cagayan st','caloocan','metro manila','1422'];

// const [street, city='Quezon city', state, zip] = address;

// console.log(`You are in ${city},${state}`);

const item = ['coffee(hot)','$2.00','$2.50','$2.75'];

const [coffee, small ,medium, large] = item;
console.log(`A medium ${coffee} costs ${medium}`);