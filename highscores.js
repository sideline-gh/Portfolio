const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
highScoresList.innerHTML = highScores
  .map(score => {
    return `
      <li class="list-item">
        <span class="list-user">${score.name}</span>
        <span class="user-score">${score.score}</span>
      </li>
    `;
  })
  .join("");