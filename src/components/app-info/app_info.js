import './app_info.css'

const AppInfo = ({allMoviesCount, favoriteMovieCount}) => {
    return(
        <div className='app_info font-monospace'>
            <p className='fs-1'>BARCHA KINOLAR SONI: {allMoviesCount} </p>
            <p className='fs-4'>SEVIMLI FILM: {favoriteMovieCount} </p>
        </div>
    )
}
export default AppInfo 