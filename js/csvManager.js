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