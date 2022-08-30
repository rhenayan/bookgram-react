import React from 'react'
import Skeleton from 'react-loading-skeleton'

const skeletonLoading = () => {
  return (
    <section>
        <div>
            <Skeleton duration={1} height = {400} width={350}/>
        </div>
        <ul>
            
        </ul>
    </section>
  )
}

export default skeletonLoading