// Modified from Amazon Alexa Template
// Author: Tiffany Yuen

'use strict';
const Alexa = require('alexa-sdk');

var APP_ID = "amzn1.ask.skill.5ebd34d6-9d09-46ee-9c94-5e53ac2c175b";

// Before a user starts a quiz, they can ask about a specific data element, like "Shanghai."
// The skill will speak the sentence from this function, pulling the data values from the appropriate record in data.
function getSpeechDescription(item)
{
    var sentence = "The capital of " + item.StateName + " is " + item.Capital + ", and the abbreviation for " + item.StateName + " is <break strength='strong'/><say-as interpret-as='spell-out'>" + item.Abbreviation + "</say-as>.  I've added " + item.StateName + " to your Alexa app.  Which other state or capital would you like to know about?";
    return sentence;
}

// Defines questions' structure
function getQuestion(counter, property, item)
{
    return "Here is your " + counter + "th question.  What is the " + formatCasing(property) + " of "  + item.StateName + "?";
}

// Returns an answer to user during the quiz
function getAnswer(property, item)
{
    return "The " + formatCasing(property) + " of " + item.StateName + " is " + item[property] + ". "

}

// This is a list of positive speechcons that this skill will use when a user gets a correct answer
// Adapted from https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
var speechConsCorrect = ["Booya", "All righty", "Bam", "Bazinga", "Bingo", "Boom", "Bravo", "Cha Ching", "Cheers", "Dynomite",
"Hip hip hooray", "Hurrah", "Hurray", "Huzzah", "Oh dear.  Just kidding.  Hurray", "Kaboom", "Kaching", "Oh snap", "Phew",
"Righto", "Way to go", "Well done", "Whee", "Woo hoo", "Yay", "Wowza", "Yowsa"];

// This is a list of negative speechcons that this skill will use when a user gets an incorrect answer
// Adapted from https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
var speechConsWrong = ["Argh", "Aw man", "Blarg", "Blast", "Boo", "Bummer", "Darn", "D'oh", "Dun dun dun", "Eek", "Honk", "Le sigh",
"Mamma mia", "Oh boy", "Oh dear", "Oof", "Ouch", "Ruh roh", "Shucks", "Uh oh", "Wah wah", "Whoops a daisy", "Yikes"];

// This is the welcome message for when a user starts the skill without a specific intent.
var WELCOME_MESSAGE = "Welcome to the China Quiz Game!  You can ask me about any of the four municipalities, five autonomous regions, two special administrative regions, provinces and their capitals, or you can ask me to start a quiz.  What would you like to do?";

// This is the message a user will hear when they start a quiz.
var START_QUIZ_MESSAGE = "OK.  I will ask you 10 questions about China.";

// This is the message a user will hear when they try to cancel or stop the skill, or when they finish a quiz.
var EXIT_SKILL_MESSAGE = "Thank you for playing the China Geography Quiz Game!  Let's play again soon!";

// This is the message a user will hear after they ask (and hear) about a specific data element.
var REPROMPT_SPEECH = "Which other province or capital would you like to know about?";

// This is the message a user will hear when they ask Alexa for help in your skill.
var HELP_MESSAGE = "I know lots of things about the China. You can ask me about a province or a capital, and I'll tell you what I know.  You can also test your knowledge by asking me to start a quiz.  What would you like to do?";


// This is the response a user will receive when they ask about something we weren't expecting.
// For example, say "pizza" to the skill when it starts.  This is the response you will receive.
function getBadAnswer(item) { return "I'm sorry. " + item + " is not something I know very much about in this skill. " + HELP_MESSAGE; }

//This is the message a user will receive after each question of a quiz.  It reminds them of their current score.
function getCurrentScore(score, counter) { return "Your current score is " + score + " out of " + counter + ". "; }

// This is the message a user will receive after they complete a quiz.  It tells them their final score.
function getFinalScore(score, counter) { return "Your final score is " + score + " out of " + counter + ". "; }

