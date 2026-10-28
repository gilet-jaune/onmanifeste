/* 
  Custom JavaScript for Anchor Copy-to-Clipboard 
*/

document.addEventListener('DOMContentLoaded', function () {
  // Select all permalinks
  const headerLinks = document.querySelectorAll('.headerlink');

  headerLinks.forEach((link) => {
    // Set initial tooltip text & clear native title to prevent clashing
    link.setAttribute('data-tooltip', 'Copy Link');
    link.removeAttribute('title');

    link.addEventListener('click', function (e) {
      // Prevent full page reload/jump if we want custom behavior
      e.preventDefault();

      // Construct the absolute URL
      const url = window.location.origin + window.location.pathname + link.getAttribute('href');

      // Copy to Clipboard
      navigator.clipboard.writeText(url).then(() => {
        // Visual Feedback: Show the success state
        link.classList.add('copied');

        // Restore the original state after a short delay
        setTimeout(() => {
          link.classList.remove('copied');
        }, 1200);

        // Update URL hash without standard "jumping" reload
        window.history.replaceState(null, null, link.getAttribute('href'));

        // Smooth scroll to the target manually
        const targetId = decodeURIComponent(link.getAttribute('href').substring(1));
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });

  // --- Interactive Tag Search ---
  const tags = document.querySelectorAll('.md-tag');
  const searchInput = document.querySelector('.md-search__input');

  tags.forEach((tag) => {
    tag.addEventListener('click', function (e) {
      e.preventDefault();
      const tagName = tag.textContent.trim();

      if (searchInput) {
        // Populate search input and trigger event
        searchInput.value = tagName;
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));

        // Open search bar if it's hidden/mobile
        const searchLabel = document.querySelector('label[for="__search"]');
        if (searchLabel) searchLabel.click();

        // Ensure the input has focus
        searchInput.focus();
      }
    });
  });

  // --- Mermaid Diagram Interactivity (Zoom, Fullscreen, Uncollapse) ---
  const SVG_ZOOM_IN = `<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/></svg>`;
  const SVG_ZOOM_OUT = `<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"/></svg>`;
  const SVG_FULLSCREEN = `<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>`;
  const SVG_FULLSCREEN_EXIT = `<svg viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>`;

  function injectMermaidControls() {
    document.querySelectorAll('.mermaid').forEach((block) => {
      if (block.parentElement && block.parentElement.classList.contains('mermaid-wrapper')) {
        return;
      }

      const wrapper = document.createElement('div');
      wrapper.className = 'mermaid-wrapper';
      block.parentNode.insertBefore(wrapper, block);
      wrapper.appendChild(block);

      const controls = document.createElement('div');
      controls.className = 'mermaid-controls';
      controls.style.display = 'none'; // Initially Hidden until Expanded

      const btnOut = document.createElement('button');
      btnOut.className = 'mermaid-btn m-out';
      btnOut.title = 'Zoom Out';
      btnOut.innerHTML = SVG_ZOOM_OUT;

      const btnIn = document.createElement('button');
      btnIn.className = 'mermaid-btn m-in';
      btnIn.title = 'Zoom In';
      btnIn.innerHTML = SVG_ZOOM_IN;

      const btnFill = document.createElement('button');
      btnFill.className = 'mermaid-btn m-fill';
      btnFill.title = 'Fullscreen';
      btnFill.innerHTML = SVG_FULLSCREEN;

      controls.appendChild(btnOut);
      controls.appendChild(btnIn);
      controls.appendChild(btnFill);
      wrapper.appendChild(controls);

      const uncollapse = document.createElement('div');
      uncollapse.className = 'mermaid-uncollapse';
      const uncolLabel = document.createElement('span');
      uncolLabel.textContent = 'Uncollapse Details';
      uncollapse.appendChild(uncolLabel);
      wrapper.appendChild(uncollapse);
    });
  }

  injectMermaidControls();
  const observer = new MutationObserver(() => injectMermaidControls());
  observer.observe(document.body, { childList: true, subtree: true });

  function getMermaidSvg(wrapper) {
    if (!wrapper) return null;
    const block = wrapper.querySelector('.mermaid');
    if (!block) return null;
    if (block.tagName.toLowerCase() === 'svg') return block;
    return (
      block.querySelector('svg') ||
      (block.shadowRoot && block.shadowRoot.querySelector('svg')) ||
      block.querySelector('.mermaid svg')
    );
  }

  // Interaction Definitions
  document.body.addEventListener('click', async function (e) {
    const wrapper = e.target.closest('.mermaid-wrapper');
    if (!wrapper) return;

    const btnOut = e.target.closest('.mermaid-btn.m-out');
    const btnIn = e.target.closest('.mermaid-btn.m-in');
    const btnFill = e.target.closest('.mermaid-btn.m-fill');
    const uncollapse = e.target.closest('.mermaid-uncollapse');

    const mermaidBlock = wrapper.querySelector('.mermaid');
    if (!mermaidBlock) return;

    const performZoom = (zoomFactor, cx, cy) => {
      const zoomOld = parseFloat(mermaidBlock.getAttribute('data-zoom')) || 1.0;
      const txOld = parseFloat(mermaidBlock.getAttribute('data-tx')) || 0;
      const tyOld = parseFloat(mermaidBlock.getAttribute('data-ty')) || 0;

      let zoomNew = zoomOld * zoomFactor;
      zoomNew = Math.min(5.0, Math.max(0.2, zoomNew)); // Hard cap at 0.2 min, 5.0 max

      // Calculate continuous offset mapped from the container's interaction point
      const txNew = cx - (cx - txOld) * (zoomNew / zoomOld);
      const tyNew = cy - (cy - tyOld) * (zoomNew / zoomOld);

      mermaidBlock.setAttribute('data-zoom', zoomNew);
      mermaidBlock.setAttribute('data-tx', txNew);
      mermaidBlock.setAttribute('data-ty', tyNew);
      mermaidBlock.style.transform = `translate(${txNew}px, ${tyNew}px) scale(${zoomNew})`;

      if (zoomNew > 1.0) {
        mermaidBlock.classList.add('expanded');
        wrapper.classList.add('is-expanded');
        wrapper.querySelector('.mermaid-controls').style.display = 'flex';
      }
    };

    if (btnIn || btnOut) {
      e.preventDefault();
      e.stopPropagation();
      const zoomFactor = btnIn ? 1.25 : 0.8; // Multiplicative scale for smoothness!

      let centerX, centerY;
      if (wrapper.classList.contains('fullscreen')) {
        centerX = window.innerWidth / 2;
        centerY = window.innerHeight / 2;
      } else {
        const rect = wrapper.getBoundingClientRect(); // Map to wrapper bounds!
        centerX = rect.width / 2;
        centerY = rect.height / 2;
      }
      performZoom(zoomFactor, centerX, centerY);
    } else if (btnFill) {
      e.preventDefault();
      e.stopPropagation();
      const isActive = wrapper.classList.contains('fullscreen');

      // Close all fullscreens and Restore their inline state
      document.querySelectorAll('.mermaid-wrapper.fullscreen').forEach((w) => {
        w.classList.remove('fullscreen');
        const mb = w.querySelector('.mermaid');
        const fBtn = w.querySelector('.mermaid-btn.m-fill');
        if (fBtn) {
          fBtn.innerHTML = SVG_FULLSCREEN;
          fBtn.title = 'Fullscreen';
        }

        if (mb) {
          const tx = mb.getAttribute('data-pre-tx') || 0;
          const ty = mb.getAttribute('data-pre-ty') || 0;
          const zoom = mb.getAttribute('data-pre-zoom') || 1.0;
          const wasExpanded = mb.getAttribute('data-pre-expanded') === 'true';

          mb.setAttribute('data-tx', tx);
          mb.setAttribute('data-ty', ty);
          mb.setAttribute('data-zoom', zoom);

          if (wasExpanded || parseFloat(zoom) > 1.0) {
            mb.classList.add('expanded');
            w.classList.add('is-expanded');
            const label = w.querySelector('.mermaid-uncollapse span');
            if (label) label.textContent = 'Collapse Diagram';

            if (parseFloat(zoom) > 1.0) {
              const controls = w.querySelector('.mermaid-controls');
              if (controls) controls.style.display = 'flex';
            }

            setTimeout(() => {
              mb.style.transform = `translate(${tx}px, ${ty}px) scale(${zoom})`;
            }, 50);
          } else {
            mb.classList.remove('expanded');
            w.classList.remove('is-expanded');
            mb.style.transform = '';
          }
        }
      });
      document.body.style.overflow = '';

      if (!isActive) {
        wrapper.classList.add('fullscreen');
        document.body.style.overflow = 'hidden';
        btnFill.innerHTML = SVG_FULLSCREEN_EXIT;
        btnFill.title = 'Exit Fullscreen';
        wrapper.querySelector('.mermaid-controls').style.display = 'flex';

        // Save inline state
        mermaidBlock.setAttribute('data-pre-tx', mermaidBlock.getAttribute('data-tx') || 0);
        mermaidBlock.setAttribute('data-pre-ty', mermaidBlock.getAttribute('data-ty') || 0);
        mermaidBlock.setAttribute('data-pre-zoom', mermaidBlock.getAttribute('data-zoom') || 1.0);
        mermaidBlock.setAttribute('data-pre-expanded', mermaidBlock.classList.contains('expanded'));

        // Reset to native layout so MkDocs can naturally draw it without transform crashes
        mermaidBlock.setAttribute('data-tx', 0);
        mermaidBlock.setAttribute('data-ty', 0);
        mermaidBlock.setAttribute('data-zoom', 1.0);
        mermaidBlock.style.transform = '';
      }
    } else if (uncollapse) {
      e.preventDefault();
      e.stopPropagation();
      const isExpanded = mermaidBlock.classList.contains('expanded');
      const label = uncollapse.querySelector('span');

      if (isExpanded) {
        mermaidBlock.classList.remove('expanded');
        wrapper.classList.remove('is-expanded');
        wrapper.querySelector('.mermaid-controls').style.display = 'none';
        label.textContent = 'Uncollapse Details';

        mermaidBlock.setAttribute('data-zoom', 1.0);
        mermaidBlock.setAttribute('data-tx', 0);
        mermaidBlock.setAttribute('data-ty', 0);
        mermaidBlock.style.transform = '';

        const rect = mermaidBlock.getBoundingClientRect();
        if (rect.top < 0) window.scrollBy({ top: rect.top - 100, behavior: 'smooth' });
      } else {
        mermaidBlock.classList.add('expanded');
        wrapper.classList.add('is-expanded');
        wrapper.querySelector('.mermaid-controls').style.display = 'flex';
        label.textContent = 'Collapse Diagram';
      }
    }
  });

  // --- Wheel Zoom Support (Cursor Relative) ---
  document.body.addEventListener(
    'wheel',
    function (e) {
      const path = e.composedPath();
      const wrapper = path.find((el) => el.classList && el.classList.contains('mermaid-wrapper'));
      if (!wrapper || !e.ctrlKey) return;

      e.preventDefault();
      const mermaidBlock = wrapper.querySelector('.mermaid');
      if (!mermaidBlock) return;

      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9; // Smooth multiplicative scaling

      const zoomOld = parseFloat(mermaidBlock.getAttribute('data-zoom')) || 1.0;
      const txOld = parseFloat(mermaidBlock.getAttribute('data-tx')) || 0;
      const tyOld = parseFloat(mermaidBlock.getAttribute('data-ty')) || 0;

      // Exact mouse location relative to the container bounds, not the transformed diagram!
      const rect = wrapper.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      let zoomNew = zoomOld * zoomFactor;
      zoomNew = Math.min(5.0, Math.max(0.2, zoomNew));

      const txNew = cx - (cx - txOld) * (zoomNew / zoomOld);
      const tyNew = cy - (cy - tyOld) * (zoomNew / zoomOld);

      mermaidBlock.setAttribute('data-zoom', zoomNew);
      mermaidBlock.setAttribute('data-tx', txNew);
      mermaidBlock.setAttribute('data-ty', tyNew);

      mermaidBlock.style.transform = `translate(${txNew}px, ${tyNew}px) scale(${zoomNew})`;

      if (zoomNew > 1.0) {
        mermaidBlock.classList.add('expanded');
        wrapper.classList.add('is-expanded');
      }
    },
    { passive: false },
  );

  // --- Global Drag-to-Pan (Transform Based) ---
  let isDragging = false;
  let dragStartPos = { tx: 0, ty: 0, x: 0, y: 0 };
  let draggedBlock = null;

  document.body.addEventListener('mousedown', function (e) {
    const actualTarget = e.composedPath()[0];
    const wrapper = actualTarget.closest('.mermaid-wrapper');
    if (!wrapper) return;

    const mermaidBlock = wrapper.querySelector('.mermaid');
    if (!mermaidBlock) return;

    // --- RESTRICTION: Only drag if expanded ---
    if (!mermaidBlock.classList.contains('expanded') && !wrapper.classList.contains('fullscreen'))
      return;

    // Ignore controls
    if (actualTarget.closest('.mermaid-btn') || actualTarget.closest('.mermaid-uncollapse')) return;

    isDragging = true;
    draggedBlock = mermaidBlock;
    mermaidBlock.style.transition = 'none';
    mermaidBlock.style.cursor = 'grabbing';

    dragStartPos = {
      tx: parseFloat(mermaidBlock.getAttribute('data-tx')) || 0,
      ty: parseFloat(mermaidBlock.getAttribute('data-ty')) || 0,
      x: e.clientX,
      y: e.clientY,
    };
  });

  document.body.addEventListener('mousemove', function (e) {
    if (!isDragging || !draggedBlock) return;
    e.preventDefault();

    const dx = e.clientX - dragStartPos.x;
    const dy = e.clientY - dragStartPos.y;

    const newTx = dragStartPos.tx + dx;
    const newTy = dragStartPos.ty + dy;

    draggedBlock.setAttribute('data-tx', newTx);
    draggedBlock.setAttribute('data-ty', newTy);

    const zoom = parseFloat(draggedBlock.getAttribute('data-zoom')) || 1.0;
    draggedBlock.style.transform = `translate(${newTx}px, ${newTy}px) scale(${zoom})`;
  });

  const stopDrag = function () {
    if (isDragging && draggedBlock) {
      isDragging = false;
      draggedBlock.style.transition = 'transform 0.15s ease-out';
      draggedBlock.style.removeProperty('cursor');
      draggedBlock = null;
    }
  };

  document.body.addEventListener('mouseup', stopDrag);
  document.body.addEventListener('mouseleave', stopDrag);
});
