// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
    const blogForm = document.getElementById('blogForm');
    if (!blogForm) return;

    const API_BASE_URL = 'http://localhost:3000/api/posts';

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
    blogForm.addEventListener('submit', async function (e) {
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

        // If form is valid -> Send Data to Server (API Call)
        if (isValid) {
            const newPost = {
                title: titleInput.value.trim(),
                category: categoryInput.value,
                content: contentInput.value.trim(),
                author: 'Admin'
            };

            try {
                const response = await fetch(API_BASE_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newPost)
                });

                const result = await response.json();

                if (result.success) {
                    successMessage.textContent = '🎉 Blog post published successfully!';
                    successMessage.style.color = 'green';
                    successMessage.style.marginTop = '10px';
                    
                    blogForm.reset(); // Clear input fields

                    // Redirect to home page after 1.5 seconds
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1500);
                } else {
                    showError(successMessage, result.message || 'Error publishing blog.');
                }
            } catch (error) {
                showError(successMessage, 'Failed to connect to the server. Make sure node server.js is running.');
            }
        }
    });

    // Event: Live validation clearing when user types
    [titleInput, categoryInput, contentInput].forEach((input) => {
        if (!input) return;
        input.addEventListener('input', () => {
            const errorSpan = document.getElementById(`${input.id}Error`);
            if (errorSpan) errorSpan.textContent = '';
            if (successMessage) successMessage.textContent = '';
        });
    });

    // Helper Functions
    function showError(element, message) {
        if (!element) return;
        element.textContent = message;
        element.style.color = '#e74c3c';
        element.style.fontSize = '14px';
    }

    function clearErrors() {
        if (titleError) titleError.textContent = '';
        if (categoryError) categoryError.textContent = '';
        if (contentError) contentError.textContent = '';
        if (successMessage) successMessage.textContent = '';
    }
});