import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material';
import PaginationUsers from './PaginationUsers';
import { IconBtn, IconBtnSubmenu } from './IconBtn';
import { faCaretDown, faCaretUp, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'


const UserData = () => {
  const [person, setPerson] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState(2);    //Same value as select defaultValue
  const [arrow, setArrow] = useState(true);
  
  const handleArrow = () => setArrow(!arrow);

  const handleChange = (e) => setCards(e.target.value);   //Trigger event when changing select value

  const handleModalEdit = () => { console.log("edit") }   //To manage edit form
  const handleModalDelete = () => { console.log("delete") }   //To delete a card info

  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await fetch(`https://randomuser.me/api/?page=${page}&results=${cards}&seed=abc`);
        const response = await data.json();
        setPerson(response.results);
        setTimeout(()=>setLoading(false), 500);
      }
      fetchData();
    }
    catch (error) {
      console.log(error)
    }
  }, [page, cards]); //When changing wehter the page or the select executes this useEffect

  if (loading) {
    return (<>
      <div className="container_load">
        <div className="container_load__loading">
          <label>Loading</label>
          <CircularProgress color="success" />
        </div>
      </div>
    </>)
  }
  else {
    return (<>
      <div className='container_users'>
        <div className="selector">
          <label>Cards per page:</label>
          <select onChange={handleChange} defaultValue="2">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="container-cards">
          {/* Curly brackets because we need to interpret the above code */
            person.map((element, id) => {
              return (
                <div className="container-cards__card" key={id}>
                  <div className="container-cards__card--up">
                    <div className="container-cards__card--up--left">
                      <img src={element.picture.large} />
                    </div>
                    <div className="container-cards__card--up--right">
                      <p>{element.name.first} {element.name.last}</p>
                      <div className="container-cards__card--up--right--age">
                        <label>Age: </label><p>{element.dob.age}</p>
                      </div>
                      <div className="container-cards__card--up--right--mobile">
                        <label>Mobile: </label><p>{element.cell}</p>
                      </div>
                      <div className="container-cards__card--up--right--phone">
                        <label>Phone: </label><p>{element.phone}</p>
                      </div>
                      <div className="container-cards__card--up--right--email">
                        <label>Email: </label><p>{element.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="container-cards__card--down">
                    <div className="container-cards__card--down--address">
                      <label>Address: </label><p>{element.location.street.number} {element.location.street.name}</p>
                    </div>
                    <div className="container-cards__card--down--city">
                      <label>City: </label><p>{element.location.city}</p>
                    </div>
                    <div className="container-cards__card--down--state">
                      <label>State: </label><p>{element.location.state}</p>
                    </div>
                    <div className="container-cards__card--down--country">
                      <label>Country: </label><p>{element.location.country}</p>
                    </div>
                  </div>
                  <div className='container-cards__card--button'>
                    <IconBtn classname={"card__deploy"} icon={arrow ? faCaretDown : faCaretUp} id={id} onClick={handleArrow} />
                    <div className="container-cards__card--button--options" id={`card_${id}`}>
                      <div className="container-cards__card--button--options--edit" onClick={handleModalEdit}>
                        <IconBtnSubmenu classname={"card__edit"} icon={faPencil} />
                        <label>Edit</label>
                      </div>
                      <div className="container-cards__card--button--options--delete" onClick={handleModalDelete}>
                        <IconBtnSubmenu classname={"card__delete"} icon={faTrashCan} />
                        <label>Delete</label>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>

      </div>

      <PaginationUsers setPage={setPage} />
    </>)
  }
}

export default UserData;