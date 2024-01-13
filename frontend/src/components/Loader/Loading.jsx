import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
const Loading = () => {
  return (
    <div style={{margin:'auto',display:'flex',justifyContent:'center'}}>
      <ThreeDots
  visible={true}
  height="100"
  width="190"
  color="#A3E8FD"
  radius="20"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>
    
  )
}

export default Loading
