
function addCommentSections () {
    const commentSections = document.querySelectorAll('.comment-section');
    console.log('cs', commentSections.length)
    
    for (let ii = 0; ii < commentSections.length; ii++) {
        const commentSection = commentSections[ii];
        
        const newSection = createCommentSection(ii + 1);
        commentSection.appendChild(newSection);
    }
    
}

addCommentSections();

function createCommentSection(uniqueId) {

    const form = document.createElement('form');
    form.className = 'new-comment';
    form.innerHTML = (

        `
        <label for="comment-field-${uniqueId}">Comment</label>
        <textarea class="comment-field"  id="comment-field-${uniqueId}" placeholder="Got something to say?"></textarea>
        
        <div class="new-comment__header-inputs">
            <input id="name-${uniqueId}" class="new-comment__name" type="text" placeholder="Your name">
            <label for="like-${uniqueId}" class="like-label">I like</label>
            <input type="checkbox" class="like" id="like-${uniqueId}">
            <button class="submit">Done</button>
        </div>
        `
    );

    return form;
}