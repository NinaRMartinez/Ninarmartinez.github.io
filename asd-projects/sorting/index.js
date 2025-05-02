/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
async function bubbleSort(array){ // bubble sorts by walking through the array, comparing the values
//ITERATE over the array from i = 0 to i = length - 1
for(var i = 0; i <= array.length - 1; i++){
    // ITERATE over the array from j = length - 1 to j = i + 1
    for(var j = array.length - 1; j >= i + 1; j--){
        // IF array[j]'s value < array[j - 1]'s value
        if(array[j].value < array[j - 1].value){
// swap array[j] and array[j - 1]
swap(array,j,(j-1));
updateCounter(bubbleCounter);
await sleep();
        }
    }
}


  
}

// TODO 3: Implement quickSort
//    FUNCTION quicksort(array, left, right): // sorts quickly by seperating sorting into diff sections and using pivots to compare
async function quickSort(array, left, right){
  //IF (right - left) > 0:
    if((right - left) > 0){
        //  index = partition(array, left, right)
        var i = await partition(array,left,right); // function call with await to pause the execution of async func partition
//  IF left < (index - 1):
        if(left < (i - 1)){
 //  quickSort(array, left, index - 1)
            await quickSort(array,left,i - 1); // call with quicksort, await to pause execution of this async func
        }
        //IF index < right:
        if(i < right){
 //quicksort(array, index, right)

            await quickSort(array,i,right);
        }
    }
    return;
}


// TODOs 4 & 5: Implement partition

async function partition(array, left, right){ // decides on a pivot, and decides where to sort
   //pivot = select a pivot
    var pivot = array[Math.floor((right + left) / 2)].value;
//WHILE left < right:
    while(left < right){
         //WHILE array[left] < pivot { left++ }
        while(array[left].value < pivot) { left++}; // uses the pivot to decide which one to move
//WHILE array[right] > pivot { right-- }
        while(array[right].value > pivot) { right--};
        //IF left < right:
        if(left < right){
             //  swap array[left] and array[right]
            swap(array,left,right);
            updateCounter(quickCounter); 
            await sleep(); // calls sleep with a pause
        }
    };

  //RETURN left + 1
    return left + 1; //
}


// TODO 1: Implement swap
function swap(array, i, j) { // swaps array values by creating a temp
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    drawSwap(array, i, j); // drawswap func call to swap values and display on screen
}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}