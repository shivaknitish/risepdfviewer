// JavaScript library to dynamically create EmbedBlocks for .block-attachment elements

(function() {
    // Function to create EmbedBlock for a given AttachmentBlock
    function createEmbedBlock(attachmentBlock) {
        // Get the href attribute from AttachmentBlock
        const attachmentLink = attachmentBlock.getAttribute('href');

        // Create a new EmbedBlock
        const embedBlock = document.createElement('div');
        embedBlock.classList.add('block-embed', 'block-wrapper', 'bg', 'bg--card-white', 'bg--range-light', 'bg--type-light');
        embedBlock.setAttribute('style', '--color-background: #ffffff; box-shadow: rgb(255, 255, 255) 0px 1px 0px; padding-bottom: 3rem; padding-top: 3rem;');
        embedBlock.innerHTML = `
            <span></span>
            <div>
                <div class="animated fadeIn"
                     style="animation-duration: 0.75s; opacity: 1; animation-delay: 0s; animation-fill-mode: forwards;">
                    <div class="block-embed__wrapper block-embed__wrapper--medium">
                        <section class="block-embed__item block-card bg--range-light block-card--white">
                            <div aria-hidden="false" aria-label="Embedded media player" class="embed" role="group">
                                <div class="embed--iframe"><iframe title="shivak PDF Viewer" src="${attachmentLink}"></iframe></div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        `;

        // Insert the EmbedBlock before AttachmentBlock
        attachmentBlock.parentNode.insertBefore(embedBlock, attachmentBlock);
    }

    // Function to handle changes in the document
    function handleDocumentChanges(mutationsList, observer) {
        mutationsList.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    // Check if the added node is a .block-attachment element
                    if (node.classList.contains('block-attachment')) {
                        createEmbedBlock(node);
                    } else if (node.querySelectorAll) {
                        // Check if any children are .block-attachment elements
                        const attachmentBlocks = node.querySelectorAll('.block-attachment');
                        attachmentBlocks.forEach(attachmentBlock => {
                            createEmbedBlock(attachmentBlock);
                        });
                    }
                }
            });
        });
    }

    // Observe changes in the body of the document
    const observer = new MutationObserver(handleDocumentChanges);
    observer.observe(document.body, { childList: true, subtree: true });
})();
