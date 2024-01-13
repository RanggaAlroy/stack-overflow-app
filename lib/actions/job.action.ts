'use server'

import { JobFilterParams } from "./shared.types";

export const fetchLocation = async () => {
    const response = await fetch('http://ip-api.com/json/?fields=country')
    const location = await response.json()
    return location.country;
}

export const fetchCountries = async () => {
    try {
        const rensponse = await fetch('https://restcountries.com/v3/all')
        const result = await rensponse.json()
        return result
    } catch (error) {
        console.log(error)
        
    }
}

export const fetchJobs = async (filters: JobFilterParams) => {
    const {query, page} = filters

    const headers = {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY ?? "",
        "X-RapidAPI-Host": "inkedin-jobs-scraper-api.p.rapidapi.com",
    }

    const response = await fetch(`https://linkedin-jobs-scraper-api.p.rapidapi.com/search?query=${query}&page=${page}`,
    {
        headers,
    })

    const result = await response.json()
    console.log(result)
    return result.data;
}