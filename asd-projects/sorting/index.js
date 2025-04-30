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
async function bubbleSort(array){
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
async function quickSort(left, right, array){
    if((right - left) > 0){
        var i = await partition(array,left,right);
        if(left < (i - 1)){
            await quickSort(array,left,i - 1);
        }
        if(i < right){
            await quickSort(array,i,right);
        }
    }
    return;
}

// TODOs 4 & 5: Implement partition
async function partition(left, right, array){
    // FUNCTION partition (array, left, right):

  //pivot = select a pivot
  pivot = array[Math.floor((right + left) / 2)].value;

  //WHILE left < right:
  while(left < right){

//WHILE array[left] < pivot { left++ }
while(array[left] < pivot) {left++}

    //WHILE array[right] > pivot { right-- }
    while(array[left] > pivot){right --}

         //IF left < right:
        if(left < right){

            //swap array[left] and array[right]
            swap(array,left, right);
            updateCounter(quickCounter); //update the quicksort move counter
            await sleep();
    }
   

    
  }
    

  //RETURN left + 1
}

// TODO 1: Implement swap
function swap(i, j, array) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    drawSwap(i, j, array);
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