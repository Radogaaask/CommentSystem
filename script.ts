const commentInput = document.getElementById('comment-input') as HTMLTextAreaElement;
const submitButton = document.getElementById('submit-comment') as HTMLButtonElement;
const commentList = document.querySelector('.comment-list') as HTMLDivElement;

class CommentSystem {
  comments: { text: string; rating: number }[] = [];

  constructor() {
    // Загрузка комментариев из localStorage при инициализации
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      this.comments = JSON.parse(storedComments);
      this.displayComments();
    }
  }

  addComment(text: string) {
    const newComment = { text, rating: 0 };
    this.comments.push(newComment);
    this.saveComments();
    this.displayComments();
  }

  displayComments() {
    commentList.innerHTML = '';
    this.comments.forEach((comment, index) => {
      const commentElement = document.createElement('div');
      commentElement.classList.add('comment');
      commentElement.innerHTML = `
        <div class="comment-content">
          ${comment.text}
        </div>
        <button class="upvote-button" onclick="commentSystem.changeRating(${index}, 1)">Upvote</button>
        <span class="rating">${comment.rating}</span>
      `;
      commentList.appendChild(commentElement);
    });
  }

  changeRating(index: number, increment: number) {
    this.comments[index].rating += increment;
    this.displayComments();
  }

  saveComments() {
    localStorage.setItem('comments', JSON.stringify(this.comments));
  }

  handleCommentInput() {
    submitButton.disabled = commentInput.value.trim().length === 0 || commentInput.value.length > 1000;
  }
}

const commentSystem = new CommentSystem();

commentInput.addEventListener('input', () => {
  commentSystem.handleCommentInput();
});

submitButton.addEventListener('click', () => {
  if (!submitButton.disabled) {
    commentSystem.addComment(commentInput.value);
    commentInput.value = '';
    submitButton.disabled = true;
  }
});