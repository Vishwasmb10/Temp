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
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const usn = document.getElementById('usn').value;
        const email = document.getElementById('email').value;

        // Validate user
        const validUser = csvManager.validateUser(email, usn);

        if (validUser) {
            // Store current user in localStorage for session
            localStorage.setItem('currentUser', JSON.stringify(validUser));

            messageDiv.classList.remove('error');
            messageDiv.classList.add('success');
            messageDiv.textContent = 'Login successful! Redirecting...';
            
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 2000);
        } else {
            messageDiv.classList.remove('success');
            messageDiv.classList.add('error');
            messageDiv.textContent = 'Invalid credentials. Please try again.';
        }
    });
});