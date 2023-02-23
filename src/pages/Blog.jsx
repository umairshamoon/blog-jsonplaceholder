import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../ReduxStore/slices/blogSlice'

import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Pagination,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import LoaderComponent from '../components/Loader'

const Blog = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [filteredPosts, setFilteredPosts] = useState([])
  const [sortType, setSortType] = useState('asc')
  const { posts, isLoading } = useSelector((state) => state.blog)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts(pageNumber))
    setFilteredPosts(posts)
  }, [dispatch, pageNumber])

  useEffect(() => {
    if (posts.length) setFilteredPosts(posts)
  }, [posts])
  const handlePageChange = (event, value) => {
    setPageNumber(value)
  }

  const handleSort = (type) => {
    const sortedPosts = filteredPosts.slice().sort((a, b) => {
      if (a[type] < b[type]) {
        return sortType === 'asc' ? -1 : 1
      }
      if (a[type] > b[type]) {
        return sortType === 'asc' ? 1 : -1
      }
      return 0
    })
    setFilteredPosts(sortedPosts)
    setSortType(sortType === 'asc' ? 'desc' : 'asc')
  }

  const handleSearch = (event) => {
    const searchQuery = event.target.value
    setSearchText(searchQuery)
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredPosts(filtered)
  }

  return (
    <Grid containter spacing={2}>
      <TextField
        label='Search'
        value={searchText}
        onChange={handleSearch}
        sx={{ alignSelf: 'center', marginLeft: '30px', width: '80%' }}
      />
      <Grid
        sx={{
          marginLeft: 4,
          marginTop: 3,
          maxWidth: 200,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ marginRight: 3 }}>SORT</Typography>
        <IconButton onClick={() => handleSort('title')}>
          {sortType === 'asc' ? 'asc' : 'des'}
        </IconButton>
      </Grid>
      {isLoading ? (
        <Grid item xs={12} spacing={3}>
          <Grid container justify='center' spacing={5}>
            {filteredPosts.map((post) => (
              <Card sx={{ maxWidth: 350, margin: 10 }}>
                <CardContent key={post.id}>
                  <Typography variant='h5'>{post.title}</Typography>
                  <Typography color='text.secondary'>{post.body}</Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <Stack spacing={3} style={{ marginTop: '3rem' }}>
            <Pagination
              count={10}
              page={pageNumber}
              onChange={handlePageChange}
              shape='rounded'
              showFirstButton
              showLastButton
            />
          </Stack>
        </Grid>
      ) : (
        <LoaderComponent />
      )}
    </Grid>
  )
}

export default Blog
