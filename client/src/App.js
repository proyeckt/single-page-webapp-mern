import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import RegisterForm from './views/RegisterForm'
import LoginForm from './views/LoginForm';
import Home from './views/Home';
import NoteForm from './views/NoteForm';
import Notes from './views/Notes';
import ArchivedNotes from './views/ArchivedNotes';
import Note from './views/Note';
import EditNote from './views/EditNote';
import Users from './views/users/Users';
import User from './views/users/User';
import NotFound from './views/NotFound';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>;
          <Route path='/notes' element={<Notes/>}/>
          <Route path='/archivedNotes' element={<ArchivedNotes/>}/>
          <Route path='/notes/create' element={<NoteForm/>}/>
          <Route path='/notes/edit/:id' element={<EditNote/>}/>
          <Route path='/note/:id' element={<Note/>}/>
          <Route path='/register' element={<RegisterForm/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/users/:id' element={<User/>}/>
          <Route path='not-found' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
