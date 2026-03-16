// ===== Quiz Application State =====
let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = {};
let quizStartTime = null;
let timerInterval = null;
let timeElapsed = 0;

// ===== DOM Elements =====
const homeScreen = document.getElementById('homeScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');
const startQuizBtn = document.getElementById('startQuizBtn');
const categorySelect = document.getElementById('categorySelect');
const difficultySelect = document.getElementById('difficultySelect');
const questionNumber = document.getElementById('questionNumber');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const progressBar = document.getElementById('progressBar');
const timer = document.getElementById('timer');
const darkModeToggle = document.getElementById('darkModeToggle');
const retryBtn = document.getElementById('retryBtn');
const homeBtn = document.getElementById('homeBtn');
const toast = document.getElementById('toast');

// ===== Initialize Application =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateDarkModeButton(savedTheme);
    
    // Event listeners
    startQuizBtn.addEventListener('click', startQuiz);
    prevBtn.addEventListener('click', showPreviousQuestion);
    nextBtn.addEventListener('click', showNextQuestion);
    submitBtn.addEventListener('click', submitQuiz);
    retryBtn.addEventListener('click', retryQuiz);
    homeBtn.addEventListener('click', goToHome);
    darkModeToggle.addEventListener('click', toggleDarkMode);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// ===== Screen Navigation =====
function showScreen(screen) {
    homeScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    screen.classList.add('active');
}

// ===== Quiz Start =====
function startQuiz() {
    const category = categorySelect.value;
    const difficulty = difficultySelect.value;
    
    // Filter questions based on selection
    currentQuestions = questionsDatabase.filter(q => {
        const categoryMatch = category === 'all' || q.category === category;
        const difficultyMatch = difficulty === 'all' || q.difficulty === difficulty;
        return categoryMatch && difficultyMatch;
    });
    
    if (currentQuestions.length === 0) {
        showToast('No questions available for selected filters. Please try different options.', 'error');
        return;
    }
    
    // Shuffle questions for variety
    currentQuestions = shuffleArray([...currentQuestions]);
    // Limit to 10 questions
    if (currentQuestions.length > 10) {
        currentQuestions = currentQuestions.slice(0, 10);
    }
    
    // Reset state
    currentQuestionIndex = 0;
    userAnswers = {};
    timeElapsed = 0;
    quizStartTime = Date.now();
    
    // Start timer
    startTimer();
    
    // Show quiz screen
    showScreen(quizScreen);
    displayQuestion();
    updateProgressBar();
}

// ===== Question Display =====
function displayQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    
    // Update question number
    questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
    
    // Update question text
    questionText.textContent = question.question;
    
    // Clear and populate options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = createOptionElement(option, index);
        optionsContainer.appendChild(optionElement);
    });
    
    // Restore selected answer if exists
    if (userAnswers[currentQuestionIndex] !== undefined) {
        const selectedOption = optionsContainer.children[userAnswers[currentQuestionIndex]];
        if (selectedOption) {
            selectedOption.classList.add('selected');
            selectedOption.querySelector('input').checked = true;
        }
    }
    
    // Update navigation buttons
    updateNavigationButtons();
}

function createOptionElement(optionText, index) {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option';
    optionDiv.setAttribute('role', 'button');
    optionDiv.setAttribute('tabindex', '0');
    
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'answer';
    radio.value = index;
    radio.id = `option-${index}`;
    
    const label = document.createElement('label');
    label.htmlFor = `option-${index}`;
    label.textContent = optionText;
    
    optionDiv.appendChild(radio);
    optionDiv.appendChild(label);
    
    // Click handler
    optionDiv.addEventListener('click', () => selectOption(index, optionDiv));
    
    // Keyboard handler
    optionDiv.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectOption(index, optionDiv);
        }
    });
    
    return optionDiv;
}

function selectOption(index, optionElement) {
    // Remove previous selection
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach(opt => {
        opt.classList.remove('selected');
        opt.querySelector('input').checked = false;
    });
    
    // Select current option
    optionElement.classList.add('selected');
    optionElement.querySelector('input').checked = true;
    
    // Save answer
    userAnswers[currentQuestionIndex] = index;
    
    // Update navigation buttons
    updateNavigationButtons();
}

// ===== Navigation =====
function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
        updateProgressBar();
    }
}

