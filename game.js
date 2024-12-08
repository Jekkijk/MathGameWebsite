function saveScore() {
    const username = prompt("Enter your username:");
    const finalScore = document.getElementById("final-score").textContent;

    fetch('save_score.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, score: finalScore }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Score saved successfully!");
            showLeaderboard();
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error("Error saving score:", error));
}

function showLeaderboard() {
    fetch('fetch_leaderboard.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const leaderboard = data.leaderboard;
                const leaderboardDiv = document.getElementById("leaderboard");
                leaderboardDiv.innerHTML = "<h2>Leaderboard</h2>";
                leaderboard.forEach((entry, index) => {
                    leaderboardDiv.innerHTML += `<p>${index + 1}. ${entry.username} - ${entry.score}</p>`;
                });
            }
        })
        .catch(error => console.error("Error fetching leaderboard:", error));
}
