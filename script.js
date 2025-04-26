document.addEventListener('DOMContentLoaded', () => {
  const newsArea = document.getElementById('news-area');

  async function getTheNews() {
    const response = await fetch('public/nba-news.json'); // Ask our Netlify code for the news
    const data = await response.json(); // Get the news in a readable format
    console.log("Fetched news data:", data);
    displayTheNews(data); // Show the news on the webpage
  }

  function displayTheNews(newsList) {
    newsList.forEach(newsItem => {
      const newsElement = document.createElement('div');
      newsElement.innerHTML = `<h3>${newsItem.Title}</h3><p>${newsItem.Content}</p>`;
      newsArea.appendChild(newsElement);
    });
  }

  getTheNews(); // When the page loads, go get the news
});