import { useEffect, useState } from 'react'
import { Navigate, Route , Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import HomePage from './pages/HomePage'
import { UserProvider ,useUser} from './context/UserContext'
import './App.css'
import History from './pages/History'
import Header from './components/Header'
import Footer from './components/Footer'
import Insights from './pages/Insights'
import InfinityLoader from './components/loader/InfinityLoader'

function App() {
const {user , loading} = useUser();
  // If loading, show a loading message or spinner
  if (loading) {
    return <div> <InfinityLoader /> </div>;
  }

  
  return (
    <>
    {user &&  <Header />}
  <Routes>
    <Route path="/" element={ user? <HomePage /> : <Navigate to={'/get-started'} />} />
    <Route path="/history" element={ user? <History /> : <Navigate to={'/get-started'} />} />
    <Route path="/insights" element={ user? <Insights /> : <Navigate to={'/get-started'} />} />
    <Route path="/get-started" element={ !user? <SignIn /> : <Navigate to={'/'} />}  />
  </Routes>
 { user && <Footer />}
  </>

  )
}

export default App
