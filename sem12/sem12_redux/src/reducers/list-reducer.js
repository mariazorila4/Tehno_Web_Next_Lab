const INITIAL_STATE={
    notes:[]
}

export default function reducer (state=INITIAL_STATE, action){
    switch(action.type){
        case 'ADD_NOTE':
            return {...state, notes:[...state.notes, action.payload]}
        case 'DELETE_NOTE':
            const updateNotes=state.notes.filter((item, index)=>{
                return index!==action.payload;
            });
            return{...state, notes:updateNotes};
        default:
            return state
    }
}