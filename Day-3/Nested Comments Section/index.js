// script.js
function addComment(parentId = null) {
    const input = parentId ? document.querySelector(`#reply-input-${parentId}`) : document.getElementById('new-comment');
    const text = input.value.trim();
    if (!text) {
        alert("Please enter some text!");
        return;
    }

    const commentNode = document.createElement('div');
    commentNode.classList.add(parentId ? 'reply' : 'comment');
    commentNode.innerHTML = `
        <p>${text}</p>
        <button onclick="addReplyInput(${Date.now() + Math.random()})">Add a reply</button>
        <div id="replies-${Date.now() + Math.random()}"></div>
    `;

    if (parentId) {
        const parentRepliesContainer = document.querySelector(`#replies-${parentId}`);
        parentRepliesContainer.appendChild(commentNode);
        input.value = ''; // Clear the reply input after submitting
    } else {
        const commentsContainer = document.getElementById('comments-container');
        commentsContainer.appendChild(commentNode);
        input.value = ''; // Clear the main input after submitting
    }
}

function addReplyInput(parentId) {
    const repliesContainer = document.querySelector(`#replies-${parentId}`);
    if (!document.querySelector(`#reply-input-${parentId}`)) {
        const replyForm = document.createElement('div');
        replyForm.innerHTML = `
            <input type="text" id="reply-input-${parentId}" placeholder="Type your reply here..." />
            <button onclick="addComment(${parentId})">Submit Reply</button>
        `;
        repliesContainer.appendChild(replyForm);
    }
}

