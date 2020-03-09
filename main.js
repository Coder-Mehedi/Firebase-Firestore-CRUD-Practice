const cafeList = document.getElementById('cafe-list')
const form = document.getElementById('add-cafe-form')

// Create Element and render cafe
const renderCafe = doc => {
    let li = document.createElement('li')
    let name = document.createElement('span')
    let city = document.createElement('span')
    let cross = document.createElement('div')
    let edit = document.createElement('div')

    li.setAttribute('data-id', doc.id)
    edit.setAttribute('id', 'edit')
    edit.classList.add('edit')

    name.textContent = doc.data().name
    city.textContent = doc.data().city
    cross.textContent= 'x'
    edit.textContent = 'Edit'

    li.appendChild(name)
    li.appendChild(city)
    li.appendChild(cross)
    // li.appendChild(edit)
    cafeList.appendChild(li)
    

    // Deleting Data
    cross.addEventListener('click', e => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id')
        db.collection('cafes').doc(id).delete()
        
    })
}

// Getting Data
// db.collection('cafes').get().then(snapshot => {
//     snapshot.docs.forEach(doc => renderCafe(doc))
// })

// where and order by
// db.collection('cafes').where('city', '==', 'MarioLand').orderBy('name').get().then(snapshot => {
//     snapshot.docs.forEach(doc => renderCafe(doc))
// })


// Saving Data
form.addEventListener('submit', e => {
    e.preventDefault()
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    })
    form.name.value = ''
    form.city.value = ''
})


// Real-Time Listner
db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderCafe(change.doc)
        } else if (change.type == 'removed') {
            let li = cafeList.querySelector(`[data-id=${change.doc.id}]`)
            cafeList.removeChild(li)
        }
    })

    // const editButton = document.querySelector('.edit')

    // editButton.addEventListener('click', e => {
    //     let id = e.target.parentElement.getAttribute('data-id')
    //     // db.collection('cafes').doc(id).update({
    
    //     // })
    //     console.log(id);
        
    // })
    
})

// Update