// Quiz data bank
var data = [
                {StateName: "Beijing Municipality",        Abbreviation: "Jing", Capital: "Beijing"},
                {StateName: "Tianjin Municipality",         Abbreviation: "Jīn", Capital: "Tianjin"},
                {StateName: "Hebei Province",        Abbreviation: "Jì", Capital: "Shijiazhuang"},
                {StateName: "Shanxi Province",       Abbreviation: "Jìn", Capital: "Taiyuan"},
                {StateName: "Inner Mongolia Autonomous Region",     Abbreviation: "Nei Menggu", Capital: "Hohhot"},
                {StateName: "Liaoning Province",       Abbreviation: "Liao", Capital: "Shenyang"},
                {StateName: "Jilin Province",    Abbreviation: "Jí", Capital: "Changchun"},
                {StateName: "Heilongjiang Province",       Abbreviation: "Hei", Capital: "Harbin"},
                {StateName: "Shanghai Municipality",        Abbreviation: "Hu", Capital: "Shanghai"},
                {StateName: "Jiangsu Province",        Abbreviation: "Su", Capital: "Nanjing"},
                {StateName: "Zhejiang Province",         Abbreviation: "Zhe", Capital: "Hangzhou"},
                {StateName: "Anhui Province",          Abbreviation: "Wan", Capital: "Hefei"},
                {StateName: "Fujian Province",       Abbreviation: "Min", Capital: "Fuzhou"},
                {StateName: "Jiangxi Province",        Abbreviation: "Gàn", Capital: "Nanchang"},
                {StateName: "Shandong Province",           Abbreviation: "Lu", Capital: "Jinan"},
                {StateName: "Henan Province",         Abbreviation: "Yù", Capital: "Zhengzhou"},
                {StateName: "Hubei Province",       Abbreviation: "E", Capital: "Wuhan"},
                {StateName: "Hunan Province",      Abbreviation: "Xiang", Capital: "Changsha"},
                {StateName: "Guangdong",          Abbreviation: "Yue", Capital: "Guangzhou"},
                {StateName: "Guangxi Zhuang Autonomous Region",       Abbreviation: "Gui", Capital: "Nanning"},
                {StateName: "Hainan Province",  Abbreviation: "Qiong", Capital: "Haikou"},
                {StateName: "Chongqing Municipality",       Abbreviation: "Yú", Capital: "Chongqing"},
                {StateName: "Sichuan Province",      Abbreviation: "Chuan", Capital: "Chengdu"},
                {StateName: "Guizhou Province",    Abbreviation: "Qian", Capital: "Guiyang"},
                {StateName: "Yunnan Province",       Abbreviation: "Yun", Capital: "Kunming"},
                {StateName: "Tibet Autonomous Region",        Abbreviation: "Zang", Capital: "Lhasa"},
                {StateName: "Shaanxi Province",       Abbreviation: "Shan", Capital: "Xi'an"},
                {StateName: "Gansu Province",         Abbreviation: "Gān", Capital: "Lanzhou"},
                {StateName: "Qinghai Province",  Abbreviation: "Qing", Capital: "Xining"},
                {StateName: "Ningxia Hui Autonomous Region",     Abbreviation: "Ning", Capital: "Yinchuan"},
                {StateName: "Xinjiang Uyghur Autonomous Region",     Abbreviation: "Xin", Capital: "Ürümqi"},
                {StateName: "Taiwan Province",       Abbreviation: "Tai", Capital: "Taipei"},
                {StateName: "Hong Kong Special Administrative Region", Abbreviation: "Gang", Capital: "Hong Kong" },
                {StateName: "Macau Special Administrative Region",   Abbreviation: "Ao", Capital: "Macau"}
            ];

var counter = 0;

var states = {
    START: "_START",
    QUIZ: "_QUIZ"
};

const handlers = {
     "LaunchRequest": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
     },
    "QuizIntent": function() {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "AnswerIntent": function() {
        this.handler.state = states.START;
        this.emitWithState("AnswerIntent");
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
    }
};

