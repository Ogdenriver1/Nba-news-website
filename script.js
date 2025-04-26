document.addEventListener('DOMContentLoaded', () => {
  const newsArea = document.getElementById('news-area');

  async function getTheNews() {
    const response = await fetch('/.netlify/functions/news'); // Ask our Netlify code for the news
    const data = await response.json(); // Get the news in a readable format
    displayTheNews(data.news); // Show the news on the webpage
  }

  function displayTheNews(newsList) {
    newsList.forEach(newsItem => {
      const newsElement = document.createElement('div');
      newsElement.innerHTML = `<h3>${newsItem.title}</h3><p>${newsItem.summary}</p>`;
      newsArea.appendChild(newsElement);
    });
  }

  getTheNews(); // When the page loads, go get the news
});