export function addNote(content){
    console.warn(content)

    return{
        type:'ADD_NOTE',
        payload:content
    }
}

export function deleteNote(index){
    console.warn(index)

    return{
        type:'DELETE_NOTE',
        payload:index
    }
}