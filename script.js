// script.js

const searchBtn = document.getElementById("search-btn");
const usernameInput = document.getElementById("username");
const userSection = document.getElementById("user-section");

searchBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (username) {
    fetchUser(username);
  } else {
    alert("Please enter a GitHub username!");
  }
});

async function fetchUser(username) {
  userSection.innerHTML = "<p>Loading...</p>";
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error("User not found");
    const user = await response.json();
    displayUser(user);
  } catch (error) {
    userSection.innerHTML = `<p>${error.message}</p>`;
  }
}

function displayUser(user) {
  userSection.innerHTML = `
    <div class="user-card">
      <img src="${user.avatar_url}" alt="${user.login}" />
      <h2>${user.name || user.login}</h2>
      <p><strong>Username:</strong> ${user.login}</p>
      <p><strong>Bio:</strong> ${user.bio || 'N/A'}</p>
      <p><strong>Followers:</strong> ${user.followers} | <strong>Following:</strong> ${user.following}</p>
      <p><strong>Public Repos:</strong> ${user.public_repos}</p>
      <a href="${user.html_url}" target="_blank">View Profile</a>
    </div>
  `;
}
