import React, {useState} from "react";
import StartPage from "./components/StartPage";
import OptionsPage from "./components/OptionsPage";
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import NavbarBrand from "react-bootstrap/esm/NavbarBrand"
import Nav from 'react-bootstrap/Nav'
import NavItem from 'react-bootstrap/NavItem'
import Container from 'react-bootstrap/Container'

const App = (props) => {
   const [page, setPage] = useState(1)

   // Event handlers
   // Next page (testing purposes)
   const nextPage = () => {
      if (page !== 2) {
         setPage(page + 1)  
      }
   }

   //Previous page (testing purposes)
   const previousPage = () => {
      if (page !== 1) {
         setPage(page - 1)
      }
   } 
   
   // Switch statement to show different pages
   const renderSwitch = (page) => {
     switch (page) {
         case 1:
           return <StartPage 
               nextPage={nextPage}
               prevPage={previousPage}
           />
         case 2:
            return <OptionsPage 
               nextPage={nextPage}
               prevPage={previousPage}
            /> 
         default:
            console.log('default from renderSwitch')
     }
   }

   return(
      <div className="container">
         <Navbar bg="primary">
            <Container>
               <NavbarBrand >Festarilippu</NavbarBrand>
               <Nav>
                  <NavItem>
                  <Button onClick={previousPage} >edellinen</Button>
                  </NavItem>
                  <NavItem>
                  <Button onClick={nextPage} >seuraava</Button>
                  </NavItem>
               </Nav>
            </Container>
         </Navbar>
         {renderSwitch(page)}
      </div>
   )
}

export default App;