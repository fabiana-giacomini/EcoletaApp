
function populateUfs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then(res => res.json())
  .then(states => {
    for(state of states) {
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
  });
}

populateUfs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${ufValue}/microrregioes`;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text; // state name
  
  citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
  citySelect.disabled = true;

  fetch(url)
  .then(res => res.json())
  .then(cities => {
    for(city of cities) {
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }

    citySelect.disabled = false;
  });
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities); // execute only when changed


const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items");

let selectedItems = [];

function handleSelectedItem() {
  const itemLi = event.target;

  // add or remove class [.add() || .remove() || .toggle() ]
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id;

  // verify if an item was already selected and catch its id on the array selectedItem, putting in alreadySelected
  const alreadySelected = selectedItems.findIndex(element => element === itemId)

  // alreadey selected, remove from selection
  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter(element => element != itemId)
    // filter: if return true (selected is different of the elements already selected, then add it to the new array filteredItems)

    selectedItems = filteredItems;

  } else { //  if wasn't selected before, then put it on teh array
    selectedItems.push(itemId);
  }

  // update hidden input
  collectedItems.value = selectedItems;

}