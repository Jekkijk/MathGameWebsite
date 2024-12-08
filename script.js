let score = 0;
let timeLeft = 30;
let timer = null;
let solution = null;
let questionCount = 0; 


async function fetchQuestion() {
    if (questionCount >= 5) {
        gameOver(); 
        return;
    }

    try {
        const response = await fetch("https://marcconrad.com/uob/banana/api.php?out=json");
        if (!response.ok) {
            throw new Error(`Failed to fetch question: ${response.status}`);
        }

        const data = await response.json();
        document.getElementById("question-image").src = data.question; 
        solution = data.solution; 
        questionCount++; 
        resetTimer(); 
    } catch (error) {
        console.error(error);
    }
}


function submitAnswer() {
    const userAnswer = document.getElementById("answer").value.trim();

    if (userAnswer === String(solution)) {
        alert("Correct Answer!");
        score += 10; 
        document.getElementById("score").textContent = score; 
        fetchQuestion(); 
    } else {
        alert("Incorrect Answer. Try again!");
    }

    document.getElementById("answer").value = ""; 
    resetTimer(); 
}


function resetTimer() {
    clearInterval(timer); 
    timeLeft = 30;
    document.getElementById("time").textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft -= 1;
        document.getElementById("time").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up!");

            if (questionCount < 5) {
                fetchQuestion(); 
            } else {
                gameOver(); 
            }
        }
    }, 1000);
}


function gameOver() {
    clearInterval(timer); 
    timer = null; 
    document.getElementById("quiz-content").style.display = "none"; 
    document.getElementById("game-over").style.display = "block"; 
    document.getElementById("final-score").textContent = score; 
}


function saveScore() {
    const username = prompt("Enter your name to save your score:");
    if (username && username.trim() !== "") {
        let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
        leaderboard.push({ name: username, score: score });
        leaderboard.sort((a, b) => b.score - a.score); 
        leaderboard = leaderboard.slice(0, 5); 
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
        alert("Your score has been saved!");
    }
    location.href = "leaderboard.html"; 
}


function resetGame() {
    score = 0;
    questionCount = 0;
    document.getElementById("game-over").style.display = "none"; 
    document.getElementById("quiz-content").style.display = "block"; 
    fetchQuestion(); 
}


document.addEventListener("DOMContentLoaded", () => {
    fetchQuestion(); 
});


async function saveScore() {
    const username = prompt("Enter your name to save your score:");
    if (username && username.trim() !== "") {
        try {
            // Send score to the server
            const response = await fetch("save_score.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: username, score: score }),
            });

            if (!response.ok) {
                throw new Error("Failed to save score.");
            }

            const result = await response.json();
            if (result.success) {
                alert("Your score has been saved!");
                location.href = "leaderboard.html"; // Redirect to leaderboard page
            } else {
                alert("Error saving score. Please try again later.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while saving your score.");
        }
    }
}
