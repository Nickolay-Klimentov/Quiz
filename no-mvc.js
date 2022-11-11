const fs = require('fs');
const readlineSync = require('readline-sync');

class Question {
  constructor([question, answer]) {
    this.question = question;
    this.answer = answer;
  }
}
function convrtStrToOBj() {
  const arrOfRows = fs.readdirSync(`${__dirname}/topics`, 'utf-8').map((fileName) => fs.readFileSync(`${__dirname}/topics/${fileName}`, 'utf-8'));
  return arrOfRows.map((row) => splitter(row));
}
function splitter(str) {
  return str.split('\n').map((row) => new Question(row.split('|')));
}
function greeting() {
  console.log('Добро пожаловать в Quiz!');
  const userName = readlineSync.question('Как тебя зовут? ');
  console.log(`Привет, ${userName}!`);
  console.log('Выбери тему: \n1. Чемпионат Мира по футболу.⚽️');
  console.log('2. Рандомные вопросы.🎲');
  console.log('3. Загадки для детей.⁉️');
  const indexTopic = readlineSync.question('->');

  const questionArr = convrtStrToOBj()[indexTopic - 1];
  // eslint-disable-next-line no-restricted-syntax
  let scoreCount = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const question of questionArr) {
    console.log(`Ответьте на вопрос: ${question.question}`);
    const inputAnswer = readlineSync.question('Введите ответ: ');
    if (inputAnswer.toLowerCase() !== question.answer) {
      console.log(`'${inputAnswer}': не верно! Правильный ответ: '${question.answer}'.`);
    } else {
      scoreCount += 1;
      console.log('Верно!');
    }
  }
  console.log(`Поздравляю, ${userName}! Ваш результат: ${scoreCount} из 5!`);
}
greeting();
