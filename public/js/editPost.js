const updateFormHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    // Grab title and post content
    const postContent = document.querySelector("textarea[name='content']").value.trim();
    const postTitle = document.querySelector("input[name='title']").value.trim();

    const response = await fetch(`/api/post/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        post_title: postTitle,
        post_content: postContent,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // replace url
      document.location.replace("/profile");
    } else {
      // console log an error message
    }
  }
};

document
  .querySelector('.edit-post-form')
  .addEventListener('submit', updateFormHandler);
