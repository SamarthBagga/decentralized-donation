import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ReactNebula } from "@flodlc/nebula";

function App() {
  return (
    <>
    <ReactNebula config={{
      starsCount: 250,
      starsRotationSpeed: 3,
      nebulasIntensity: 8,
    }} />
    <Header />
    <ToastContainer />
    <Outlet />
  </>
  )
}

export default App