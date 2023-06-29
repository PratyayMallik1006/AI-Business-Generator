# AI-Business-Generator
A Business Pitch generator app, that provides
- **Brand Logo:** Using OpenAI DallE model
- **Brand Name:** Using OpenAI Davinci model
- **Business Pitch:** Using OpenAI Davinci model

![alt text](https://github.com/PratyayMallik1006/AI-Business-Generator/blob/main/ss/Capture1.PNG?raw=true)
![alt text](https://github.com/PratyayMallik1006/AI-Business-Generator/blob/main/ss/Capture2.PNG?raw=true)
![alt text](https://github.com/PratyayMallik1006/AI-Business-Generator/blob/main/ss/Capture3.PNG?raw=true)
![alt text](https://github.com/PratyayMallik1006/AI-Business-Generator/blob/main/ss/Capture4.PNG?raw=true)

# Using the Application
- Add you OpenAI API Key
- CMD
```
npm install
npm start
```
# Notes
## Prompting Techniques
1. Zero Shot
2. Few Shot
### Zero Shot
- Just an instruction
- Fine for many simplae requests
```js
// generate title from synopsis
async function fetchTitle(synopsis) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: ` Generate a short, catchy, dystopic movie title for this synopsis: ${synopsis}`,
  });
}

```
### Few Shot
- Add one or more examples
- Helps the AI understand what you want
- Great for more complex tasks
```js
async function fetchBotReply(input) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    // few shot approach with three examples

    prompt: `Generate a short message to enthusiastically say an input sounds interesting and that you need some minutes to think about it. Mention one aspect of the sentence.
    ###
    input: "Two dogs fall in love and move to Hawaii to learn to surf."
    message: "I'll need to think about that. But your idea is amazing! I love the bit about Hawaii!"
    ###
    input: "A plane crashes in the jungle and the passengers have to walk 1000km to safety.    "
    message: "I'll spend a few moments considering that. But I love your idea!! A disaster movie in the jungle!    "
    ###
    input: "A group of corrupt lawyers try to send an innocent woman to jail.    "
    message: "Wow that is awesome! Corrupt lawyers, huh? Give me a few moments to think!"
    ###

    input: ${input}
    message:
    `,
    max_tokens: 60,
  });
  
}
```

## Temperature
- **Temperature** controls how often the model outputs a less likely toke.
- From 0 to 1 in increments of .01
- It defaults to 1
- At 0, fewer "less likely" tokens will be used, less creative
```js
// generate title from synopsis
async function fetchTitle(synopsis) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: ` Generate a short, catchy, dystopic movie title for this synopsis: ${synopsis}`,
    temperature: 0.8, //default temperature is 1
  });
}

```
