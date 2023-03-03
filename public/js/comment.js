document.querySelector('#comment-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const commentText = document.querySelector('#comment-text').value.trim();
  
    if (commentText) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment_text: commentText }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        location.reload();
      } else {
        alert('Failed to add comment');
      }
    }
  });