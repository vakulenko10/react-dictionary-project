import React from 'react'

const Container = ({children}) => {
  return (
    <div className='relative max-w-[1240px] mx-auto box-border px-2 md:px-[10px]'>{children}</div>
  )
}

export default Container