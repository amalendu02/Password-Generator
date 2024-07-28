const inputSlider = document.querySelector("[data-lengthslider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelectorAll("input[type = checkbox]");
const symbols = `~!@#$%^&*(){}_+-=|][,<.>/?;:'"`;

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();

// set strength color to grey
setIndecator("#ccc")


// Set Password Length
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;

    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - min)*100/(max - min) +"% 100%") 
}

function setIndecator(color) {
    indicator.style.backgroundColor = color;
    // shado
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min,max) {
    return Math.floor(Math.random() * (max - min)) +min;
}


function geneareLowerCase() {
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function generateRandomNumber() {
    return getRndInteger(0,9);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >=8) {
        setIndecator("#0f0");
    }
    else if(
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
    )
    {
        setIndecator("#ff0");
    }
    else {
        setIndecator("#f00");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Faield";
    }
    // to make copy span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);
}



function shufflePassword(array) {
    // Fisher Yates Method  (we use this method to suflling)
    for(let i = array.length - 1; i > 0; i--) {
        // random j, find out using random function
        const j = Math.floor(Math.random() * (i+1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
        checkCount++;
    });

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
    copyContent();
})

generateBtn.addEventListener('click', () => {

    if(checkCount == 0)
    return;
    
    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    console.log("Starting the Journey");

    password = "";

    // if(uppercaseCheck.checked) {
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += geneareLowerCase();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

     let funArr = [];   // in this function we going to store uppercase, lowercase, randomnumber 

     if(uppercaseCheck.checked)
        funArr.push(generateUpperCase);

     if(lowercaseCheck.checked)
        funArr.push(geneareLowerCase);

     if(numbersCheck.checked)
        funArr.push(generateRandomNumber);

     if(symbolsCheck.checked)
        funArr.push(generateSymbol);

     for(let i=0; i<funArr.length;i++) {
        password += funArr[i]();
     }
     console.log("Compulsory addition done");
  
     for(let i=0; i<passwordLength-funArr.length; i++) {
        let randindex = getRndInteger(0, funArr.length);
        console.log("randIndex" + randindex)
        password += funArr[randindex]();
     }

     console.log("Remaining addition done");

     password = shufflePassword(Array.from(password));
     console.log("suffling addition done");

     passwordDisplay.value = password;
     console.log("UI addition done");
     calcStrength();
}); 