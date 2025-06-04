// PDF Viewer JavaScript
document.addEventListener('DOMContentLoaded', function() {
  const pdfEmbed = document.querySelector('.pdf-embed');
  const pdfFallback = document.querySelector('.pdf-fallback');
  
  // Check if PDF can be displayed
  if (pdfEmbed) {
    // Handle iframe load error
    pdfEmbed.addEventListener('error', function() {
      showFallback();
    });
    
    // Check if iframe loads successfully
    pdfEmbed.addEventListener('load', function() {
      // Additional check for PDF support
      try {
        const iframeDoc = pdfEmbed.contentDocument || pdfEmbed.contentWindow.document;
        if (!iframeDoc) {
          showFallback();
        }
      } catch (e) {
        // Cross-origin restrictions might prevent access
        // This is normal for PDF files, so we don't show fallback
        console.log('PDF loaded successfully');
      }
    });
    
    // Fallback for browsers that don't support PDF viewing
    setTimeout(function() {
      if (pdfEmbed.offsetHeight === 0) {
        showFallback();
      }
    }, 3000);
  }
  
  function showFallback() {
    if (pdfEmbed && pdfFallback) {
      pdfEmbed.style.display = 'none';
      pdfFallback.style.display = 'block';
    }
  }
  
  // Add smooth scrolling to PDF controls
  const pdfButtons = document.querySelectorAll('.pdf-button');
  pdfButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Add visual feedback
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 100);
    });
  });
  
  // Keyboard shortcuts for PDF controls
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + D for download
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
      e.preventDefault();
      const downloadButton = document.querySelector('.pdf-button.download');
      if (downloadButton) {
        downloadButton.click();
      }
    }
    
    // Ctrl/Cmd + O for open in new tab
    if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
      e.preventDefault();
      const externalButton = document.querySelector('.pdf-button.external');
      if (externalButton) {
        externalButton.click();
      }
    }
  });
  
  // Add loading indicator
  const pdfContainer = document.querySelector('.pdf-embed-container');
  if (pdfContainer) {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'pdf-loading';
    loadingDiv.innerHTML = `
      <div style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: var(--color-text-secondary);
        z-index: 10;
      ">
        <div style="
          width: 40px;
          height: 40px;
          border: 3px solid var(--color-border);
          border-top: 3px solid var(--color-text-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 10px;
        "></div>
        <p>Loading PDF...</p>
      </div>
    `;
    
    // Add CSS animation for spinner
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .pdf-loading {
        position: relative;
        background-color: var(--color-bg-secondary);
        min-height: 200px;
      }
    `;
    document.head.appendChild(style);
    
    // Show loading, then hide it when PDF loads
    pdfContainer.insertBefore(loadingDiv, pdfEmbed);
    
    if (pdfEmbed) {
      pdfEmbed.addEventListener('load', function() {
        setTimeout(() => {
          loadingDiv.style.display = 'none';
        }, 500);
      });
    }
  }
});
