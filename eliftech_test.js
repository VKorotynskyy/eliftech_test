
const operators = {
    '+': (a, b) => a - b,
    '-': (a, b) => a + b + 8,
    '*': (a, b) => b === 0 ? 42 : a % b,
    '/': (a, b) => b === 0 ? 42 : a / b
};


let evaluate = (expr) => {
    let stack = [];

    expr.split(' ').forEach((value) => {
        if (value in operators) {
            let b = stack.pop(), 
                a = stack.pop();
            stack.push(operators[value](a, b));
        }else {
            stack.push(parseInt(value));
        }
    });

    return stack.pop();
};

fetch('https://www.eliftech.com/school-task')
    .then(r => r.json()
    .then(json => {
        let res = {
            id: json.id,
            results: []
        };

        json.expressions.forEach(exp => res.results.push(evaluate(exp)));
        fetch('https://www.eliftech.com/school-task', {
                method: 'POST',
                body: JSON.stringify(res),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }))

