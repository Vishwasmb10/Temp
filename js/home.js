document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    const branchSelect = document.getElementById('branchSelect');
    const semesterSelect = document.getElementById('semesterSelect');
    const subjectSelect = document.getElementById('subjectSelect');
    const logoutBtn = document.getElementById('logoutBtn');

    const subjectLinks = {
        'CSE': {
            '1': {
                'Programming Fundamentals': 'https://drive.google.com/drive/cse-1-prog',
                'Mathematics': 'https://drive.google.com/drive/cse-1-math'
            },
            '2': {
                'Data Structures': 'https://drive.google.com/drive/cse-2-ds',
                'Computer Architecture': 'https://drive.google.com/drive/cse-2-ca'
            }
        },
        'ECE': {
            '1': {
                'Basic Electronics': 'https://drive.google.com/drive/ece-1-be',
                'Circuit Theory': 'https://drive.google.com/drive/ece-1-ct'
            },
            '2': {
                'Digital Electronics': 'https://drive.google.com/drive/ece-2-de',
                'Signals and Systems': 'https://drive.google.com/drive/ece-2-ss'
            }
        }
    };

    branchSelect.addEventListener('change', () => {
        const selectedBranch = branchSelect.value;
        semesterSelect.disabled = false;
        subjectSelect.innerHTML = '<option value="">Select Subject</option>';
    });

    semesterSelect.addEventListener('change', () => {
        const selectedBranch = branchSelect.value;
        const selectedSemester = semesterSelect.value;

        if (selectedBranch && selectedSemester) {
            const subjects = subjectLinks[selectedBranch][selectedSemester];
            subjectSelect.innerHTML = '<option value="">Select Subject</option>';

            Object.keys(subjects).forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject;
                subjectSelect.appendChild(option);
            });
        }
    });

    subjectSelect.addEventListener('change', () => {
        const selectedBranch = branchSelect.value;
        const selectedSemester = semesterSelect.value;
        const selectedSubject = subjectSelect.value;

        if (selectedSubject) {
            const driveLink = subjectLinks[selectedBranch][selectedSemester][selectedSubject];
            window.open(driveLink, '_blank');
        }
    });

    logoutBtn.addEventListener('click', () => {
        // Clear user session
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
});


