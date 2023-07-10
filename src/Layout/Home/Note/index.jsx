import { useEffect, useState } from "react";

import NoteItem from "./NoteItem";
import TextEditor from "../../../Component/TextEditor";
import { Alert, CircularProgress, Button, Modal } from "@mui/material";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";

import Service from "../../../Service";
import WaitLoadApi from "../../../Component/WaitLoadApi";

function Note() {
  const [notes, setNotes] = useState([]); 
  const [description, setDescription] = useState();
  const dataLogin = useSelector(state => state.reducer.dataLogin);
  const projectDetail = useSelector(state => state.reducer.projectDetail);
  const [waitLoading, setWaitLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const [waitSaveNote, setWaitSaveNote] = useState(false);

  const addNewNote = async () => {
    if( !description) {
      toast.warning('Vui lòng nhập nội dung ghi chú!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }
    const data = {
      createdBy: dataLogin.id,
      projectId: projectDetail._id,
      content: description
    }
    setWaitSaveNote(true);
    const result = await Service.callApi('/project/create-new-note', data);

    if( result.status === true ) {
      toast.success('Thêm ghi chú thành công!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      setDescription('');
      setNotes( prev => [...prev, JSON.parse(result.data)]);
    }else {
      toast.error('Thêm ghi chú thất bại!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
    setWaitSaveNote(false);
    setEdit(false);
  }
  const initNotes = async () => {
    setWaitLoading(true);
    const result = await Service.getDataFromApi(`/project/get-all-notes/?projectId=${projectDetail._id}`);
    if( result.status === true ) {
      setNotes(JSON.parse(result.data));
    }
    setWaitLoading(false);
  }
  useEffect(() => {
    if( dataLogin.isLogin ) {
      initNotes();
    }
  }, [dataLogin])
  useEffect(() => {
    if( dataLogin.isLogin ) {
      initNotes();
    }
  }, [projectDetail])
  return (
    <div className="p-4 relative">
      {waitLoading && <div className="absolute top-0 z-50 backdrop-blur-md bg-blur-light dark:bg-blur-dark right-0 bottom-0 left-0 flex items-center justify-center">
        <WaitLoadApi></WaitLoadApi>
      </div>}
      {
        waitSaveNote && <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <CircularProgress></CircularProgress>
        </div>
      }
      {
        notes.map( (note, index) => {
          return <NoteItem dataLogin={dataLogin} key={index} note={note} setNotes={setNotes}/>
        })
      }
     {
      notes.length === 0 &&  <Alert severity="info"sx={{
        backgroundColor: 'rgba(6, 143, 255, .2)',
        color: 'white',
      }}>Chưa có ghi chú nào cho dự án!</Alert>
     }
      <div className="p-4 border-t-1 mt-2 border-solid border-blur-light dark:border-blur-dark">
        {!edit && <Button 
          onClick={e => setEdit(true)}
          sx={{
              width: 'unset',
              marginLeft: 'auto',
              marginRight: 'auto',
              textTransform: 'capitalize',
              marginLeft: '2rem',
            }}
            >Thêm ghi chú
        </Button>}
        {
          edit && <TextEditor description={description} setDescription={setDescription}  ></TextEditor>
        }
      </div>
     {
      edit &&  
      <div className="full flex items-center">
        <Button
          onClick={addNewNote}
          sx={{
            width: 'unset',
            marginLeft: 'auto',
            marginRight: 'auto',
            textTransform: 'capitalize'
          }}
        >Lưu
        </Button>
      </div>
     }
    </div>
  );
}

export default Note;
