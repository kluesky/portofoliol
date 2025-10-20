// Simple downloader script dengan validasi key
document.addEventListener('DOMContentLoaded', function() {
    const accessSection = document.getElementById('accessSection');
    const downloadContent = document.getElementById('downloadContent');
    const submitBtn = document.getElementById('submitCode');
    const accessInput = document.getElementById('accessCode');
    const errorMsg = document.getElementById('errorMsg');
    const errorText = document.getElementById('errorText');

    // Check session
    if (sessionStorage.getItem('accessGranted')) {
        showContent();
    }

    submitBtn.addEventListener('click', verifyAccess);
    accessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') verifyAccess();
    });

    function verifyAccess() {
        const code = accessInput.value.trim().toUpperCase();
        
        if (!code) {
            showError('Please enter access code');
            return;
        }

        // Default codes (backup)
        const defaultCodes = ['KYLUE2024', 'ACCESS123', 'DOWNLOAD'];
        if (defaultCodes.includes(code)) {
            grantAccess();
            return;
        }

        // Validate generated key
        if (validateGeneratedKey(code)) {
            grantAccess();
            return;
        }

        showError('Invalid access code');
    }

    function validateGeneratedKey(key) {
        try {
            const saved = localStorage.getItem('simpleKeyGenerator');
            if (!saved) return false;
            
            const data = JSON.parse(saved);
            const isValid = data.currentKey === key;
            
            if (isValid) {
                // Remove the used key
                data.currentKey = null;
                localStorage.setItem('simpleKeyGenerator', JSON.stringify(data));
            }
            
            return isValid;
        } catch (error) {
            console.error('Validation error:', error);
            return false;
        }
    }

    function grantAccess() {
        sessionStorage.setItem('accessGranted', 'true');
        showContent();
    }

    function showContent() {
        accessSection.style.display = 'none';
        downloadContent.style.display = 'block';
    }

    function showError(message) {
        errorText.textContent = message;
        errorMsg.style.display = 'flex';
        setTimeout(() => {
            errorMsg.style.display = 'none';
        }, 3000);
    }

    // Logout function
    window.logout = function() {
        sessionStorage.removeItem('accessGranted');
        location.reload();
    };

    // Add loading animation to download links
    const downloadLinks = document.querySelectorAll('.download-link');
    
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
            }, 2000);
        });
    });
});
