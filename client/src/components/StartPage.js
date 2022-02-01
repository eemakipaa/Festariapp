import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'

const StartPage = (props) => {
  return (
     <div>
        <Card>
           <Card.Body>
              <Card.Title>
                  Luo käyttäjä / kirjaudu sisään
              </Card.Title>
              <Card.Text>
                  Tällä sivulla luodaan uusi käyttäjä tai kirjaudutaan sisään olemassa
                  olevalla käyttäjällä.
              </Card.Text>
           </Card.Body>
        </Card>
     </div>
  )
}

export default StartPage