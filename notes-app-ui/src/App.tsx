import {useState} from "react";
import './App.css';

type Note={
  id:number;
  title:string;
  content:string;
};

const App = () => {
  const[notes,setNotes]=useState<Note[]>([
    {
      id:1,
      title:" Note title 1",
      content:"Content 1",
    },
    {
      id:2,
      title:" Note title 2",
      content:"Content 2",
    },
    {
      id:3,
      title:" Note title 3",
      content:"Content 3",
    },
    {
      id:4,
      title:" Note title 4",
      content:"Content 4",
    },{
      id:5,
      title:" Note title 5",
      content:"Content 5",
    }
  ]);
  const[title,setTitle]=useState("");
  const[content,setContent]=useState("");

  const[selectedNote,setSelectedNote]=
  useState<Note|null>(null);
  const handleNoteClick=(note:Note)=>{
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }

  const handleAddNote=(event:React.FormEvent) => {
    event.preventDefault();
   
    const newNote:Note={
      id:notes.length+1,
      title:title,
      content:content
    };
    setNotes([newNote,...notes]);
    setTitle("");
    setContent("");
  
  };

  const handleUpdateNote=(
    event:React.FormEvent,
    
  )=>{
    event.preventDefault();
    if(!selectedNote){
      return;
    }

    const updatedNote:Note={
      id:selectedNote.id,
      title:title,
      content:content
    };

    const updatedNotes=notes.map((note)=>{
      if(note.id===selectedNote.id){
        return updatedNote;
      }
      return note;}
    )

      setNotes(updatedNotes);
      setTitle("");
      setContent("");
      setSelectedNote(null);


    };

    const handleCancel=()=>{

    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote=(event: React.MouseEvent,noteId:number)=>{
    event.stopPropagation();

    const updatedNotes=notes.filter(
      (note)=>note.id != noteId
    )
   setNotes(updatedNotes);

  };

  

  




  return (
    <div className="app-container">
      <form className="note-form" onSubmit={(event) => selectedNote ? handleAddNote(event): handleAddNote(event)}>
        <input 
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="title"
        />
        <textarea 
  value={content}
  onChange={(event) => setContent(event.target.value)}
  placeholder="Content" 
  rows={10}
></textarea>
{
  selectedNote?(
    <div className="edit-buttons">
      <button type="submit">Save</button>
      <button onClick={handleCancel }>Cancel</button>
    </div>
  ):(<button type="submit">Add Note</button>)
}

        
      </form>
      <div className="note-grid">
        {notes.map(note => (
          <div className="note-item"
          onClick={()=> handleNoteClick(note)}>
            <div className="note-item-header">
              <button onClick={(event)=>deleteNote(event,note.id)}> X </button>
            </div>
            <h2> {note.title}</h2>
            <p> {note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
  
  

export default App;
