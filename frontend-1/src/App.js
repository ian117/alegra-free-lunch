import { useEffect, useState } from "react"

function App() {
  /**
   *  Button -> Place Order
   */

  const [placeOrder, setPlaceOrder] = useState([])
  const [loadingPlaceOrder, setLoadingPlaceOrder] = useState(false)

  const postOrder = () => {
    setLoadingOrders(true)
    fetch('http://localhost:3000/orders',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },})
      .then(response => response.json())
      .then(data => setPlaceOrder(data))
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => {
        setLoadingOrders(false)
      })
  };

  /**
   *  Tables ->
   */
  const [loadingOrders, setLoadingOrders] = useState(true)

  const [orders, setOrders] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [shoppingHistory, setShoppingHistory] = useState([])
  const [recipes, setRecipes] = useState([])

  // const [users, setUsers] = useState([])
  // const [loadingUsers, setLoading] = useState(false)

  useEffect(() => {
  
    /**
     * Orders
     */
    fetch("http://localhost:3000/orders?size=20&created_at_order=DESC")
      .then(response => response.json())
      .then(json => setOrders(json.results))
      .catch(error => console.log(error))
    
    /**
     * Ingredients
    */
    fetch("http://localhost:3000/ingredients")
      .then(response => response.json())
      .then(json => setIngredients(json.results))
      .catch(error => console.log(error))
  
    /**
     * Shopping History
    */    
    fetch("http://localhost:3000/shopping-history?size=35&created_at_order=DESC")
      .then(response => response.json())
      .then(json => setShoppingHistory(json.results))
      .catch(error => console.log(error))
  
    
    /**
     * Recipes
    */
    fetch("http://localhost:3000/recipes")
      .then(response => response.json())
      .then(json => setRecipes(json.results))
      .catch(error => console.log(error))
  
  }, [loadingOrders])


  return (
    <div className="App">
    
      <div>
        <h4>¡Hi! Gracias por pasar a ver la Demo básica de la API💚</h4>
        <h4>Dejé el front lo más basico posbile simplemente por tiempos💻😅😋</h4>
        <h4>Les dejé una lista de endpoints y sus opciones en el readme.md (Hubiera usado swagger pero estoy algo ocupado con otros proyectos, sorry🙈😂)</h4>
        <h4>No tengo problemas con hacer front, pero le di más atención al back para resaltar los requerimientos🧡👌</h4>
        <br></br>
        <h4>Enserio me gustaría poder aportarles algo al equipo, creo que podría poner mi granito de arena y mucha dedicación❤️💪😣🤙❤️</h4>
        <br></br>
      </div>

      <hr></hr>
      <br></br>
      
      
      <div className="box">
        <button onClick={postOrder}>Empieza ordenando algo 🥞🧀🍖</button>
        {placeOrder && (
          <div>
            {/* Renderiza la respuesta */}
            <pre>{JSON.stringify(placeOrder, null, 2)}</pre>
          </div>
        )}
      </div>

      <hr></hr>


      {loadingOrders ? (
        <div className="box" >🖥️</div>
      ) : (
        <>
          <div className="box" ><h1>Orders</h1><h4>20 Most Recents</h4></div>
          <div className="box" >
            <table border={1}>
              <tr>
                <th>id</th>
                <th>status</th>
                <th>recipe name</th>
                <th>created at</th>
              </tr>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.status}</td>
                  <td>{order.recipe.name}</td>
                  <td>{order.created_at}</td>
                </tr>
              ))}
            </table>
          </div>
        </>
      )}
      

      <br></br>
      <hr></hr>
      <br></br>

      {loadingOrders ? (
        <div className="box" >🖥️</div>
      ) : (
        <>
          <div className="box" ><h1>Orders</h1><h4>20 Most Recents</h4></div>
          <div className="box" >
            <table border={1}>
              <tr>
                <th>id</th>
                <th>status</th>
                <th>recipe name</th>
                <th>created at</th>
              </tr>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.status}</td>
                  <td>{order.recipe.name}</td>
                  <td>{order.created_at}</td>
                </tr>
              ))}
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default App