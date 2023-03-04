const addComment = async (event) => {
  event.preventDefault();

  console.log('addComment function called');

  const commentText = document.querySelector('#comment-text').value.trim();
  const postId = document.querySelector('#comment-form').getAttribute('data-postid');
  
  console.log('commentText:', commentText);
  console.log('postId:', postId);

  if (commentText) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ commentText: commentText, post_id: postId }) ,
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('response:', response);

    if (response.ok) {
      console.log('comment added!', commentText);
      setTimeout(() => {
        location.reload();
      }, 1000); // reload the page after a 1 second delay
    } else {
      alert('Failed to add comment');
    }    
  }
};


document.querySelector('#comment-form').addEventListener('submit', addComment);


// const editComment = 



document
    .querySelector('#comment-form')
    .addEventListener('submit', addComment);


// document
//     .querySelector('.comment-list')
//     .addEventListener('click', editComment);

// document
//     .querySelectorAll('.delete-comment')
//     .addEventListener('click', deleteComment);

const deleteComment = async (event) => {
  const deleteButtons = document.querySelectorAll('.delete-comment');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const commentId = event.target.getAttribute('data-commentid');
      try {
        const response = await fetch(`/api/comments/${commentId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('comment ID: ', commentId)
        if (response.ok) {
          // If the response is successful, remove the deleted comment from the DOM
          event.target.parentNode.remove();
        } else {
          // If the response is not successful, display an error message
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
      } catch (err) {
        console.error(err);
        alert('Failed to delete comment');
      }
    });
  });
};

deleteComment();
