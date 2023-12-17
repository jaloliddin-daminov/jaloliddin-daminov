import "./app.css"
import { useState, useEffect } from "react"
import AppInfo from "../app-info/app_info"
import AppFilter from "../app_filter/app_filter"
import SearchPanel from "../search_panel/search_panel"
import MovieLIst from "../movie-list/movie-list"
import MoviesAddForm from "../movies-add-form/movies-add-form"
import { v4 as uuidv4 } from 'uuid';


const App = () => {
    const [data , setData] = useState([])
    const [term, setTerm] = useState('')
    const [filter, setFilter] = useState('all')
    const [isLoading, setIsLoading] = useState(false) 


    const onDelete = id => {
        setData(data.filter(c => c.id !== id))
    }

    const addForm = item => {
        const newItem = {name: item.name, viewers: item.viewers, id: uuidv4(), favorite: false, like : false }
        const newArr = [...data, newItem]
        setData(newArr)
    }

    const onToggleProp = (id, prop) => {
        const newArr = data.map(item => {
            if(item.id === id){
                return{...item, [prop] : !item[prop]}
            }
            return item 
        })
        setData(newArr)
    }

    const searchHandler = (arr, term) => {
        if(term === 0){
            return arr
        }
        return arr.filter(item => item.name.toLowerCase().indexOf(term) > -1) 
    }
    const filterHandler = (arr, filter) => {
        switch(filter){
            case "popular":
                return arr.filter(c => c.like)
            case 'mostViewers':
                return arr.filter(c => c.viewers > 800)
            default: 
                return arr
        }
    }

    const updateTermHandler = term => setTerm(term)
    const updateFilterHandler = filter => setFilter(filter)

    useEffect(() => { 
        setIsLoading(true) 
        fetch('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5')
          .then(response => response.json())
          .then(json => {
            const newArr = json.map(item => ({name : item.title, id: item.id, viewers: item.id * 203, favorite: false, like: false,}))
            setData(newArr)
          })
          .catch(err => console.log(err))
          .finally(() => setIsLoading(false))
      },[]) 

    return(
        <div className="app">
            <div className="content">
                <AppInfo  allMoviesCount={data.length} favoriteMovieCount={data.filter(c => c.favorite).length} />
                <div className="search-panel">
                    <SearchPanel updateTermHandler={updateTermHandler} />
                    <AppFilter filter={filter} updateFilterHandler={updateFilterHandler} />
                </div>
                {isLoading && "Loading"}
                <MovieLIst  onToggleProp={onToggleProp} data={filterHandler(searchHandler(data, term ), filter )} onDelete={onDelete} /> 
                <MoviesAddForm addForm={addForm} />
            </div>
        </div>
    )

    
}   
export default App 