class CSVManager {
    constructor(filename = 'Notes.csv') {
        this.filename = filename;
    }

    // Convert CSV to array of users
    parseCSV(csvText) {
        // Split the CSV into lines, skip header if exists
        const lines = csvText.trim().split('\n');
        const headers = ['name', 'email', 'usn'];
        
        return lines.map(line => {
            const values = line.split(',');
            return {
                name: values[0],
                email: values[1],
                usn: values[2]
            };
        });
    }

    // Convert array of users to CSV text
    toCSV(users) {
        return users.map(user => 
            `${user.name},${user.email},${user.usn}`
        ).join('\n');
    }

    // Get all users
    getUsers() {
        const csvText = localStorage.getItem(this.filename) || '';
        return csvText ? this.parseCSV(csvText) : [];
    }

    // Add a new user
    addUser(user) {
        const users = this.getUsers();
        
        // Check if user already exists
        const existingUser = users.find(
            u => u.email === user.email || u.usn === user.usn
        );

        if (existingUser) {
            return false;
        }

        // Add new user
        users.push(user);
        
        // Save back to localStorage
        localStorage.setItem(this.filename, this.toCSV(users));
        return true;
    }

    // Validate user for login
    validateUser(email, usn) {
        const users = this.getUsers();
        return users.find(
            user => user.email === email && user.usn === usn
        );
    }

    // Clear all users (for debugging)
    clearUsers() {
        localStorage.removeItem(this.filename);
    }
}

// Create a global instance
const csvManager = new CSVManager();




document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const messageDiv = document.getElementById('message');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const usn = document.getElementById('usn').value;

        // Attempt to add user
        const addResult = csvManager.addUser({ name, email, usn });

        if (addResult) {
            // Success
            messageDiv.classList.remove('error');
            messageDiv.classList.add('success');
            messageDiv.textContent = 'Registration successful! Redirecting...';
            
            // Redirect to login page
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            // User already exists
            messageDiv.classList.remove('success');
            messageDiv.classList.add('error');
            messageDiv.textContent = 'User with this email or USN already exists';
        }
    });

    // Debug buttons
    document.getElementById('viewUsersBtn').addEventListener('click', () => {
        const users = csvManager.getUsers();
        alert(JSON.stringify(users, null, 2));
    });

    document.getElementById('clearUsersBtn').addEventListener('click', () => {
        csvManager.clearUsers();
        alert('All users have been cleared');
    });
});