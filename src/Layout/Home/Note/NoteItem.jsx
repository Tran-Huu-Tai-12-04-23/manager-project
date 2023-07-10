import { useEffect, useRef, useState } from "react";

import { Avatar } from "@mui/material";
import CodePreview from "../../../Component/CodePreview";

import {RiDeleteBack2Line} from 'react-icons/ri';
import ModalConfirmRemove from "../../../Component/ModalConfirmRemove";
import Service from "../../../Service";
import { toast } from "react-toastify";

function NoteItem({note, dataLogin, setNotes=() => {}}) {
  const wrapperNote = useRef(null);
  const [user, setUser] = useState(null)
  const [showRemoveNote, setShowRemoveNote] = useState(false);
  const [showConfirmRemoveNote, setShowConfirmRemoveNote] = useState(false);

  useEffect(() => {
    const wrapper = wrapperNote?.current;
    const listHrefA = wrapper.querySelectorAll('a');
    for( const a of listHrefA) {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(e.target.href, '_blank');
      });
    }
  }, [])

  useEffect(() => {
    if(note && note.createdBy) {
      setUser(note.createdBy);
    }
  }, [note])


  const handleRemoveNote = async () => {
    if( dataLogin.id === note?.createdBy?._id) {
      console.log(note?.createdBy._id);
      const result = await Service.remove(`/project/remove-note/?noteId=${note?._id}`);
      if(result.status === true) {
        toast.success("Xóa ghi chú thành công!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        setNotes( prev => {
          return prev.filter(n => n._id !== note._id);
        })
      }else {
        toast.error("Xóa ghi chú không thành công!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
      setShowConfirmRemoveNote(false);
    }
  }


  
  return (
    <div 
    onMouseOver={e => setShowRemoveNote(true)}
    onMouseLeave={e => setShowRemoveNote(false)}
    ref={wrapperNote} className="rounded-xl  hover:bg-blur-light dark:hover:bg-blur-dark cursor-pointer elative p-2 justify-start items-start flex-shrink-0 flex flex-col text-black dark:text-white ckeditor-container">
      <ModalConfirmRemove 
      open={showConfirmRemoveNote} setOpen={setShowConfirmRemoveNote} action={handleRemoveNote}></ModalConfirmRemove>
      <div className="justify-start flex items-center">
        <Avatar sx={{ width: 24, height: 24}} alt={user?.displayName} src={user?.photoURL}></Avatar>
        <h5 className="font-family font-bold text-xs ml-2">{user?.displayName}</h5>
      </div>
      <div className="w-full p-2">
        <CodePreview
          code={
            note.content
          }
        ></CodePreview>
      </div>
      {
        showRemoveNote && dataLogin.id === note?.createdBy._id  && <RiDeleteBack2Line
        onClick={e => setShowConfirmRemoveNote(true)}
        className='absolute transition-all text-xl hover:text-red-400 right-10' ></RiDeleteBack2Line>
      }
    </div>
  );
}

export default NoteItem;
