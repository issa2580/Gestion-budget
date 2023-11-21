

function update (){
    window.location.href = "file:///C:/Users/garmi/Desktop/Gestion budget/index.html";
}
function netlify (){
    window.location.href = "https://gestion-budget.vercel.app/";
}


/*Ouverture et fermeture du formulaire depense */
'use strict'

const ouvrirDepense = () => document.getElementById('depense')
    .classList.add('active')

const fermerDepense = () => document.getElementById('depense')
    .classList.remove('active')

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_depense')) ?? []
const setLocalStorage = (dbDepense) => localStorage.setItem("db_depense", JSON.stringify(dbDepense))

/* Ajouter une depense dans le local storage */
const ajoutDepense = (dps) => {
    const dbDepense = getLocalStorage()
    dbDepense.push (dps)
    setLocalStorage(dbDepense)
}

const affichDepense = () => getLocalStorage()


/* Modifier une depense dans le local storage */
const modifDepense = (index, dps) => {
    const dbDepense = affichDepense()
    dbDepense[index] = dps
    setLocalStorage(dbDepense)
}


/* Supprimer une depense dans le local storage */
const supDepense = (index) => {
    const dbDepense = affichDepense()
    dbDepense.splice(index, 1)
    setLocalStorage(dbDepense)
}

/* Validation du formulaire des depense */
const validFormDepense = () => {
    return document.getElementById('form-depense').reportValidity()
}

/* Enregistrer une depense a partir du formulaire */
const enregistrerDepense = () => {
    if (validFormDepense()) {
        const dps = {
            titredps: document.getElementById('titredps').value,
            montantdps: document.getElementById('montantdps').value
        }
        const index = document.getElementById('titredps').dataset.index
        if (index == 'new') {
            ajoutDepense(dps)
            modifFormDepense ()
            supFieldDepense ()
            fermerDepense()
        } else {
            modifDepense(index, dps)
            modifFormDepense()
            supFieldDepense ()
            fermerDepense()
        }
    }
}


/* Remplissage du tableau des depense */
const RemplissageFormDepense = (dps, index) => {
    const addline = document.createElement('tr')
    addline.innerHTML = `
        <td>${dps.titredps}</td>
        <td>${dps.montantdps}</td>
        <td>
            <button type="button" class="btn-modifier" id="modifdps-${index}"><i class="fa-solid fa-pen-to-square"></i></button>
            <button type="button" class="btn-supprimer" id="supdps-${index}" ><i class="fa-solid fa-trash"></i></button>
        </td>
    `
    document.querySelector('#table-depense>tbody').appendChild(addline)
}

/* Effacer les données du formulaire */
const supFieldDepense = () => {
    document.querySelector("#titredps").value = ''
    document.querySelector("#montantdps").value = ''
}


let TousLesDepenses = [];
const dbDepense = getLocalStorage()
for (let i = 0; i < dbDepense.length; i++ ){
    let montantDepenser = dbDepense[i].montantdps;
    TousLesDepenses.push(Number(montantDepenser));
    console.log(TousLesDepenses);
}
const reducer = (accumulateur, valeurCourante) => accumulateur + valeurCourante;
const somTotalDepenser = TousLesDepenses.reduce(reducer,0);
const incomeTotal = document.querySelector('#income').innerHTML = somTotalDepenser.toFixed(2);
console.log(incomeTotal);
setLocalStorage(dbDepense)






let transactions = [];
transactions =  JSON.parse(localStorage.getItem('db_depense')) ?? [];

const render = () => {
    transactionDepense.innerHTML = ``

    if(transactions.length == 0){
        transactionDepense.innerHTML = `<h3>No Income Found</h3>`
    } 

    transactions.forEach((e,i) => {
        transactionDepense.innerHTML = `
        <li>
            ${e.titredps}
            <div>
                <span class="income-sp">${e.montantdps}</span>
                <button>-</button>
            <div>
        </li>
        ` + transactionDepense.innerHTML;

    })
}

render ();

const FieldDepense = (dps) => {
    document.getElementById('titredps').value = dps.titredps
    document.getElementById('montantdps').value = dps.montantdps
}

/* Formulaire de modification des depenses */
const modifFormDepense = () => {
    const dbDepense = affichDepense()
    supTableDepense()
    dbDepense.forEach(RemplissageFormDepense)
}


/* Modification du tableau des depense */

const modifTableDepense = (index) => {
    const dps = affichDepense()[index]
    dps.index = index
    FieldDepense(dps)
    ouvrirDepense()
}

/* Suppression du tableau des depense */
const supTableDepense = () => {
    const rows = document.querySelectorAll('#table-depense>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}


/* Bouton pour gerer la modification et la suppression des donnees du formulaire*/
const modifSupDepense = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'modifdps') {
            modifTableDepense(index)
            supDepense(index)
        } else {
            const dps = affichDepense()[index]
            const response = confirm(`Voulez vous supprimer ${dps.titredps}`)
            if (response) {
                supDepense(index)
                modifFormDepense ()
                update ()
                netlify ()
            }
        }
    }
}

modifFormDepense ()




// Evenement
document.getElementById('ajout-depense')
    .addEventListener('click', ouvrirDepense)

document.getElementById('fermerDepense')
    .addEventListener('click', fermerDepense)

document.getElementById('envoyer-depense')
    .addEventListener('click', enregistrerDepense)

document.getElementById('envoyer-depense')
    .addEventListener('click',update)

document.getElementById('envoyer-depense')
    .addEventListener('click',netlify)

document.querySelector('#table-depense>tbody')
    .addEventListener('click', modifSupDepense)

document.getElementById('annuler-depense')
    .addEventListener('click', fermerDepense)


    







/*Ouverture et fermeture du formulaire depense */
'use strict'

