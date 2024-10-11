function show() {
    const contactList = document.getElementById('contact-list')
    console.log(contactList)

    const listElements = document.getElementsByTagName('li')
    console.log(listElements)

    const contactInputs = document.getElementsByClassName('contact-input')
    console.log(contactInputs)

    const contacts = document.querySelectorAll('#contact-list > li > label')
    console.log(contacts)

    //tomar cuidado com o tipo de objeto que cada variavel retorna


    const contactL = document.getElementsByName('contact1')
    console.log(contactL)

    const firstContact = document.querySelector('#contact-list > li > label')
    console.log(firstContact)
}