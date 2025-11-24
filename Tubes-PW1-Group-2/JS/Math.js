const questions = [
    {
        q: "1) Nilai dari 45 ÷ 5",
        choices: ["A) 9", "B) 11", "C) 7"],
        correct: 0
    },
    {
        q: "2) Jika 3^x = 27, maka x = ?",
        choices: ["A) 2", "B) 3", "C) 4"],
        correct: 1
    },
    {
        q: "3) Mana yang merupakan bilangan prima?",
        choices: ["A) 21", "B) 15", "C) 17"],
        correct: 2
    },
    {
        q: "4) 5 + 7 × 2 = ? (urut operasi)",
        choices: ["A) 24", "B) 19", "C) 26"],
        correct: 1
    },
    {
        q: "5) Suku ke-1 barisan aritmetika 3, 7, 11,... adalah?",
        choices: ["A) 3", "B) 7", "C) 11"],
        correct: 0
    }
];

let idx = 0;
const answers = new Array(questions.length).fill(null);

const qNumber = document.getElementById("q-number");
const qText = document.getElementById("q-text");
const optionsWrap = document.getElementById("options");
const progressPill = document.getElementById("progress-pill");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const resultWrap = document.getElementById("result-wrap");

function render() {
    const curr = questions[idx];

    qNumber.textContent = `Soal ${idx + 1}`;
    qText.textContent = curr.q;
    progressPill.textContent = `${idx + 1}/${questions.length} Soal`;

    optionsWrap.innerHTML = "";

    curr.choices.forEach((c, i) => {
        const id = `opt-${idx}-${i}`;

        const wrapper = document.createElement("label");
        wrapper.className = "option";
        wrapper.innerHTML = `
            <input type="radio" name="choice" id="${id}" value="${i}">
            <div>${c}</div>
        `;

        const input = wrapper.querySelector("input");


        if (answers[idx] === i) input.checked = true;


        input.addEventListener("change", () => {
            answers[idx] = i;
            nextBtn.disabled = false;
        });

        optionsWrap.appendChild(wrapper);
    });


    prevBtn.disabled = idx === 0;

    if (idx === questions.length - 1) {
        nextBtn.style.display = "none";
        submitBtn.style.display = "inline-block";
    } else {
        nextBtn.style.display = "inline-block";
        submitBtn.style.display = "none";
    }

    nextBtn.disabled = answers[idx] === null;
}

prevBtn.addEventListener("click", () => {
    if (idx > 0) idx--;
    render();
});

nextBtn.addEventListener("click", () => {
    if (answers[idx] === null) {
        alert("Pilih jawaban dulu ya ");
        return;
    }
    idx++;
    render();
});

submitBtn.addEventListener("click", () => {
    let score = 0;
    let details = "";

    questions.forEach((q, i) => {
        const correct = q.correct;
        const your = answers[i];

        if (your === correct) score++;

        details += `
        <div style="margin-top:6px">
            Soal ${i + 1}: Jawabanmu <strong>${your === null ? "—" : q.choices[your]}</strong> —
            Jawaban Benar: <strong>${q.choices[correct]}</strong>
            ${your === correct ? "✅" : "❌"}
        </div>
        `;
    });

    resultWrap.innerHTML = `
        <div class="result">
            <strong>Hasil: ${score} / ${questions.length}</strong>
            <div>${details}</div>
        </div>
    `;

    prevBtn.disabled = true;
    nextBtn.disabled = true;
    submitBtn.disabled = true;
});

document.getElementById("report-btn").addEventListener("click", () => {
    alert("Laporan soal terkirim!");
    
});

document.getElementById("goto").addEventListener("click", () => {
    window.location.href = "../Page1.html";
});

render();
