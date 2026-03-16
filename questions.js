// Quiz Questions Database
const questionsDatabase = [
    // Python Questions
    {
        id: 1,
        category: 'python',
        difficulty: 'easy',
        question: 'What is the correct way to create a list in Python?',
        options: [
            'list = []',
            'list = list()',
            'list = {}',
            'Both A and B'
        ],
        correctAnswer: 3
    },
    {
        id: 2,
        category: 'python',
        difficulty: 'easy',
        question: 'Which keyword is used to define a function in Python?',
        options: [
            'function',
            'def',
            'define',
            'func'
        ],
        correctAnswer: 1
    },
    {
        id: 3,
        category: 'python',
        difficulty: 'medium',
        question: 'What does the `__init__` method do in Python?',
        options: [
            'Initializes a class',
            'Destroys an object',
            'Imports a module',
            'None of the above'
        ],
        correctAnswer: 0
    },
    {
        id: 4,
        category: 'python',
        difficulty: 'medium',
        question: 'What is the output of: `print([i*2 for i in range(5)])`?',
        options: [
            '[0, 2, 4, 6, 8]',
            '[2, 4, 6, 8, 10]',
            '[1, 2, 3, 4, 5]',
            'Error'
        ],
        correctAnswer: 0
    },
    {
        id: 5,
        category: 'python',
        difficulty: 'hard',
        question: 'What is the time complexity of accessing an element in a Python dictionary?',
        options: [
            'O(1)',
            'O(n)',
            'O(log n)',
            'O(n log n)'
        ],
        correctAnswer: 0
    },
    
    // DSA Questions
    {
        id: 6,
        category: 'dsa',
        difficulty: 'easy',
        question: 'What is the time complexity of binary search?',
        options: [
            'O(n)',
            'O(log n)',
            'O(n log n)',
            'O(1)'
        ],
        correctAnswer: 1
    },
    {
        id: 7,
        category: 'dsa',
        difficulty: 'easy',
        question: 'Which data structure follows LIFO (Last In First Out) principle?',
        options: [
            'Queue',
            'Stack',
            'Array',
            'Linked List'
        ],
        correctAnswer: 1
    },
    {
        id: 8,
        category: 'dsa',
        difficulty: 'medium',
        question: 'What is the worst-case time complexity of Quick Sort?',
        options: [
            'O(n log n)',
            'O(n²)',
            'O(n)',
            'O(log n)'
        ],
        correctAnswer: 1
    },
    {
        id: 9,
        category: 'dsa',
        difficulty: 'medium',
        question: 'In a binary tree, what is the maximum number of nodes at level h?',
        options: [
            '2^h',
            '2^(h-1)',
            'h^2',
            'h'
        ],
        correctAnswer: 1
    },
    {
        id: 10,
        category: 'dsa',
        difficulty: 'hard',
        question: 'What is the space complexity of merge sort?',
        options: [
            'O(1)',
            'O(n)',
            'O(log n)',
            'O(n log n)'
        ],
        correctAnswer: 1
    },
    
    // Web Development Questions
    {
        id: 11,
        category: 'webdev',
        difficulty: 'easy',
        question: 'What does HTML stand for?',
        options: [
            'HyperText Markup Language',
            'High-level Text Markup Language',
            'Hyperlink and Text Markup Language',
            'Home Tool Markup Language'
        ],
        correctAnswer: 0
    },
    {
        id: 12,
        category: 'webdev',
        difficulty: 'easy',
        question: 'Which CSS property is used to change the text color?',
        options: [
            'font-color',
            'text-color',
            'color',
            'text-style'
        ],
        correctAnswer: 2
    },
    {
        id: 13,
        category: 'webdev',
        difficulty: 'medium',
        question: 'What is the purpose of the `<meta>` tag in HTML?',
        options: [
            'To create a table',
            'To provide metadata about the document',
            'To add images',
            'To create links'
        ],
        correctAnswer: 1
    },
    {
        id: 14,
        category: 'webdev',
        difficulty: 'medium',
        question: 'Which method is used to add an element to the end of an array in JavaScript?',
        options: [
            'push()',
            'pop()',
            'shift()',
            'unshift()'
        ],
        correctAnswer: 0
    },
    {
        id: 15,
        category: 'webdev',
        difficulty: 'hard',
        question: 'What is the difference between `let` and `var` in JavaScript?',
        options: [
            '`let` has block scope, `var` has function scope',
            '`var` has block scope, `let` has function scope',
            'There is no difference',
            '`let` is only used for constants'
        ],
        correctAnswer: 0
    },
    
    // JavaScript Questions
    {
        id: 16,
        category: 'javascript',
        difficulty: 'easy',
        question: 'What is the correct way to declare a variable in JavaScript?',
        options: [
            'var name = "John";',
            'variable name = "John";',
            'v name = "John";',
            'All of the above'
        ],
        correctAnswer: 0
    },
    {
        id: 17,
        category: 'javascript',
        difficulty: 'easy',
        question: 'Which operator is used for strict equality in JavaScript?',
        options: [
            '==',
            '===',
            '=',
            '!='
        ],
        correctAnswer: 1
    },
    {
        id: 18,
        category: 'javascript',
        difficulty: 'medium',
        question: 'What is a closure in JavaScript?',
        options: [
            'A function that has access to variables in its outer scope',
            'A way to close a browser window',
            'A method to stop code execution',
            'A type of loop'
        ],
        correctAnswer: 0
    },
    {
        id: 19,
        category: 'javascript',
        difficulty: 'medium',
        question: 'What does `this` refer to in JavaScript?',
        options: [
            'The current function',
            'The current object',
            'The global window object',
            'Depends on the context'
        ],
        correctAnswer: 3
    },
    {
        id: 20,
        category: 'javascript',
        difficulty: 'hard',
        question: 'What is the output of: `console.log(typeof null)`?',
        options: [
            'null',
            'undefined',
            'object',
            'boolean'
        ],
        correctAnswer: 2
    }
];

