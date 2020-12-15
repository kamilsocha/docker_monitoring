import Movie from "../models/Movie"
import UserMovieCatalogItem from "../models/UserMovieCatalogItem"

const basePath = "C:/var/movies/"

export const MOVIES = [
  new Movie(1, "Baby Driver", ".....", `${basePath}/baby_driver.jpg`),
]

export const USER_CATALOG_ITEMS = []
