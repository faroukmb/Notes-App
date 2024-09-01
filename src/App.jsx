/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import Editor from "./components/Editor";
import { db } from "./firebase";
import Split from "react-split";
import { addDoc, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { notesCollection } from "./firebase";
import "./index.css"
function App(){
    const [notes,setNotes]=useState([])
    const [currentNoteId, setCurrentNoteId] =useState("")
    const [tempNoteText, setTempNoteText]=useState("")
    const currentNote= notes.find(note =>  note.id === currentNoteId) || notes[0]
    useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])

    useEffect(()=>{
        currentNote && setTempNoteText(currentNote.body)
    },[currentNote])

    useEffect(()=>{
        const timeid =setTimeout(()=>{
            if (tempNoteText !== currentNote.body) {
                updateNote(tempNoteText)
            }
        }, 1000)
        return ()=> clearTimeout(timeid)
    },[tempNoteText])

    const sortedarray= notes.sort((notea,noteb) => noteb.updatedAt - notea.updatedAt  );
   
    useEffect(()=>{
       const unsubscribe= onSnapshot(notesCollection, (snapshot)=>{
          const notesArray=snapshot.docs.map(doc =>({
          ...doc.data(), id : doc.id
       }))
       setNotes(notesArray)
      } )
      return unsubscribe
    },[])
    
    async function addNotes(){
        const newNote={
            body: "# Type your markdown note's title here",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const ref=await addDoc(notesCollection,newNote)
        setCurrentNoteId(ref.id);

    }
    async function deleteNotes(noteId){
      const ref =doc(db,"notes",noteId)
      await deleteDoc(ref);
    }
   
    
   async function updateNote(text){
    const ref =doc(db,"notes",currentNoteId)
    await setDoc(ref,{body : text ,  updatedAt: Date.now()} , {merge : true})
    }
    return(
        <main>
            {
        notes.length >0 ?
        <Split sizes={[25,75]}
         direction="horizontal" 
         minSize={200}
        className="split">
             <SideBar notes={sortedarray} addNotes={addNotes} deleteNotes={deleteNotes} currentNote={currentNote} setCurrentNoteId={setCurrentNoteId}/>
             <Editor  tempNoteText={tempNoteText} setTempNoteText={setTempNoteText} />
    
        </Split>
       : <div className="no-notes">
       <h1>You have no notes</h1>
       <button 
           className="first-note" 
           onClick={addNotes}
       >
           Create one now
       </button>
   </div>
    
        }
 </main>
        )

}
export default App;