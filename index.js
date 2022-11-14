const APIkey = "c5a3850c1e43b5e0245b77aa61458c8a"
const div = document.createElement('div')
const weatherSection = document.getElementById('weather')
const form = document.querySelector('form')
const input = document.querySelector('input')
const weatherSearch = document.getElementById('weather-search')
div.setAttribute('id', 'data')

form.onsubmit = async e => {
    e.preventDefault()
    weatherSection.prepend(div)
    const city = input.value.trim()
    if ((!city) || (weatherSearch.value = '')) {
        city = ''
        div.innerHTML = ''
        weatherSearch.value = ''
    }
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIkey}`)
        if (res.status !== 200) throw new Error('Location not Found')
        const data = await res.json()
        renderData(data)
    } catch (err) {
        div.innerHTML = err.message
    }
}

function renderData({
    dt,
    main: {
        temp,
        feels_like
    },
    name,
    sys: {
        country
    },
    coord: {
        lat,
        lon
    },
    weather: [{
        icon,
        description
    }]
}) {

    const locationMap = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
    const date = new Date((dt) * 1000)
    const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })

    weatherSearch.value = ''
    div.innerHTML =
        `<h2> ${name}, ${country} </h2>
    <a href = "${locationMap}" target="_BLANK">Click to View Map</a>
    <img src= "https://openweathermap.org/img/wn/${icon}@2x.png" alt="${name}"> </img>
    <p style="text-transform: capitalize">${description} </p>
    <p> Current: ${temp} °F  </p>
    <p> Feelslike: ${feels_like} °F </p>
    <p> Last Updated:${timeString} </p>
    `

}
