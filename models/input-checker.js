
function inputChecker(input){

    const isNull = Object.values(input).includes(null);
    const titleCheck = input.title.trim().length > 0;
    const priceCheck = parseInt(input.price) >= 0;
    const discountCheck = parseInt(input.discount) >= 0;
    const quantityCheck = parseInt(input.quantity) >= 0;
    
    return (!isNull && titleCheck && priceCheck && discountCheck && quantityCheck);

}

module.exports = { inputChecker };