import { useEffect, useState } from "react";

import CardProjectTrash from "../../../Component/CardProjectTrash";

import {BsTrash} from 'react-icons/bs'

import WaitLoad from "../../../Component/WaitLoad";
import Service from "../../../Service";

import { useSelector , useDispatch} from "react-redux";
import {projectTrashAction} from '../../../Store/projectTrashSlice'

function Trash({ setActive }) {
  const [waitLoad, setWaitLoad] = useState(false);
  const [editProject, setEditProject] = useState(false);
  const dataLogin = useSelector( state => state.reducer.dataLogin)
  const projectTrash = useSelector( state => state.reducer.projectTrash)
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const timeOut = () => {
  //     setWaitLoad(false);
  //   };
  //   let timeoutId = null;
  //   if (projectTrash) {
  //     timeoutId = setTimeout(timeOut, 1000);
  //   }
  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [projectTrash]);

  useEffect(() => {
    const initProjectTrash = async () => {
      const result = await Service.getDataFromApi(`/project/get-projects-delete/?userId=${dataLogin?.id}`);
      if(result.status === true) { 
        dispatch(projectTrashAction.intiProjectTrash({  data : JSON.parse(result.data)}));
      }
     } 
    if( dataLogin.isLogin ) {
      initProjectTrash();
    }
  }, [dataLogin])

  return (
    <div className="p-4 w-full">
      {editProject && (
        <div
          className="fixed transition-all  top-0 left-0 right-0 bottom-0  z-30"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
          onClick={(e) => {
            setEditProject(!editProject);
          }}
        ></div>
      )}
      <div className="flex justify-start items-center mb-2"  >
        <BsTrash></BsTrash>
        <h5 className="font-family ml-2 font-bold text-md">
          Dự án đã xoa
        </h5>
      </div>
      {waitLoad && <WaitLoad></WaitLoad>}
      {
        !waitLoad && projectTrash && <div className="grid grid-cols-5 mt-5 gap-5">
          {
            projectTrash.map((project, index) => {
              return (
                <CardProjectTrash key={index} data={project}></CardProjectTrash>
              );
            })
          }
        </div>
      }
    </div>
  );
}

export default Trash;
