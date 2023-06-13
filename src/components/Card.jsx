import React from 'react'
import '../styles/card.css'

const Card = ({data,onclick}) => {
  return (
    <div className='cardContainer' onClick={onclick}>
        <div>
        Name: {data.name}
        {data.card_type === 'burner'? <p>Exipry :{data.expiry}</p>:<p>Subscription : {data.limit}</p>}
        </div>
      <div>Card Type: {data.card_type}</div>
    </div>
  )
}

export default Card