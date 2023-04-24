const getAllPlants = () => {
    console.log("PlantService")
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/plants')
}

const PlantService = {
    getAllPlants
}

export default PlantService;