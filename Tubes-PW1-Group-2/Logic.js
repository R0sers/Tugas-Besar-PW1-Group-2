const questions = [
    {
        q: "1) Ada Topi di atas kulkas. Itu berarti kulkas ada di ___ topi?",
        choices: ["A) bawah", "B) atas", "C) belakang"],
        correct: 0
    },
    {
        q: "2) 100Kg Besi __ 100Kg Bulu. Tentukan tanda yang tepat!",
        choices: ["A) <", "B) =", "C) >="],
        correct: 1
    },
    {
        q: "3) Jika di luar hujan, maka jalanan akan basah. Jika jalanan basah, maka mobil akan kotor. Jika di luar hujan, maka mobil akan ___?",
        choices: ["A) Basah", "B) Hujan", "C) Kotor"],
        correct: 2
    },
    {
        q: "4) Semua yang hidup di air adalah ikan, paus hidup di air. Maka paus adalah ikan. Pernyataan tersebut adalah ___?",
        choices: ["A) Valid dan Empiris", "B) Valid dan tidak Empiris", "C) Valid atau Empiris"],
        correct: 1
    },
    {
        q: "5) X+Y = 11000 , Selisih X dan Y Adalah 10000 , jika X>Y maka nilai Y adalah?",
        choices: ["A) 500", "B) 1000", "C) 1500"],
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
    window.location.href = "Page1.html";
});

render();
