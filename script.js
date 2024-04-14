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
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type = checkbox]");
const symbols = `~!@#$%^&*(){}_+-=|][,<.>/?;:'"`;

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();


// Set Password Length
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndecator(color) {
    indicator.style.backgroundColor = color;

    // shado
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
        await Navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Faield";
    }
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);
}



function shufflePassword(array) {
    for(let i = array.length - 1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
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
    if(checkCount ==0)
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

     let funArr = [];

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