const addComment = async (event) => {
    event.preventDefault();

    const commentText = document.querySelector('#comment-text').value.trim();
  
    if (commentText) {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ comment_text: commentText }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('comment added!', commentText)
      if (response.ok) {
        location.reload();
      } else {
        alert('Failed to add comment');
      }
    }
  };

// const editComment = 

// const deleteComment = 

document
    .querySelector('#comment-form')
    .addEventListener('submit', addComment);


// document
//     .querySelector('.comment-list')
//     .addEventListener('click', editComment);

// document
    // .querySelector('.comment-list')
    // .addEventListener('click', deleteComment);