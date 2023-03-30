const profile = document.getElementById('profile');
const profileMenu = document.getElementById('profile-menu');
const settings = document.getElementById('settings');
const modal = document.getElementById('modal');
const close = document.getElementById('close-button');
const settingsForm = document.getElementById('settings-form');
const disconnect = document.getElementById('disconnect');
profile.addEventListener('click', () => {
    if(profileMenu.style.display === 'block') {
        profileMenu.style.display = 'none';
    } else {
        profileMenu.style.display = 'block';
    }
});

settings.addEventListener('click', () => {
    if(modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
    }
});

close.addEventListener('click', () => {
    modal.style.display = 'none';
});

settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
   const data = new FormData(e.target)
    const { username, password } = Object.fromEntries(data.entries());

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }

    fetch('/users/update', options).then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la requête');
        }
        return response.json();
    })
        .then(data => {
            console.log('Réponse :', data);
        })
        .catch(error => {
            console.error('Erreur :', error);
        });

});

disconnect.addEventListener('click', () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch('/users/logout', options).then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la requête');
        }
        window.location.href = '/users/login';
    })
});