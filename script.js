// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
    const blogForm = document.getElementById('blogForm');

    // Get Form Elements
    const titleInput = document.getElementById('title');
    const categoryInput = document.getElementById('category');
    const contentInput = document.getElementById('content');

    // Get Error Containers
    const titleError = document.getElementById('titleError');
    const categoryError = document.getElementById('categoryError');
    const contentError = document.getElementById('contentError');
    const successMessage = document.getElementById('successMessage');

    // Form Submit Event Listener
    blogForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Stop form submission / refresh

        clearErrors();
        let isValid = true;

        // 1. Title Validation
        if (titleInput.value.trim() === '') {
            showError(titleError, 'Title is required.');
            isValid = false;
        } else if (titleInput.value.trim().length < 5) {
            showError(titleError, 'Title must be at least 5 characters long.');
            isValid = false;
        }

        // 2. Category Validation
        if (categoryInput.value === '') {
            showError(categoryError, 'Please select a category.');
            isValid = false;
        }

        // 3. Content Validation
        if (contentInput.value.trim() === '') {
            showError(contentError, 'Blog content cannot be empty.');
            isValid = false;
        } else if (contentInput.value.trim().length < 15) {
            showError(contentError, 'Content must be at least 15 characters.');
            isValid = false;
        }

        // If form is valid
        if (isValid) {
            successMessage.textContent = '🎉 Blog post published successfully!';
            successMessage.style.color = 'green';
            successMessage.style.marginTop = '10px';
            
            blogForm.reset(); // Clear input fields
        }
    });

    // Event: Live validation clearing when user types
    [titleInput, categoryInput, contentInput].forEach((input) => {
        input.addEventListener('input', () => {
            const errorSpan = document.getElementById(`${input.id}Error`);
            if (errorSpan) errorSpan.textContent = '';
            successMessage.textContent = '';
        });
    });

    // Helper Functions
    function showError(element, message) {
        element.textContent = message;
        element.style.color = 'red';
        element.style.fontSize = '14px';
    }

    function clearErrors() {
        titleError.textContent = '';
        categoryError.textContent = '';
        contentError.textContent = '';
        successMessage.textContent = '';
    }
});