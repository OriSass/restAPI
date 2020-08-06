  let mainList = document.getElementById("list")
  let button = document.getElementById("button")
  let newItem = document.getElementById("item")

  
  
  button.addEventListener("click", () => {
    let newProduct = newItem.value
    newListItem (newProduct)
    addItemStorage (newProduct)
})

const storedItem = async (item) => {
    const { data } = await axios.get(`http://localhost:3000/products`)
    
    let newItems= data;
    newItems.forEach(element => {
    let name = element.name
    newListItem (name)
    });
}

const addItemStorage = async (item) => {
     await axios({
        method: 'post',
        url: 'http://localhost:3000/products',
        data: {
          name: item
        }
      });
}

function newListItem (name) {
    let item = name
    newItem.value = ""
    console.log(item)
    let newListItem = document.createElement("li")
    let newSpan = document.createElement("span")
    let newButton = document.createElement("button")

    newSpan.innerHTML = item
    newButton.innerHTML = "Delete"

    mainList.appendChild(newListItem)
    newListItem.appendChild(newSpan)
    newListItem.appendChild(newButton)

    newButton.addEventListener("click", function () {
      newListItem.remove()
      let delItem = newSpan.innerText
      console.log(delItem)
      deleteItemStorage(delItem)
    })
    newItem.focus()
  };

const deleteItemStorage = async (item) => {
    const { data } = await axios.get(`http://localhost:3000/products`)
    let delId = '';
    let newItems= data;
    newItems.forEach(element => {
        let name = element.name
        if (name === item){
            return delId=element.id
        } 
    });
    console.log(delId)
     await axios({
        method: 'delete',
        url: `http://localhost:3000/products/${delId}`
      });
}


  storedItem ()