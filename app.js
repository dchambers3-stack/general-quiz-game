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

// Function to shuffle an array (Fisher-Yates shuffle algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const showQuestion = () => {
    if (currentQuestionIndex < triviaData.length) {
        const currentQuestion = triviaData[currentQuestionIndex];
        questionText.textContent = currentQuestion.question.text;

        // Combine correct and incorrect answers
        let answerOptionsArray = [...currentQuestion.incorrectAnswers, currentQuestion.correctAnswer];

        // Shuffle the answer options
        answerOptionsArray = shuffleArray(answerOptionsArray);

        // Clear previous answer options
        answerOptions.innerHTML = '';

        // Display shuffled answer options as buttons
        answerOptionsArray.forEach((option, index) => {
            const btnOption = document.createElement('button');
            btnOption.textContent = option;
            btnOption.classList.add('option-btn');
            btnOption.addEventListener('click', () => checkAnswer(option));
            answerOptions.appendChild(btnOption);
        });

    } else {
        questionText.textContent = 'That is the end of the quiz';
        answerOptions.innerHTML = '';
        // Optionally hide further navigation or quiz controls
        // btn.style.display = 'none';
    }
}




const moveToNextQuestion = ()=>{
    currentQuestionIndex++
    showQuestion()
}
}

