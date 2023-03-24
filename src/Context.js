import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import favourite from "./components/Favourite";

const AppContext = React.createContext();

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php"

const AppProvider = ({children}) => {
    const getFavoritesFromStorge = () => {
        let favorites = localStorage.getItem("favorites")
        if(favorites) {
            favorites = JSON.parse(favorites)
        } else {
            favorites = []
        }
        return favorites
    }

    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedMeal, setSelectedMeal] = useState(null)
    const [favorites,setFavorites] = useState(getFavoritesFromStorge)



    const fetchRandomMeal = () => {
        fetchMeals(randomMealUrl);
    }
    const fetchMeals = async (url) => {
        setLoading(true)
        try {
            const response = await axios(url);
            setMeals(response.data.meals)
        } catch (err) {
            console.log(err.response)
        }
        setLoading(false)
    }

    const selectMeal = (idMeal, favouriteMeal) => {
        let meal;
        if(favouriteMeal) {
            meal = favorites.find((meal) => meal.idMeal === idMeal)
        } else {
            meal = meals.find((meal) => meal.idMeal === idMeal)
        }
        setSelectedMeal(meal)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const addToFavorites = (idMeal) => {
        const meal = meals.find((meal) => meal.idMeal === idMeal)
        const isFavorite =favorites.find((meal) => meal.idMeal === idMeal)
        if(isFavorite) return
        const updatedFavorite = [...favorites, meal]
        setFavorites(updatedFavorite)
        localStorage.setItem("favorites", JSON.stringify(updatedFavorite))
    }
    const removeFromFavorites = (idMeal) => {
        const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
        setFavorites(updatedFavorites)
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    }

    useEffect( () => {
        fetchMeals(allMealsUrl)
    }, [])
    useEffect(() => {
        if(!searchTerm) return
        fetchMeals(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm])
    return <AppContext.Provider value={{ loading, meals, setSearchTerm, fetchRandomMeal,
        showModal, selectedMeal, selectMeal, closeModal, favorites, addToFavorites, removeFromFavorites}}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }