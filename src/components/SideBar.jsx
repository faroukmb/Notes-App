/* eslint-disable react/prop-types */



function SideBar(props){
     const notesElement=props.notes.map((note)=>(
        <div key={note.id}>
           <div className={`title ${props.currentNote && note.id === props.currentNote.id ? "selectedsec" : "note"}`}  onClick={()=>(props.setCurrentNoteId(note.id))}>
           <h4> {note.body.split("\n")[0]}</h4> 
           <button 
                    className="delete-btn"
                    onClick={()=>{props.deleteNotes(note.id)}}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
           
        </div>
        </div>
        
     ))
    return (
        <div className="sidebar">
            <div className="header">
                <h1>Notes</h1>
                <button onClick={props.addNotes}>+</button>
            </div>
            {notesElement}
        </div>
    )
    
 }
 export default SideBar;
