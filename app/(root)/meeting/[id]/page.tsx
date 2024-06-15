import React from 'react'

type Props = {
  params:{
    id: string;
  }
}

const Meeting = ({params}: Props) => {
  return (
    <div>
      {params.id}
    </div>
  )
}

export default Meeting