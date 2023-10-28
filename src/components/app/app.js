import "./app.css"
import { Component } from "react"
import AppInfo from "../app-info/app_info"
import AppFilter from "../app_filter/app_filter"
import SearchPanel from "../search_panel/search_panel"
import MovieLIst from "../movie-list/movie-list"
import MoviesAddForm from "../movies-add-form/movies-add-form"
import { v4 as uuidv4 } from 'uuid';


 
class App extends  Component{
    constructor(props){
        super(props)
        this.state = {
            data : [
                {
                    name: "empire of osman",
                    viewers: 998,
                    favorite: false,
                    like: false,
                    id: 1
                },
                {
                    name: 'Ertugrul',
                    viewers: 789,
                    favorite: false,
                    like: false,
                    id: 2
                },
                {
                    name: "Omar",
                    viewers: 1091,
                    favorite: false ,
                    like: false,
                    id: 3, 
                }
            ],
            term: '',
            filter: 'all',
        }
    }

    onDelete = id => {
        this.setState(({data}) => ({
            data : data.filter(c => c.id !== id ),
        }))
    }

    addForm = item => {
        // e.preventDefault()
        const newItem = {name: item.name, viewers: item.viewers, id: uuidv4(), favorite: false, like : false }
        this.setState(({data}) => ({
            data: [...data, newItem ]
        }))
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data : data.map(item => {
                if(item.id === id){
                    return{...item, [prop] : !item[prop]}
                }
                return item 
            }),
        }))
    }

    searchHandler = (arr, term) => {
        if(term.length === 0){
            return arr
        }
        return arr.filter(item => item.name.toLowerCase().indexOf(term) > -1)
    }

    filterHandler = (arr, filter) => {
        switch(filter){
            case "popular":
                return arr.filter(c => c.like)
            case 'mostViewers':
                return arr.filter(c => c.viewers > 800)
            default: 
                return arr
        }
    }

    updateTermHandler = term => this.setState({ term })

    updateFilterHandler = filter => this.setState({ filter })

    render(){
        const  {data, term, filter} = this.state
        const   allMoviesCount = data.length
        const favoriteMovieCount = data.filter(c => c.favorite).length
        const visibleData = this.filterHandler(this.searchHandler(data, term), filter) 
        return(
            <div className="app">
                <div className="content">
                    <AppInfo  allMoviesCount={allMoviesCount} favoriteMovieCount={favoriteMovieCount} />
                    <div className="search-panel">
                        <SearchPanel updateTermHandler={this.updateTermHandler} />
                        <AppFilter filter={filter} updateFilterHandler={this.updateFilterHandler} />
                    </div>
                    <MovieLIst  onToggleProp={this.onToggleProp} data={visibleData} onDelete={this.onDelete} /> 
                    <MoviesAddForm addForm={this.addForm} />
                </div>
            </div>
        )
    }
}
export default App