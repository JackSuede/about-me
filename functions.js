

const database = firebase.database();

//Load and display comments
database.ref(`/comments`).on('value', getComments, errData);


// Adds event listeners to comment submit buttons.
(function () {

    const submit = document.querySelectorAll('.submit');
    
    for (let ii = 0; ii < submit.length; ii++) {
        submit[ii].addEventListener('click', submitComment, );
        
    }

})();


// Adds event listeners to toggle the classes for the like button.
(function () {
    const headerInputDivs = document.querySelectorAll('.new-comment__header-inputs');
    console.log('this', headerInputDivs)

    headerInputDivs.forEach(headerInputDiv => {
        headerInputDiv.addEventListener('click', e => {

            const likeCheckbox = headerInputDiv.querySelector('.like');
            const likeLabel = headerInputDiv.querySelector('.like-label');
            if(likeCheckbox.checked) {
                likeLabel.classList.add('like-label--liked');
                likeLabel.textContent = 'Liked!';
            } else {
                likeLabel.classList.remove('like-label--liked');
                likeLabel.textContent = 'I like';
            }

        });
    });
})();


function getComments(data) {
    const packages = data.val();

    const commentSections = document.querySelectorAll('.comment-section');

    for (let ii = 0; ii < commentSections.length; ii++) {
        
        const commentSection = commentSections[ii];
        const commentsDiv = commentSection.querySelector('.comments')
        commentsDiv.innerHTML = "";
        
        const comments  = packages[commentSection.id]

        for (const commentId in comments) {

            if (comments.hasOwnProperty(commentId)) {
                const comment = comments[commentId];
                
                const likedText = getLikedText(comment.liked);
                commentsDiv.innerHTML += getCommentHTML(comment.name, likedText, comment.commentBody);
                
            }
        }
    }
}


function submitComment() {
    event.preventDefault();
    
    const form = document.querySelector('#' + event.target.parentNode.parentNode.parentNode.id);
    console.log('form', form);
    
    const commentField = form.querySelector('.comment-field');
    const liked = form.querySelector('.like');
    
    const name = form.querySelector('.new-comment__name');
    
    database.ref(`/comments/${form.id}`).push({
        name: name.value,
        commentBody: commentField.value,
        liked: liked.checked
    });
}

function getCommentHTML(name, likedText, comment) {
    return (`
        <article class="comment">
            <header class="comment__header">${name} ${likedText}: </header>
            <main class="comment__body">${comment}</main>
        </article>
    
       `);
}

function getLikedText(bool) {
    let text;
    
    if (bool) text = 'Liked';
    else text = "Didn't like";

    return text;
}

function errData (err) {
    console.log('error', err);
    alert('There was an error in submitting your comment', err);
}

