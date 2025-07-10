const form = document.querySelector('form');
const itemsContainer = document.querySelector('.items-container');

const apiGetAll = "http://localhost:3000/inventory";
const apiPostNew = "http://localhost:3000/inventory";
const apiUpdateOne = "http://localhost:3000/inventory/";
const apiDeleteOne = "http://localhost:3000/inventory/";


/*================ Get items and show on page ===============*/

function showItems(items) {
    itemsContainer.innerHTML = "";
    items.forEach((item) => {
        const itemHtml = `
        <div class="item">
            <h4>${item.title}</h4>
            <div class="edit-item">
                <button class="button-confirm-edit" data-item-id="${item._id}">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29 5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z"/></svg>
                </button>
                <button class="button-cancel-edit" data-item-id="${item._id}">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13.89 8.7L12 10.59 10.11 8.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 8.7 13.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l1.89 1.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l1.89-1.89c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.38-1.41 0zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                </button>
            </div>
            <div class="meta">
                <p>Price: <span id="edit-price-${item._id}">${item.price}</span></p>
                <p>Discount: <span id="edit-discount-${item._id}">${item.discount}</span></p>
                <p>Quantity: <span id="edit-quantity-${item._id}">${item.quantity}</span></p>

                <div class="edit">
                    <button class="button-edit" title="edit" data-item-id="${item._id}">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z"></path></svg>
                    </button>
                    <button class="button-trash" data-item-id="${item._id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z"></path>
                </svg>
                </button>
                </div>
            </div>
        </div>`;
        itemsContainer.innerHTML += itemHtml;
    });
    itemsContainer.querySelectorAll('.button-trash').forEach(function (button) {
        button.addEventListener('click', function () {
            console.log(this.dataset.itemId);
            deleteItem(this.dataset.itemId);
        })
    });
    itemsContainer.querySelectorAll('.button-edit').forEach(function (button) {
        button.addEventListener('click', function () {
            this.style.display = "none";
            this.parentNode.parentNode.parentNode.querySelector('.edit-item').style.display = "block";
            const itemElem = this.parentNode.parentNode.parentNode.querySelector('h4');
            itemElem.dataset.original = itemElem.textContent;
            itemElem.setAttribute('contenteditable', 'true');
            
            const priceElem = document.getElementById(`edit-price-${this.dataset.itemId}`)
            priceElem.dataset.original = priceElem.textContent;
            priceElem.setAttribute('contenteditable', 'true');

            const discountElem = document.getElementById(`edit-discount-${this.dataset.itemId}`)
            discountElem.dataset.original = discountElem.textContent;
            discountElem.setAttribute('contenteditable', 'true');

            const quantityElem = document.getElementById(`edit-quantity-${this.dataset.itemId}`)
            quantityElem.dataset.original = quantityElem.textContent;
            quantityElem.setAttribute('contenteditable', 'true');
            
            itemElem.focus();
        })
    });
    itemsContainer.querySelectorAll('.button-cancel-edit').forEach(function (button) {
        button.addEventListener('click', function () {
            this.parentNode.style.display = "none";
            this.parentNode.parentNode.querySelector('.meta > .edit > .button-edit').style.display = "inline-block";
            
            const itemElem = this.parentNode.parentNode.querySelector('h4');
            itemElem.textContent = itemElem.dataset.original;
            itemElem.setAttribute('contenteditable', 'false');

            const priceElem = document.getElementById(`edit-price-${this.dataset.itemId}`)
            priceElem.textContent = priceElem.dataset.original;
            priceElem.setAttribute('contenteditable', 'false')

            const discountElem = document.getElementById(`edit-discount-${this.dataset.itemId}`)
            discountElem.textContent = discountElem.dataset.original;
            discountElem.setAttribute('contenteditable', 'false')

            const quantityElem = document.getElementById(`edit-quantity-${this.dataset.itemId}`)
            quantityElem.textContent = quantityElem.dataset.original;
            quantityElem.setAttribute('contenteditable', 'false')
        })
    });
    itemsContainer.querySelectorAll('.button-confirm-edit').forEach(function (button) {
        button.addEventListener('click', function () {
            this.parentNode.style.display = "none";
            this.parentNode.parentNode.querySelector('.meta > .edit > .button-edit').style.display = "inline-block";
            const itemElem = this.parentNode.parentNode.querySelector('h4');
            // const priceElem = this.parentNode.parentNode.querySelector('.meta > .edit-price');
            const priceElem = document.getElementById(`edit-price-${this.dataset.itemId}`)
            const discountElem = document.getElementById(`edit-discount-${this.dataset.itemId}`)
            const quantityElem = document.getElementById(`edit-quantity-${this.dataset.itemId}`)

            delete itemElem.dataset.original;
            delete priceElem.dataset.original;
            delete discountElem.dataset.original;
            delete quantityElem.dataset.original;
            updateItem(this.dataset.itemId, itemElem.textContent, priceElem.textContent, discountElem.textContent, quantityElem.textContent);
            itemElem.setAttribute('contenteditable', 'false');
            priceElem.setAttribute('contenteditable', 'false');
            discountElem.setAttribute('contenteditable', 'false');
            quantityElem.setAttribute('contenteditable', 'false');
        })
    });
}

async function getAllItems() {
    console.log("hello");

    try {
        let response = await fetch(apiGetAll, {
            method: 'GET'
        });
        let items = await response.json();
        console.log(items);
        showItems(items);
    } catch (error) {
        console.error(error);
    }
}

getAllItems();


/*================ Post a new item ===============*/

async function createItem(item) {
    const params = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }
    console.log("HEYYYYYYYYYYYY LOOK HERE:", JSON.stringify(item));
    try {
        let response = await fetch(apiPostNew, params);
        console.log(response);
        getAllItems();
    } catch (error) {
        console.error(error);
    }
}


/*================ Patch an existing item ===============*/

async function updateItem(messageId, newTitle, newPrice, newDiscount, newQuantity) {
    try {
        let response = await fetch(apiDeleteOne + messageId, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PATCH',
            body: JSON.stringify({
                title: newTitle,
                price: newPrice,
                discount: newDiscount,
                quantity: newQuantity
            })
        });
        console.log(response);
        getAllItems();
    } catch (error) {
        console.error(error);
    }
}


/*================ Delete an existing item ===============*/

async function deleteItem(itemId) {
    try {
        let response = await fetch(apiDeleteOne + itemId, {
            method: 'DELETE'
        });
        console.log(response);
        getAllItems();
    } catch (error) {
        console.error(error);
    }
}

/*================ Item form handling ===============*/

function formData(e) {
    e.preventDefault();
    //convert the following to json before send
    let titleData = document.getElementById('title').value;
    let priceData = document.querySelector('#price').value;
    let discountData = document.querySelector('#discount').value;
    let quantityData = document.querySelector('#quantity').value;

    const data = {
        //ID GENERATED BY MONGODB WOULD BE HERE
        title: titleData,
        price: priceData,
        discount: discountData,
        quantity: quantityData
    }
    createItem(data);
    this.reset();
}

form.addEventListener('submit', formData);