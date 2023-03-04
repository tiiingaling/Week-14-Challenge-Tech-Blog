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