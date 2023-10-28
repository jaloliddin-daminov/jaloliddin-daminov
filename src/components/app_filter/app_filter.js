import "./app_filter.scss"

const AppFilter = ({updateFilterHandler, filter}) => {
    return(
        
        <div className="btn-group">
            {btnsArr.map(btn => (
                <button 
                    key={btn.name} 
                    onClick={() => updateFilterHandler(btn.name)} 
                    className={`btn ${filter === btn.name ? 'btn-dark' : 'btn-outline-dark'}`}
                >
                    {btn.label}
                </button>
            ))}
        </div>
    )
}

const btnsArr = [
    {name: "all", label: "Barcha kinolar"},
    {name: "popular", label: "Mashhur  kinolar"},
    {name: "mostViewers", label: "Eng ko'p ko'rilgan kinolar"},

]
export default AppFilter