var startHandlers = Alexa.CreateStateHandler(states.START,{
    "Start": function() {
        this.emit(":ask", WELCOME_MESSAGE, HELP_MESSAGE);
    },
    "AnswerIntent": function() {
        var item = getItem(this.event.request.intent.slots);

        if (item && item[Object.getOwnPropertyNames(data[0])[0]] != undefined)
        {
          console.log("\nMEMO's TEST\n");
          this.emit(":ask", getSpeechDescription(item), REPROMPT_SPEECH);
        }
        else
        {
            this.emit(":ask", getBadAnswer(item), getBadAnswer(item));

        }
    },
    "QuizIntent": function() {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.emitWithState("Start");
    }
});


var quizHandlers = Alexa.CreateStateHandler(states.QUIZ,{
    "Quiz": function() {
        this.attributes["response"] = "";
        this.attributes["counter"] = 0;
        this.attributes["quizscore"] = 0;
        this.emitWithState("AskQuestion");
    },
    "AskQuestion": function() {
        if (this.attributes["counter"] == 0)
        {
            this.attributes["response"] = START_QUIZ_MESSAGE + " ";
        }

        var random = getRandom(0, data.length-1);
        var item = data[random];

        var propertyArray = Object.getOwnPropertyNames(item);
        var property = propertyArray[getRandom(1, propertyArray.length-1)];

        this.attributes["quizitem"] = item;
        this.attributes["quizproperty"] = property;
        this.attributes["counter"]++;

        var question = getQuestion(this.attributes["counter"], property, item);
        var speech = this.attributes["response"] + question;

        this.emit(":ask", speech, question);
    },
    "AnswerIntent": function() {
        var response = "";
        var item = this.attributes["quizitem"];
        var property = this.attributes["quizproperty"]

        var correct = compareSlots(this.event.request.intent.slots, item[property]);

        if (correct)
        {
            response = getSpeechCon(true);
            this.attributes["quizscore"]++;
        }
        else
        {
            response = getSpeechCon(false);
        }

        response += getAnswer(property, item);

        if (this.attributes["counter"] < 10)
        {
            response += getCurrentScore(this.attributes["quizscore"], this.attributes["counter"]);
            this.attributes["response"] = response;
            this.emitWithState("AskQuestion");
        }
        else
        {
            response += getFinalScore(this.attributes["quizscore"], this.attributes["counter"]);
            this.emit(":tell", response + " " + EXIT_SKILL_MESSAGE);
        }
    },
    "AMAZON.StartOverIntent": function() {
        this.emitWithState("Quiz");
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", EXIT_SKILL_MESSAGE);
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.emitWithState("AnswerIntent");
    }
});

function compareSlots(slots, value)
{
    for (var slot in slots)
    {
        if (slots[slot].value != undefined)
        {
            if (slots[slot].value.toString().toLowerCase() == value.toString().toLowerCase())
            {
                return true;
            }
        }
    }
    return false;
}

function getRandom(min, max)
{
    return Math.floor(Math.random() * (max-min+1)+min);
}

function getRandomSymbolSpeech(symbol)
{
    return "<say-as interpret-as='spell-out'>" + symbol + "</say-as>";
}

function getItem(slots)
{
    var propertyArray = Object.getOwnPropertyNames(data[0]);
    var value;

    for (var slot in slots)
    {
        if (slots[slot].value !== undefined)
        {
            value = slots[slot].value;
            for (var property in propertyArray)
            {
                var item = data.filter(x => x[propertyArray[property]].toString().toLowerCase() === slots[slot].value.toString().toLowerCase());
                if (item.length > 0)
                {
                    return item[0];
                }
            }
        }
    }
    return value;
}

function getSpeechCon(type)
{
    var speechCon = "";
    if (type) return "<say-as interpret-as='interjection'>" + speechConsCorrect[getRandom(0, speechConsCorrect.length-1)] + "! </say-as><break strength='strong'/>";
    else return "<say-as interpret-as='interjection'>" + speechConsWrong[getRandom(0, speechConsWrong.length-1)] + " </say-as><break strength='strong'/>";
}

function formatCasing(key)
{
    key = key.split(/(?=[A-Z])/).join(" ");
    return key;
}

function getTextDescription(item)
{
    var text = "";

    for (var key in item)
    {
        text += formatCasing(key) + ": " + item[key] + "\n";
    }
    return text;
}

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers, startHandlers, quizHandlers);
    alexa.execute();
};
