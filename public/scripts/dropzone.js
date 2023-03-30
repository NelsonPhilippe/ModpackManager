const dropzone = document.getElementById('dropzone');
const popupMessage = document.getElementById('success-message');

dropzone.addEventListener('drop', function(e) {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
    }

    // Requête AJAX pour télécharger le fichier
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/update/upload', true);
    xhr.onload = function() {
        console.log(xhr.status);
        if (xhr.status === 200) {
            // Si le fichier a été téléchargé avec succès, affiche un message de succès
            console.log('Fichier déposé avec succès');
            popupMessage.style.display = 'block';
            setTimeout(() => {
                popupMessage.style.display = 'none';
            }, 5000);
        } else {
            // Si une erreur est survenue, affiche un message d'erreur
            dropzone.innerHTML = 'Erreur lors du téléchargement du fichier'
            console.log('Erreur lors du téléchargement du fichier');
        }
    };
    xhr.send(formData);
});

dropzone.addEventListener('dragover', function(e) {
    e.preventDefault();
    dropzone.classList.add('dragover');
});

// Événement de sortie de la zone de dépôt
dropzone.addEventListener('dragleave', function(e) {
    e.preventDefault();
    dropzone.classList.remove('dragover');
});
