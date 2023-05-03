const container = document.querySelector('.conteiner')
const search = document.querySelector('.search-box button')
const wheatherBox = document.querySelector('.weather-box')
const wheatherDetails = document.querySelector('.weather-details')
const error404 = document.querySelector('.not-found')

search.addEventListener('click', () => {
    const APIKey = '728b0ee6df5687559812bd3169ad77b7'
    const city = document.querySelector('.search-box input').value

    if (city === '')
    return

    fetch
})