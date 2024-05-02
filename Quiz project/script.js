
const questions = [
    {
        question: "What is the correct HTML tag for the largest heading?",
        options: ["&lt;h1&gt;", "&lt;h2&gt;", "&lt;h3&gt;", "&lt;h4&gt;"],
        answer: "A"
    },
    {
        question: "Which of the following is not a JavaScript data type?",
        options: ["Number", "String", "Boolean", "Null"],
        answer: "D"
    },
    {
        question: "What is the correct syntax for referring to an external script called \"xxx.js\"?",
        options: ["&lt;script href=\"xxx.js\"&gt;", "&lt;script name=\"xxx.js\"&gt;", "&lt;script src=\"xxx.js\"&gt;", "&lt;script file=\"xxx.js\"&gt;"],
        answer: "C"
    },
    {
        question: "What is the term for a computer program that is designed to perform a specific task?",
        options: ["Algorithm", "Data Structure", "Operating System", "Compiler"],
        answer: "A"
    },
    {
        question: "Which of the following is a fundamental concept in object-oriented programming?",
        options: ["Encapsulation", "Recursion", "Inheritance", "Polymorphism"],
        answer: "A"
    },
    {
        question: "What is the term for a data structure that stores a collection of elements?",
        options: ["Array", "List", "Set", "Map"],
        answer: "A"
    },
    {
        question: "Which of the following is a programming paradigm that uses a model of computation based on the concept of \"state\"?",
        options: ["Functional Programming", "Object-Oriented Programming", "Procedural Programming", "Declarative Programming"],
        answer: "D"
    },
    {
        question: "What is the term for a programming language that is designed to be easy to read and write?",
        options: ["Assembly Language", "Machine Language", "High-Level Language", "Low-Level Language"],
        answer: "C"
    },
    {
        question: "Which of the following is a type of data structure that stores elements in a non-linear fashion?",
        options: ["Array", "Linked List", "Stack", "Queue"],
        answer: "B"
    },
    {
        question: "What is the term for a programming language that is designed to be easy to read and write?",
        options: ["Assembly Language", "Machine Language", "High-Level Language", "Low-Level Language"],
        answer: "C"
    }
];

// Generate questions
const quizQuestions = document.querySelector(".quiz-questions");
let currentQuestion = 0;
let score = 0;
let totalQuestions = questions.length;

function generateQuestion() {
    quizQuestions.innerHTML = ""; // Clear previous question
    const question = questions[currentQuestion];
    quizQuestions.innerHTML = `
        <p>${question.question}</p>
        ${question.options.map((option, index) => `<input type="radio" name="question-${currentQuestion}" value="${option}"> ${option}<br>`).join('')}
    `;
}

// Initialize first question
generateQuestion();

// Previous and Next button functionality
document.querySelector("#previous-btn").addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        generateQuestion();
    }
});

document.querySelector("#next-btn").addEventListener("click", () => {
    if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        generateQuestion();
    }
});

// Submit button functionality
document.querySelector("#submit-btn").addEventListener("click", () => {
    // Get user answers
    const userAnswers = [];
    questions.forEach((question, index) => {
        const userAnswer = document.querySelector(`input[name="question-${index}"]:checked`);
        userAnswers.push(userAnswer ? userAnswer.value : null);
    });
    // Check answers and display result
    const correctAnswers = questions.map(question => question.answer);
    score = userAnswers.reduce((acc, current, index) => {
        if (current === correctAnswers[index]) {
            return acc + 1;
        }
        return acc;
    }, 0);

    // Display result
    const resultElement = document.createElement("div");
    resultElement.className = score === totalQuestions ? "quiz-result correct" : "quiz-result incorrect";
    resultElement.innerHTML = `You scored ${score} out of ${totalQuestions}`;
    quizQuestions.appendChild(resultElement);

    // Stop the timer
    clearInterval(timerInterval);
});

// Reset button functionality
document.querySelector("#reset-btn").addEventListener("click", () => {
    // Reset quiz state
    currentQuestion = 0;
    score = 0;
    generateQuestion();
    // Restart timer
    timeRemaining = 600;
    timerElement.innerHTML = `${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, "0")}`;
});

// Timer functionality
let timeRemaining = 600; // 10 minutes
const timerElement = document.querySelector("#timer");
let timerInterval = setInterval(() => {
    timeRemaining--;
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.innerHTML = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    if (timeRemaining <= 0) {
        alert("Time's up!");
        clearInterval(timerInterval); // Stop the timer
    }
}, 1000);
