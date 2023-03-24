import {useGlobalContext} from "../Context";

function Favourite() {
    const {favorites, selectMeal, removeFromFavorites} = useGlobalContext()

    return (<section className="favorites">
            <div className="favorites-content">
                <h5>Favorites</h5>
                <div className="favorites-container">
                    {
                        favorites.map((favorite) => {
                            const {idMeal: id,  strMealThumb: image} = favorite
                            return <div key={id} className="favorite-item">
                                <img src={image} alt={id} className="favorites-img img" onClick={() => selectMeal(id, true)}/>
                                <button className="remove-btn" onClick={() => removeFromFavorites(id)}>
                                    Remove
                                </button>
                            </div>
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default Favourite