import '../css/card.css'
import { NavLink, useNavigate } from 'react-router-dom';
export const Card = (props) => {
  const navigate = useNavigate()
  return (
    <>
      {/* <div class="card" >
        <img src={'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/5098/9781509858637.jpg'} class="card-img-top" style={{ height: '11rem' }} />
        <div class="card-body">
          <p class="card-title" style={{ fontWeight: 'bold' }}>This is going to hurt</p>
          <p class="card-text" style={{ color: '#616161' }}>Author name</p>
        </div>
      </div> */}
      <div class="card" onClick={() => {
        navigate('/dashboard/books/book-details', { state: props })
      }}>
        <img src={props.data.image} class="card-img-top" style={{ height: '15rem' }} />
        <div class="card-body">
          <p class="card-title">{props.data.name}</p>
          <p class="card-text">{props.data.author}</p>
        </div>
      </div>
    </>
  )
}