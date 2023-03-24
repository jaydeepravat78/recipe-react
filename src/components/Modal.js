import {useGlobalContext} from "../Context";

function Modal() {
    const { selectedMeal, closeModal } = useGlobalContext();
    const { strMeal: title, strMealThumb: image, strInstructions: recipe, strSource: source } = selectedMeal;
    return (<aside className="modal-overlay">
            <div className="modal-container">
                <img src={image} alt={title} className="img modal-img"/>
                <div className="modal-content">
                    <h4>{title}</h4>
                    <p>Cooking Instructions</p>
                    <p> {recipe}</p>
                    <a href={source} target="_blank">Orignal Source</a>
                    <button className="btn btn-hipster close-btn" onClick={closeModal}>Close</button>
                </div>
            </div>
        </aside>
    )
}

export default Modal