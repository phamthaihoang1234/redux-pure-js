
//state
// reducer
// store

const {createStore} = window.Redux;
const initiaState = JSON.parse(localStorage.getItem('hobby_list')) || [];

// const initiaState = [
//     'Listen to music',
// ]
const hobbyReducer = (state = initiaState, action) =>{
   switch(action.type){
       case 'ADD_HOBBY': {
            const newList = [...state];
            newList.push(action.payload)
            return newList;
       }
       default:
           return state;
   }
   
    
}

const store = createStore(hobbyReducer);

// Render redux hobby list

const renderHobbyList = (hobbyList) => {
  if (!Array.isArray(hobbyList) || hobbyList.length === 0) return;

  const ulElement = document.querySelector('#hobbyListId');
  if (!ulElement) return;

// reset previous content of ul
  ulElement.innerHTML = '';

  for (const hobby of hobbyList) {
    const liElement = document.createElement('li');
    liElement.textContent = hobby;

    ulElement.appendChild(liElement);
  }

// render initial hobby list

  // const initiaHobbyList = store.getState();
  // console.log(initiaHobbyList);

}

// RENDER INITIAL HOBBY LIST
const initialHobbyList = store.getState();
console.log(initialHobbyList);
renderHobbyList(initialHobbyList);

// handle form submit
const hobbyFormElement = document.querySelector('#hobbyFormId');
if(hobbyFormElement){
    const handleFormSubmit = (e) =>{
            
        e.preventDefault();
        const hobbyTextElement = hobbyFormElement.querySelector('#hobbyTextId');
        if(!hobbyTextElement) return;
        console.log('SUBMIT', hobbyTextElement.value);
        // ACTION CHI LÀ MỘT JAVA OBJECT
        
        const action = {
        type: 'ADD_HOBBY',
        payload: hobbyTextElement.value 
    };

    store.dispatch(action);

    // reset form
    hobbyFormElement.reset();

    };
    

hobbyFormElement.addEventListener('submit', handleFormSubmit);
}

store.subscribe(() => {
    const newHobbyList = store.getState();
    renderHobbyList(newHobbyList);
    
    localStorage.setItem('hobby_list', JSON.stringify(newHobbyList));
})
