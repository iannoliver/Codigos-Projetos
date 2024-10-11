function addInput() {
    const ul = document.getElementById('inputs')
  
    const newLi = document.createElement('li')
    newLi.className = 'list-item'
    newLi.innerText = 'Novo input: '

    
    //innerHTML permite criar tava diretamente do javascript porém é perigoso pois qualquer pessoa pode mecher e bagunçar o código
    //innerText = texto dentro de um tag ou variável

    const newInput = document.createElement('input')
    newInput.type = 'text'
    newInput.name = 'input'

    newLi.appendChild(newInput)
    ul.appendChild(newLi)
  }