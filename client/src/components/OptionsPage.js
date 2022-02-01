import React, { useEffect, useState } from "react"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

const baseUrl =  'http://localhost:5000/api'

const OptionsPage = (props) => {
   const [days, setDays] = useState(0)
   const [services, setServices] = useState([])
   const [prices, setPrices] = useState([])
   const [orderPrice, setOrderPrice] = useState(0)

   // Get prices from the server when component is rendered
   useEffect( () => {
      axios
         .get(`${baseUrl}/prices`)
         .then(response => setPrices(response.data))
   }, [])

   // calculate discount
   const calcDiscount = (val, disc) => val - val * (disc / 100)

   // Event handlers
   // Day change
   const handleDayChange = (event) => {
      const request = {
         "days": parseInt(event.target.value),
         "selections": services
      }
      setDays(parseInt(event.target.value)) 
      axios
         .post(`${baseUrl}/calcTicketSum`,request)
         .then(response => setOrderPrice(response.data.ticketSum))
   } 

   // service change
   const handleServices = (event) => {
      if (event.target.checked) {
         const request = {
            "days": days,
            "selections": services.concat(event.target.id)
         }
         setServices(services.concat(event.target.id))
         axios
         .post(`${baseUrl}/calcTicketSum`,request)
         .then(response => setOrderPrice(response.data.ticketSum))
      } else {
         const request = {
            "days": days,
            "selections": services.filter(id => id !== event.target.id)
         }
         setServices(services.filter(id => id !== event.target.id))
         axios
         .post(`${baseUrl}/calcTicketSum`,request)
         .then(response => setOrderPrice(response.data.ticketSum))
      }
   }

   return (
      <div>
         <Card>
            <Card.Body>
               <Card.Title>
                     Valintasivu
               </Card.Title>
               <Card.Text>
                  Valintasivun teksti
               </Card.Text>
               <Card>
                  <Card.Body>
                        <Form>
                        <Form.Select
                           aria-label="Default select example"
                           className="mb-3"
                           onChange={handleDayChange}
                        >
                           <option value="0">Valitse lipputyyppi</option>
                           <option value="1">Yhden päivän lippu</option>
                           <option value="2">Kahden päivän lippu</option>
                           <option value="3">Kolmen päivän lippu</option>
                        </Form.Select>
                        <Form.Group>
                           <Form.Check 
                              type="checkbox"
                              id="majoitus"
                              label="Majoitus"
                              onChange={handleServices}
                           />
                           <Form.Check 
                              type="checkbox"
                              id="suihku"
                              label="Suihkupalvelu"
                              onChange={handleServices}
                           />
                           <Form.Check 
                              type="checkbox"
                              id="lounas"
                              label="Festarilounas"
                              onChange={handleServices}
                           />
                           </Form.Group>
                        </Form>
                  </Card.Body>
                  </Card>
               <Card>
                  <Card.Body>
                     <div>
                        <h4>Hinnasto</h4>
                        <ul>
                           <li>{`1 päivän lippu: ${prices.paivalippu}€`}</li>
                           <li>
                              {`2 päivän lippu: ${calcDiscount(prices.paivalippu * 2, prices.alennus2pv)}€`}
                           </li>
                           <li>
                              {`3 päivän lippu: ${calcDiscount(prices.paivalippu * 3, prices.alennus3pv)}€`}
                           </li>
                           <li>{`Majoitus: ${prices.majoitus}€`}</li>
                           <li>{`Suihkupalvelu: ${prices.suihku}€`}</li>
                           <li>{`Festarilounas: ${prices.lounas}€`}</li>
                        </ul>
                     </div>
                  </Card.Body>
                  </Card>
               <Card>
                  <Card.Body>
                       {`Paketin kokonaishinta: ${orderPrice}€`}
                  </Card.Body>
               </Card>
            </Card.Body>
         </Card>
     </div>
  )
}

export default OptionsPage