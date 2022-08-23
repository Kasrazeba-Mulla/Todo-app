import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { db } from "../firebase/firebase";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckIcon from "@mui/icons-material/Check";

import "./Homepage.css";

function Homepage() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        //refernce the db
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data != null) {
            Object.values(data).map((todo) => {
              setTodos((old) => [...old, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //read

  //add
  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd,
    });
    setTodo("");
  };
  //update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
  };

  const handleEditConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      todo: todo,
      tempUidd: tempUidd,
    });
    setTodo("");
    setIsEdit(false);
  };

  //delete
  const handleDelete = (uidd) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uidd}`));
  };

  return (
    <div className="homepage">
      <input
        className="add-edit-input"
        type="text"
        value={todo}
        placeholder="Add todo..."
        onChange={(e) => setTodo(e.target.value)}
      />
      {todos.map((todo) => (
        <div className="todo">
          <h1>{todo.todo}</h1>
          <EditIcon
            fontSize="large"
            onClick={() => handleUpdate(todo)}
            className="edit-btn"
          />
          <AssignmentTurnedInIcon
            fontSize="large"
            onClick={() => handleDelete(todo.uidd)}
            className="delete-btn"
          />
        </div>
      ))}

      {isEdit ? (
        <div className="">
          <CheckIcon className="add-icon" onClick={handleEditConfirm} />
        </div>
      ) : (
        <div className="">
          <AddIcon className="add-icon" onClick={writeToDatabase} />
        </div>
      )}
      <LogoutIcon onClick={handleSignOut} className="logout-btn" />
    </div>
  );
}

export default Homepage;
