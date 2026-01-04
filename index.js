console.log('Script started');

// Make sure we have the element
const postList = document.getElementById('post-list');
console.log('Post list element:', postList);

if (!postList) {
    // Create it if it doesn't exist
    console.log('Creating post-list element');
    const ul = document.createElement('ul');
    ul.id = 'post-list';
    document.body.appendChild(ul);
}

// Add content immediately (before async fetch)
console.log('Adding immediate content');
postList.innerHTML = `
    <li>
        <h1>sunt aut facere repellat provident occaecati excepturi optio reprehenderit</h1>
        <p>Loading more posts...</p>
    </li>
`;

// Then try to fetch more
async function loadPosts() {
    try {
        console.log('Starting fetch');
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
        console.log('Got', posts.length, 'posts');
        
        // Clear and add new posts
        postList.innerHTML = '';
        
        // Add first few posts
        for (let i = 0; i < Math.min(3, posts.length); i++) {
            const li = document.createElement('li');
            const h1 = document.createElement('h1');
            const p = document.createElement('p');
            
            h1.textContent = posts[i].title;
            p.textContent = posts[i].body;
            
            li.appendChild(h1);
            li.appendChild(p);
            postList.appendChild(li);
        }
        
    } catch (error) {
        console.error('Fetch failed:', error);
        // Keep the fallback content we already added
    }
}

// Start loading
loadPosts();