function showNextQuestion() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        updateProgressBar();
    }
}

function updateNavigationButtons() {
    // Previous button
    prevBtn.disabled = currentQuestionIndex === 0;
    
    // Next/Submit button
    const hasAnswer = userAnswers[currentQuestionIndex] !== undefined;
    const isLastQuestion = currentQuestionIndex === currentQuestions.length - 1;
    
    if (isLastQuestion) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
        submitBtn.disabled = !hasAnswer;
    } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
        nextBtn.disabled = !hasAnswer;
    }
}

// ===== Progress Bar =====
function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// ===== Timer =====
function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(() => {
        timeElapsed++;
        updateTimerDisplay();
    }, 1000);
    
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    timer.textContent = `⏱️ ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// ===== Quiz Submission =====
function submitQuiz() {
    // Check if all questions are answered
    const unansweredQuestions = [];
    for (let i = 0; i < currentQuestions.length; i++) {
        if (userAnswers[i] === undefined) {
            unansweredQuestions.push(i + 1);
        }
    }
    
    if (unansweredQuestions.length > 0) {
        showToast(`Please answer all questions. Unanswered: ${unansweredQuestions.join(', ')}`, 'error');
        return;
    }
    
    // Stop timer
    stopTimer();
    
    // Calculate results
    const results = calculateResults();
    
    // Show results
    showResults(results);
}

function calculateResults() {
    let correctCount = 0;
    let wrongCount = 0;
    const totalQuestions = currentQuestions.length;
    
    currentQuestions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        if (userAnswer === question.correctAnswer) {
            correctCount++;
        } else {
            wrongCount++;
        }
    });
    
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    
    return {
        correct: correctCount,
        wrong: wrongCount,
        total: totalQuestions,
        percentage: percentage
    };
}

function showResults(results) {
    // Update result screen
    document.getElementById('percentageScore').textContent = `${results.percentage}%`;
    document.getElementById('correctCount').textContent = results.correct;
    document.getElementById('wrongCount').textContent = results.wrong;
    document.getElementById('totalQuestions').textContent = results.total;
    
    // Update score circle color based on performance
    const scoreCircle = document.querySelector('.score-circle');
    if (results.percentage >= 80) {
        scoreCircle.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else if (results.percentage >= 60) {
        scoreCircle.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
    } else {
        scoreCircle.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    }
    
    // Show result screen
    showScreen(resultScreen);
}

// ===== Retry & Home =====
function retryQuiz() {
    // Reset to first question
    currentQuestionIndex = 0;
    userAnswers = {};
    timeElapsed = 0;
    quizStartTime = Date.now();
    
    // Shuffle questions again
    currentQuestions = shuffleArray([...currentQuestions]);
    
    // Start timer
    startTimer();
    
    // Show quiz screen
    showScreen(quizScreen);
    displayQuestion();
    updateProgressBar();
}

function goToHome() {
    // Stop timer if running
    stopTimer();
    
    // Reset state
    currentQuestions = [];
    currentQuestionIndex = 0;
    userAnswers = {};
    timeElapsed = 0;
    
    // Show home screen
    showScreen(homeScreen);
}

// ===== Dark Mode =====
function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateDarkModeButton(newTheme);
}

function updateDarkModeButton(theme) {
    darkModeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ===== Keyboard Navigation =====
function handleKeyboardNavigation(e) {
    // Only handle keyboard navigation when quiz screen is active
    if (!quizScreen.classList.contains('active')) {
        return;
    }
    
    // Arrow keys for navigation
    if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
        e.preventDefault();
        showPreviousQuestion();
    } else if (e.key === 'ArrowRight' && !nextBtn.disabled) {
        e.preventDefault();
        showNextQuestion();
    }
    
    // Number keys 1-4 for selecting options
    const keyNum = parseInt(e.key);
    if (keyNum >= 1 && keyNum <= 4) {
        const optionIndex = keyNum - 1;
        const options = optionsContainer.querySelectorAll('.option');
        if (options[optionIndex]) {
            e.preventDefault();
            selectOption(optionIndex, options[optionIndex]);
        }
    }
    
    // Enter key to submit on last question
    if (e.key === 'Enter' && submitBtn.style.display !== 'none' && !submitBtn.disabled) {
        e.preventDefault();
        submitQuiz();
    }
}

// ===== Toast Notification =====
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== Utility Functions =====
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

