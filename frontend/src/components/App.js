

import React from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import * as Auth from '../utils/Auth'
import union from '../images/Union.png'
import error from '../images/Error.png'

import api from '../utils/api.js'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from './InfoTooltip.js';
import Planer from './Planer';
import Garden from './Garden';
import AddBedPopup from './AddBedPopup';
import AddNotePopup from './AddNotePopup';

import { CurrentUserContext, defaultUserInfo } from '../contexts/CurrentUserContext';

function App(props) {
  const history = useHistory();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isAddBedPopupOpen, setIsAddBedPopupOpen] = React.useState(false);
  const [isAddNotePopupOpen, setIsAddNotePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isErrorPopupOpened, setIsErrorPopupOpened] = React.useState(false);
  const [isSuccessPopupOpened, setIsSuccessPopupOpened] = React.useState(false);


  // const [selectedCard, setSelectedCard] = React.useState({ name: "", link: "" });

  const [currentUser, setCurrentUser] = React.useState(defaultUserInfo);

  const [cards, setCards] = React.useState([]);
  const [beds, setBeds] = React.useState([]);
  const [notes, setNotes] = React.useState([]);

  const [isLogged, setIsLogged] = React.useState(false);

  const [userData, setUserData] = React.useState({ email: "", password: "" });

  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        const cards = [
          // { "_id": 0, "name": "Морковка" },
          // { "_id": 1, "name": "Огурцы" },
        ]
        setCards(cards)
      })
      .catch((err) => {
        console.log(err)
        console.log(err);
      })
  }, [])

  React.useEffect(() => {
    const beds = [
      // { _id: 0, name: "Морковка", soil: "chjxyj gjcflbnm" },
      // { _id: 1, name: "Огурцы", light: "cj,hfnm b pfcjkbnm"  },
    ]
    setBeds(beds)
    // api.getInitialNotes()
    //   .then((res) => {
        
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     console.log(err);
    //   })
  }, [])


  React.useEffect(() => {
    const notes = [
      // { _id: 0, name: "Морковка", text: "chjxyj gjcflbnm" },
      // { _id: 1, name: "Огурцы", text: "cj,hfnm b pfcjkbnm"  },
    ]
    setNotes(notes)
    // api.getInitialNotes()
    //   .then((res) => {
        
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     console.log(err);
    //   })
  }, [])

  // React.useEffect(() => {
  //   api.getInitialNotes()
  //     .then((res) => {
  //       const notes = [
  //         { "_id": 0, "name": "Морковка" },
  //         { "_id": 1, "name": "Огурцы" },
  //       ]
  //       setNotes(notes)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       console.log(err);
  //     })
  // }, [])

  React.useEffect(() => {
    api.loadUserInfo()
      .then((res) => {

        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  const handleCardLike = (card) => {
    //console.log(api.changeLikeCardStatus)
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {

      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => {
      console.log(err);
    });
  }

  const handleCardDelete = (card) => {
    // if (card.owner._id === currentUser._id) {
    //   api.deleteCard(card._id)
    //     .then(() => {
    //       const cardsCopy = cards.filter(elem => elem._id !== card._id);
    //       setCards(cardsCopy)
    //     }
    //     )
    //     .catch((err) => {
    //       console.log(err);
    //     })
    // }
    for (let i = 0; i < cards.length; ++i) {
      console.log(card)
      if (card._id === cards[i]._id) {
        cards.splice(i, 1)
        console.log(cards)
      }
      setCards(cards);
    }

  }

  const handleBedDelete = (bed) => {
    // if (card.owner._id === currentUser._id) {
    //   api.deleteCard(card._id)
    //     .then(() => {
    //       const cardsCopy = cards.filter(elem => elem._id !== card._id);
    //       setCards(cardsCopy)
    //     }
    //     )
    //     .catch((err) => {
    //       console.log(err);
    //     })
    // }
    for (let i = 0; i < beds.length; ++i) {
      console.log(bed)
      if (bed._id === beds[i]._id) {
        beds.splice(i, 1)
      }
      setBeds(beds);
    }

  }

  const handleNoteDelete = (note) => {
    // if (card.owner._id === currentUser._id) {
    //   api.deleteCard(card._id)
    //     .then(() => {
    //       const cardsCopy = cards.filter(elem => elem._id !== card._id);
    //       setCards(cardsCopy)
    //     }
    //     )
    //     .catch((err) => {
    //       console.log(err);
    //     })
    // }
    for (let i = 0; i < notes.length; ++i) {
      if (note._id === notes[i]._id) {
        notes.splice(i, 1)
      }
      setNotes(notes);
    }

  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleAddBedClick = () => {
    setIsAddBedPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    // console.log('click')
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }
  const handleAddNoteClick = () => {
    setIsAddNotePopupOpen(true)
  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsErrorPopupOpened(false)
    setIsSuccessPopupOpened(false)
    setIsAddBedPopupOpen(false)
    setIsAddNotePopupOpen(false)
  }

  // const handleCardClick = (card) => {
  //   setSelectedCard(card)

  // }

  const handleUpdateAvatar = (link) => {

    api.changeAvatar(link)
      .then(() => {
        setCurrentUser({ ...currentUser, avatar: link.avatar })
        setIsEditAvatarPopupOpen(false)
        //console.log(currentUser)
      })
      .catch((err) => {
        console.log(err);
      })

  }

  const handleUpdateUser = (data) => {
    api.editProfileINfo(data)
      .then((useData) => {
        setCurrentUser(useData)
        setIsEditProfilePopupOpen(false)
      })
      .catch((err) => {
        console.log(err);
      });

  }

  const handleAddPlaceSubmit = (newBed) => {
    setCards([newBed, ...cards]);
        //console.log(cards)
    setIsAddPlacePopupOpen(false)

  }

  const handleAddBedSubmit = (newBed) => {
    setBeds([newBed, ...beds]);
        //console.log(cards)
    setIsAddBedPopupOpen(false)


  }

  const handleAddNoteSubmit = (newBed) => {
    setNotes([newBed, ...notes]);
        //console.log(cards)
    setIsAddNotePopupOpen(false)

  }


  const tokenCheck = () => {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    localStorage.clear();
    const token = localStorage.getItem('token');

    if (token) {
      //console.log(token)
      // проверим токен
      Auth.getContent(token)
        .then((res) => {
          console.log(res)
          if (res) {

            // здесь можем получить данные пользователя!
            setUserData({
              username: res.name,
              email: res.email
            })
            console.log(userData)
            // поместим их в стейт внутри App.js
            setIsLogged(true)
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLogged(true)
  }

  React.useEffect(() => {
    tokenCheck()
  }, [])

  const changePage = (page) => {
    history.push(page);
  }

  const signOut = () => {

    localStorage.removeItem('token');
    setIsLogged(false)
    history.push('/sign-in');
  }

  const MainComponent = () => {




    return (<>
      <Header signOut={signOut} buttonText="Выйти" link="/sign-up" userEmail={userData.email} />
      <Main changePage={changePage} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
      <Footer />

      <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} onSubmit={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
      <PopupWithForm buttonText="Да" onClose={closeAllPopups} isOpen={false} title="Вы уверены?" name="delete-card" />
    </>)
  }

  const handleSubmitLogin = (e, email, password, setEmail, setPassword) => {
    e.preventDefault()
    Auth.authorise(email, password)
      .then((data) => {
        if (data.token) {
          setUserData({ email, password })
          setEmail('')
          setPassword('')
          handleLogin(e)

          history.push('/');
        }

      })
      .catch((err) => {
        console.log(err);
      });


  }

  const handleSubmitRegister = (e, email, password) => {
    e.preventDefault()
    Auth.register(email, password)
      .then((data) => {
        if (data) {
          setIsSuccessPopupOpened(true)
          history.push('/sign-in')
        } else {
          setIsErrorPopupOpened(true)
        }
      })
      .catch((err) => {
        setIsErrorPopupOpened(true)
        console.log(err);
      });
  }

  const planerComponent = () => {
    return (
      <>
        <Header signOut={signOut} buttonText="Выйти" link="/sign-up" userEmail={userData.email} />
        <Planer elements={cards} onAddItem={handleAddPlaceClick} onCardDelete={handleCardDelete} addNewItem={handleAddPlaceSubmit} />
        <Footer />
        <AddPlacePopup makeId={cards.length} onSubmit={handleAddPlaceSubmit} onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} />
      </>
    )
  }


  const gardenComponent = () => {
    return (
      <>
        <Header signOut={signOut} buttonText="Выйти" link="/sign-up" userEmail={userData.email} />
        <Garden onNoteDelete={handleNoteDelete} onBedDelete={handleBedDelete} beds={beds} notes={notes} onAddBed={handleAddBedClick} onAddNote={handleAddNoteClick}/>
        <Footer />
        <AddBedPopup makeId={beds.length}   onSubmit={handleAddBedSubmit} onClose={closeAllPopups} isOpen={isAddBedPopupOpen}/>
        <AddNotePopup makeId={notes.length}   onSubmit={handleAddNoteSubmit} onClose={closeAllPopups} isOpen={isAddNotePopupOpen}/>
      </>
    )
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="App">

        <div className="page">
          <InfoTooltip title="Что-то пошло не так! Попробуйте ещё раз." name="modal" isOpen={isErrorPopupOpened} onClose={closeAllPopups} image={error} />
          <InfoTooltip title="Вы успешно зарегистрировались!" name="modal" isOpen={isSuccessPopupOpened} onClose={closeAllPopups} image={union} />
          <Switch>
            <Route path="/sign-up">
              <Register handleSubmit={handleSubmitRegister} />
            </Route>
            <Route path="/sign-in">
              <Login handleSubmit={handleSubmitLogin} setLogged={setIsLogged} handleLogin={handleLogin} userEmail={userData.email} setUserData={setUserData} />
            </Route>
            <ProtectedRoute
              path="/garden"
              loggedIn={isLogged}
              component={gardenComponent}
            />

            <ProtectedRoute
              path="/planer"
              loggedIn={isLogged}
              component={planerComponent}
            />
            <ProtectedRoute
              path="/"
              loggedIn={isLogged}
              component={MainComponent}
            />
            {/* s */}


            <Route>
              {isLogged ? (
                <Redirect to="/" />
              ) : (
                <Redirect to="/sign-in" />
              )}
            </Route>
          </Switch>

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
