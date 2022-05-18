import { Card } from '../card';
import { CardNew } from '../cardNew';
import '../../css/card.css';
// import '../../css/cardspanel.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const CardsPanel = ({ data }) => {

  const bookList = data.map((book, index) =>
  <tr key ={book._id}>
    <th scope ="row"></th>
    <Card data ={book}/>
  </tr>)

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4.5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }
  console.log(data);
  return (
    <div className='tops'>

      <div className='row'>

        {data.length == 0 ? <img src={require('../../css/no-data.png')} style={{ width: '500px', height: '500px' }} /> : <>
          <h5 className='category'>{data[0].category}</h5>
          <Carousel responsive={responsive}
            draggable={false}
            swipeable={false}
            autoPlay={false}
            autoPlaySpeed={10000000000}
          >
            {bookList}
{/* 
            <Card image={data[0].image}
              name={data[0].name}
              author={data[0].author}
              isbn={data[0].isbn}
            />
            <Card image={data[1].image}
              name={data[1].name}
              author={data[1].author}
              isbn={data[1].isbn}
            />
            <Card image={data[2].image}
              name={data[2].name}
              author={data[2].author}
              isbn={data[2].isbn}
            />
            <Card image={data[3].image}
              name={data[3].name}
              author={data[3].author}
              isbn={data[3].isbn}
            />
            <Card image={data[4].image}
              name={data[4].name}
              author={data[4].author}
              isbn={data[4].isbn}
            />
            <Card image={data[5].image}
              name={data[5].name}
              author={data[5].author}
              isbn={data[5].isbn}
            />
            <Card image={data[6].image}
              name={data[6].name}
              author={data[6].author}
              isbn={data[6].isbn}
            />
            <Card image={data[7].image}
              name={data[7].name}
              author={data[7].author}
              isbn={data[7].isbn}
            />
            <Card image={data[8].image}
              name={data[8].name}
              author={data[8].author}
              isbn={data[8].isbn}
            />
            <Card image={data[9].image}
              name={data[9].name}
              author={data[9].author}
              isbn={data[9].isbn}
            /> */}
            {/* <Card /> */}

          </Carousel>
        </>}
      </div>
      
      {/* <div class="shelf">

        <div class="bookend_left"></div>
        <div class="bookend_right"></div>
        <div class="reflection"></div>

      </div>
   */}
      <hr />
    </div>
  )
}