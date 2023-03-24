import {useGlobalContext} from "../Context";
import {BsHandThumbsUpFill} from "react-icons/bs";


function Meals() {
    const { loading, meals, selectMeal, addToFavorites } = useGlobalContext();
    if(loading) {
        return (<section className="section">
                <h4>Loading ...</h4>
            </section>
        )
    }
    if(!meals) {
        return (<section className="section">
            <h4>No Item Found</h4>
        </section>)
    }
    return (
        <section className="section-center">
            {
                meals.map((meal) => {
                    const {idMeal: id, strMeal: title, strMealThumb: image} = meal
                   return <article key={id} className="single-meal" >
                        <img src={image} style={{width: '100%'}} alt={title} className="img" onClick={() => selectMeal(id)} />
                        <footer>
                           <h5>{title}</h5>
                           <button className="like-btn" onClick={() => addToFavorites(id)}><BsHandThumbsUpFill /></button>
                        </footer>
                       </article>
                    }
                )
            }
        </section>
    )
}

export default Meals