import { nanoid } from '@reduxjs/toolkit'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPhotos } from './galleryState'

function App() {
  const dispatch = useDispatch()
  const { isLoading, photos } = useSelector((state) => state.gallery)

  const [value, setValue] = useState(8)

  useEffect(() => {
    dispatch(getPhotos(value))
  }, [dispatch, value])

  const loadMorePhotos = () => {
    setValue(value + 4)
  }

  return (
    <div className="App">
      <h1>PHOTO GALLERY</h1>
      <p>This is a photo gallery made using redux toolkit and redux thunk</p>
      <hr />
      <div className="Gallery">
        {photos.map((photo) => {
          const { download_url, author } = photo
          return <img src={download_url} alt={author} key={nanoid()} />
        })}
      </div>
      {isLoading ? <div className="loading"></div> : null}
      <button onClick={loadMorePhotos} disabled={isLoading ? true : false}>
        VIEW MORE
      </button>
    </div>
  )
}

export default App