const ouvrirRevenu = () => document.getElementById('revenu')
    .classList.add('active')

const fermerRevenu = () => document.getElementById('revenu')
    .classList.remove('active')

const GetLocalStorage = () => JSON.parse(localStorage.getItem('db_revenu')) ?? []
const SetLocalStorage = (dbRevenu) => localStorage.setItem("db_revenu", JSON.stringify(dbRevenu))

/* Ajouter une revenu dans le local storage */
const ajoutRevenu = (rev) => {
    const dbRevenu = GetLocalStorage()
    dbRevenu.push (rev)
    SetLocalStorage(dbRevenu)
}

const affichRevenu = () => GetLocalStorage()


/* Modifier une revenu dans le local storage */
const modifRevenu = (index, rev) => {
    const dbRevenu = affichRevenu()
    dbRevenu[index] = rev
    SetLocalStorage(dbRevenu)
}

/* Supprimer une revenu dans le local storage */
const supRevenu = (index) => {
    const dbRevenu = affichRevenu()
    dbRevenu.splice(index, 1)
    SetLocalStorage(dbRevenu)
}

/* Validation du formulaire des revenu */
const validFormRevenu = () => {
    return document.getElementById('form-revenu').reportValidity()
}

/* Enregistrer une revenu a partir du formulaire */
const enregistrerRevenu = () => {
    if (validFormRevenu()) {
        const rev = {
            titreRev: document.getElementById('titreRev').value,
            montantRev: document.getElementById('montantRev').value
        }
        const index = document.getElementById('titreRev').dataset.index
        if (index == 'new') {
            ajoutRevenu(rev)
            modifFormRevenu ()
            supFieldRevenu ()
            fermerRevenu()    
        } else {
            modifRevenu(index, rev)
            modifFormRevenu()
            supFieldRevenu ()
            fermerRevenu()
        }
    }
}

/* Remplissage du tableau des revenus */
const RemplissageFormRevenu = (rev, index) => {
    const addline = document.createElement('tr')
    addline.innerHTML = `
        <td>${rev.titreRev}</td>
        <td>${rev.montantRev}</td>
        <td>
            <button type="button" class="btn-modifier" id="modifRev-${index}"><i class="fa-solid fa-pen-to-square"></i></button>
            <button type="button" class="btn-supprimer" id="supRev-${index}" ><i class="fa-solid fa-trash"></i></button>
        </td>
    `
    document.querySelector('#table-revenu>tbody').appendChild(addline)
}

/* Effacer les données du formulaire */
const supFieldRevenu = () => {
    document.querySelector("#titreRev").value = ''
    document.querySelector("#montantRev").value = ''
}

    let TousLesRevenu = [];
const dbRevenu = GetLocalStorage()
for (let i = 0; i < dbRevenu.length; i++ ){
    let montantEcconomiser = dbRevenu[i].montantRev;
    TousLesRevenu.push(Number(montantEcconomiser));
    console.log(TousLesRevenu);
}

const reducers = (acc, cur) => acc + cur;
const somTotalEcconomiser = TousLesRevenu.reduce(reducers,0);
const expenseTotal = document.querySelector('#expense').innerHTML = somTotalEcconomiser.toFixed(2);
console.log(expenseTotal);



const balance =  expenseTotal - incomeTotal;
const soldeTotal = document.querySelector('#balance').innerHTML = balance.toFixed(2);







let operations = [];
operations =  JSON.parse(localStorage.getItem('db_revenu')) ?? [];

const rend = () => {
    transactionRevenu.innerHTML = ``

    if(operations.length == 0){
        transactionRevenu.innerHTML = `<h3>No Expense Found</h3>`
    } 

    operations.forEach((el,item) => {
        transactionRevenu.innerHTML = `
        <li>
            ${el.titreRev}
            <div>
                <span class="expense-sp">${el.montantRev}</span>
                <button>+</button>
            <div>
        </li>
        ` + transactionRevenu.innerHTML;

    })
}

rend ();




const FieldRevenu = (rev) => {
    document.getElementById('titreRev').value = rev.titreRev
    document.getElementById('montantRev').value = rev.montantRev
}

/* Formulaire de modification des revenus */
const modifFormRevenu = () => {
    const dbRevenu = affichRevenu()
    supTableRevenu()
    dbRevenu.forEach(RemplissageFormRevenu)
}

/* Modification du tableau des depense */

const modifTableRevenu = (index) => {
    const rev = affichRevenu()[index]
    rev.index = index
    FieldRevenu(rev)
    ouvrirRevenu()
}

/* Suppression du tableau des depense */
const supTableRevenu = () => {
    const rows = document.querySelectorAll('#table-revenu>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

/* Bouton pour gerer la modification et la suppression des donnees du formulaire*/
const modifSupRevenu = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'modifRev') {
            modifTableRevenu(index)
            supRevenu(index)
            
        } else {
            const rev = affichRevenu()[index]
            const response = confirm(`Voulez vous supprimer ${rev.titreRev}`)
            if (response) {
                supRevenu(index)
                modifFormRevenu ()
                update ()
                netlify ()
            }
        }
    }
}

modifFormRevenu ()





// Evenement
document.getElementById('ajout-revenu')
    .addEventListener('click', ouvrirRevenu)

document.getElementById('fermerRevenu')
    .addEventListener('click', fermerRevenu)

document.getElementById('envoyer-revenu')
    .addEventListener('click', enregistrerRevenu)

document.getElementById('envoyer-revenu')
    .addEventListener('click', update)

document.getElementById('envoyer-revenu')
    .addEventListener('click',netlify)

document.getElementById('annuler-revenu')
    .addEventListener('click', fermerRevenu)

document.querySelector('#table-revenu>tbody')
    .addEventListener('click', modifSupRevenu)









