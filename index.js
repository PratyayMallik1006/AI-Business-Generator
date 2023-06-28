import { Configuration, OpenAIApi } from "openai";
import { process } from "./env";

const setupTextarea = document.getElementById("setup-textarea");
const setupInputContainer = document.getElementById("setup-input-container");
const BizBossText = document.getElementById("Biz-boss-text");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEI,
});
const openai = new OpenAIApi(configuration);

document.getElementById("send-btn").addEventListener("click", () => {
  if (setupTextarea.value) {
    const userInput = setupTextarea.value;
    setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`;
    BizBossText.innerText = `Ok, just wait a second while my digital brain digests that...`;
    getchBotReply(userInput);
    fetchSynopsis(userInput);
  }
});

async function getchBotReply(outline) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Generate a short message to enthusiastically say ${outline} sounds interesting 
    and you need some time to think about it. Mention one aspect of the sentence`,
    max_tokens: 60,
  });

  BizBossText.innerText = response.data.choices[0].text.trim();
}

async function fetchSynopsis(outline) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Generate an engaging, professional and marketable 
    Business Idea on the following idea: ${outline} 
    and do not suggest any brand name`,
    max_tokens: 250,
  });
  const synopsis = response.data.choices[0].text.trim();

  document.getElementById("output-text").innerText = synopsis;
  fetchBizName(synopsis);
  console.log(synopsis);
}

async function fetchBizName(synopsis) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Generate a catchy brand name for the business idea ${synopsis}`,
    max_tokens: 5,
    temperature: 0.7,
  });
  const BizName = response.data.choices[0].text.trim();

  document.getElementById("output-title").innerText = BizName;

  fetchImagePrompt(BizName, synopsis);
  console.log(BizName);
}

async function fetchImagePrompt(title, synopsis) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Give a short description of a brand logo that could be used 
    for a business with the brand name : ${title} 
    and business idea: ${synopsis}, but contains no name`,
    max_tokens: 50,
  });
  const imagePrompt = response.data.choices[0].text.trim();

  fetchImageUrl(imagePrompt);
  console.log(imagePrompt);
}

async function fetchImageUrl(imagePrompt) {
  try {
    const response = await openai.createImage({
      prompt: `${imagePrompt}. There should be no text in the image`,
      n: 1,
      size: "256x256",
      response_format: "url",
    });
    const imageUrl = response.data.data[0].url;
    console.log(imageUrl);

    document.getElementById(
      "output-img-container"
    ).innerHTML = `<img src="${imageUrl}" />`;
  } catch (error) {
    console.log(error);
  }

  setupInputContainer.innerHTML = `<button id="view-pitch-btn" class="view-pitch-btn">View Pitch</button>`;

  document.getElementById("view-pitch-btn").addEventListener("click", () => {
    document.getElementById("setup-container").style.display = "none";
    document.getElementById("output-container").style.display = "flex";

    // once done
    BizBossText.innerText = `This idea is so good I'm jealous! It's gonna make you rich for sure! `;
  });
}
