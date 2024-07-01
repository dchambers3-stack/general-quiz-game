let triviaData = [];
let currentQuestionIndex = 0;
const url = 'https://the-trivia-api.com/v2/questions/'

const questionText = document.querySelector('.question');
const answerOptions = document.querySelector('.answer-options');


fetchTriviaData()

async function fetchTriviaData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        triviaData = data;
        console.log(triviaData);
        showQuestion();
    } catch (error) {
        console.log('Error fetching trivia data', error);
    }
}
const checkAnswer = (selectedAnswer, isCorrect) => {
    const correctAnswer = triviaData[currentQuestionIndex].correctAnswer;
    if (selectedAnswer === correctAnswer) {
        alert('Correct answer!'); // Display alert for correct answer
        moveToNextQuestion();
    } else {
        const tryAgain = confirm('Incorrect answer. Would you like to try again?');
        if (tryAgain) {
            // You may add additional logic here if needed before retrying
        } else {
            moveToNextQuestion();
        }
    }
}


const showQuestion = ()=>{
    if(currentQuestionIndex < triviaData.length){
        const currentQuestion = triviaData[currentQuestionIndex];
        questionText.textContent = currentQuestion.question.text;

        // clear previos answer options
        answerOptions.innerHTML = '';

        //display answer options as buttons
        currentQuestion.incorrectAnswers.forEach((option, index)=>{
            const btnOption = document.createElement('button');

            btnOption.textContent = option;
            btnOption.classList.add('option-btn');
            btnOption.addEventListener('click', ()=> checkAnswer(option))   
            answerOptions.appendChild(btnOption)
             })
             //add correct answer
             const correctBtnOption = document.createElement('button');
             correctBtnOption.textContent = currentQuestion.correctAnswer;
             correctBtnOption.addEventListener('click', ()=> checkAnswer(currentQuestion.correctAnswer));
             answerOptions.appendChild(correctBtnOption);
        
    } else {
        questionText.textContent = 'That is the end of the quiz';
        answerOptions.innerHTML = '';
        btn.style.display = 'none'
    }
}



const moveToNextQuestion = ()=>{
    currentQuestionIndex++
    showQuestion()
}

