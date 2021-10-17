const chineseElement = document.getElementById("chineseDisplay")
const pinyinElement = document.getElementById("pinyinDisplay")
const inputElement = document.getElementById("input")

// const chinese = ["爱", "爸爸", "不客气"]
// const pinyin = ["ai", "papa", "bukeqi"]
// const english = ["love", "father", "you're welcome"]

var chinese = []
var pinyin = []
var english = []

var indices = []
var index = 0;

var url = 'hsk-csv/hsk1.csv';
d3.csv(url, function(err, data) {
    data.forEach(vocab => {
        chinese.push(vocab.chinese)
        pinyin.push(vocab.pinyin)
        english.push(vocab.english)
    });
    renderNextWord()
})

inputElement.addEventListener('input', () => {
    if (inputElement.value===english[index]){
        console.log("correct !")
        inputElement.value = ""
        renderNextWord()
    }
    //if (inputElement.value.length())
    //console.log(inputElement.value.length)
    /*
    const lastCharacter = inputElement.value.slice(-1)
    if (lastCharacter == ";"){
        inputElement.value = ""
        renderNextWord()
    }
    */
})

function renderNextWord(){
    var max = 20 // number of words to practice
    const min = 0
    if (max > chinese.length) {
        max = chinese.length
    }
    if (indices.length == 0) {
        indices = shuffle([...Array(max).keys()])
    }
    index = indices.pop()
    // index = Math.floor(Math.random()*(max-min)+min);
    console.log(indices+" ["+index+"] "+english[index])
    chineseElement.innerText = chinese[index]
    pinyinElement.innerText = pinyin[index]
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }