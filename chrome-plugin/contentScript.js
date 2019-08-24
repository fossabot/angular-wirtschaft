let question = '';

const timeout = 500;

const answers = $('.answer .ml-1');
const listAnswer = $('.answer .ml-1 ol')[0];
const answerText = answers.toArray().map(i =>
    cleanStr($(i).clone()
        .find('span:first')
        .remove()
        .end()
        .text()));

const title = cleanStr($('h2').text());
const prompt = $('.ablock .prompt').text().trim();
const rightAnswers = $('.rightanswer').text();
const comments = $('.comment_list div p:nth-child(2)').toArray().map(i => cleanStr($(i).text()));

main();

async function main() {
    let answerType = '';
    if (prompt === 'Wählen Sie eine oder mehrere Antworten:') {
        answerType = 'checkbox';
        $('.answer input[type="checkbox"]')[0].checked = true;
        question = cleanStr($('.qtext').text());
    } else {
        answerType = 'radio';
        $('.answer input')[0].checked = true;
        question = cleanStr($('.qtext').text());
    }

    console.log(question, answerText);

    if (!question || answerText.length === 0) {
        return;
    }

    const items = await loadQuestions();

    if (listAnswer) {
        saveQuestions(items);
        return;
    }

    let existing = items[question];
    if (!existing) {
        items[question] = existing = {
            type: answerType,
            answers: answerText,
            title,
        };
    }

    if (answerText && answerText.length > 0) {
        existing.answers = answerText;
    }

    if (comments && comments.length > 0) {
        existing.comments = comments;
    }

    if (rightAnswers) {
        if (rightAnswers.startsWith('Die richtige Antwort lautet: ')) {
            existing.correctAnswers = [
                cleanStr(rightAnswers.substr('Die richtige Antwort lautet: '.length))
            ];
        } else if (rightAnswers.startsWith('Die richtigen Antworten sind: ')) {
            existing.correctAnswers = existing.answers.filter(a => rightAnswers.indexOf(a) >= 0);
        }

        const notExistingAnswers = existing.correctAnswers
            .filter(ca => existing.answers.indexOf(ca) === -1);

        if (notExistingAnswers.length > 0) {
            console.log(notExistingAnswers);
            console.log(existing.answers);
            return;
        }
    }

    saveQuestions(items);
}

function loadQuestions() {
    return new Promise(resolve => {
        chrome.storage.local.get(items => {
            resolve(items);
        });
    });
}

async function saveQuestions(items) {
    return new Promise(resolve => {
        chrome.storage.local.set(items, async function () {
            const checkBtn = $('.im-controls input')[0];
            if (checkBtn) {
                $(checkBtn).click();
            }

            await wait();

            const rateStar = $('.studentquiz_behaviour .rating span')[2];
            if (rateStar) {
                $(rateStar).click();
            }

            await wait();

            const nextBtn = $('.mod-studentquiz-attempt-nav .pull-right input')[0];
            if (nextBtn) {
                $(nextBtn).click();
            }

            resolve();
        });
    })
}

function wait() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, timeout)
    })
}

function cleanStr(value) {
    if (!value) {
        return null;
    }
    return value.trim(); //.replace(/\n/g, ' ');
}
