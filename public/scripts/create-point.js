const allItems = document.querySelectorAll(".item");
const hiddenInput = document.getElementById("itemSelection");
let selectedItems = [];

for (i = 0; i < allItems.length; i++) {
    allItems[i].addEventListener("click", (event) => {
        event.target.classList.toggle("selected")
        if (selectedItems.includes(event.target.id)){
            for (i = 0; i < selectedItems.length; i++) { 
                if ( selectedItems[i] === event.target.id ) { 
                    selectedItems.splice(i,1); 
                    i--;
                } 
            }
        } else {
            selectedItems.push(event.target.id);
        }
        console.log(selectedItems)
        var strings = namedItems(selectedItems);
        console.log(strings)
        hiddenInput.value = strings;
    })
}

function toggleDisplay() {
    var wildcard = document.getElementById("registered")
    wildcard.style.display = "flex";
}

function namedItems(selectedItems) {
    let literals = [];
    const reference = {
        '1': ' Light bulbs',
        '2': ' Batteries',
        '3': ' Paper and cardboard',
        '4': ' Electronics',
        '5': ' Organic',
        '6': ' Cooking oil'
    };

    for (index in reference) {
        if (selectedItems.includes(index)) {
            literals.push(reference[index]);
        }
    }

    return literals;
}