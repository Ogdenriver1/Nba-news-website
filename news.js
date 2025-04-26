exports.handler = async (event, context) => {
  // Imagine we went to a news website and got this:
  const basketballNews = [
    { title: "Big Game Tonight!", summary: "Two top teams face off." },
    { title: "Player Scores Record", summary: "Amazing performance last night." },
  ];

  // Now we send this news back in a format your website can read
  return {
    statusCode: 200, // Everything is okay!
    body: JSON.stringify({ news: basketballNews }), // Send the news as organized data
    headers: {
      'Content-Type': 'application/json', // Tell the website it's getting data
    },
  };
};