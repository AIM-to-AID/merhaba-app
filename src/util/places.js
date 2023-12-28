const SECRET_APP_KEY = process.env.SECRET_APP_KEY
const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL

export const CODES = {
  HALAL_RESTAURANTS: 1,
  HALAL_GROCERY: 2,
  MOSQUES: 3,
  GENERAL_CLOTHING: 4,
  BUS_STATIONS: 5,
  BANKS: 6,
  GOVERNMENT_OFFICES: 7,
  HOUSING_ASSISTANCE: 8,
  PARKS: 9,
  ISLAMIC_CLOTHING: 10,
  MEDICAL: 11,
}

export async function findPlacesTest({code, location}) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        res({
          code,
          location,
          other: "you did it"
        })
      } else {
        rej("NO WAY")
      }
    }, 1000)
  })
}

export async function findPlaces({code, location}) {
  const url = `${BACKEND_URL}/find-places`
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-SECRET-APP-KEY": SECRET_APP_KEY
    },
    body: JSON.stringify({
      code,
      location
    })
  }

  const fetch_result = await fetch(url, options)
  const result = await fetch_result.json()
  return result
}

export async function placeDetails({placeId}) {
  const url = `${BACKEND_URL}/place-details`
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-SECRET-APP-KEY": SECRET_APP_KEY
    },
    body: JSON.stringify({
      placeId
    })
  }

  const fetch_result = await fetch(url, options)
  const result = await fetch_result.json()
  return result
}
