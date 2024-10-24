(function () {
    // Wait for the DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function () {
        // Header and sub-nav wrapper creation
        var header = document.querySelector('.header');
        var subNav = document.querySelector('.sub-nav');
        if (header && subNav) {
            var wrapper = document.createElement('div');
            wrapper.className = 'header-subnav-wrapper';
            header.parentNode.insertBefore(wrapper, header);
            wrapper.appendChild(header);
            wrapper.appendChild(subNav);
        }

        // Replace IDs with classes
        const elementsWithId = document.querySelectorAll('[id]');
        elementsWithId.forEach(element => {
            const idValue = element.id;
            element.removeAttribute('id');
            element.classList.add(idValue);
        });
        // Sidebar hover effect
        const sidebar = document.querySelector('.article-sidebar');
        const sidebarToggle = sidebar.querySelector('.collapsible-sidebar-title');
        if (sidebar) {
            sidebar.classList.add('collapsed');
            sidebar.addEventListener('click', () => {
                const isExpanded = sidebar.classList.contains('expanded');
                if (isExpanded) {
                    sidebar.classList.remove('expanded');
                    sidebar.classList.add('collapsed');
                } else {
                    sidebar.classList.remove('collapsed');
                    sidebar.classList.add('expanded');
                }
            });
        }
        // ToC Toggle Functionality
        const toc = document.querySelector('.table-of-contents.article-sidebar');
        const tocToggle = toc.querySelector('.collapsible-sidebar-title'); // Clicking the title toggles the ToC
        const tocContent = toc.querySelector('.collapsible-sidebar-body.toc-content');

        if (tocToggle && tocContent) {
            tocToggle.addEventListener('click', function () {
                const isExpanded = toc.classList.contains('expanded');
                if (isExpanded) {
                    toc.classList.remove('expanded');
                    toc.classList.add('collapsed');
                } else {
                    toc.classList.remove('collapsed');
                    toc.classList.add('expanded');
                }
            });
        }

        // Sub-Toc Toggle Functionality
        const tocToggleButtons = toc.querySelectorAll('.toc-toggle-button');

        tocToggleButtons.forEach(function (button, index) {
            // Initialize the button's state based on the 'aria-expanded' attribute
            const isInitiallyExpanded = button.getAttribute('aria-expanded') === 'true';
            button.classList.toggle('expanded', isInitiallyExpanded);
            button.classList.toggle('collapsed', !isInitiallyExpanded);

            // Add click event listener to each toggle button
            button.addEventListener('click', function () {
                // Determine the current state
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                console.log(`Button ${index + 1} clicked. Current state: ${isExpanded ? 'expanded' : 'collapsed'}.`);

                // Toggle the 'aria-expanded' attribute
                button.setAttribute('aria-expanded', !isExpanded);
                console.log(`Button ${index + 1} aria-expanded set to: ${!isExpanded}.`);

                // Toggle 'expanded' and 'collapsed' classes on the button
                button.classList.toggle('expanded', !isExpanded);
                button.classList.toggle('collapsed', isExpanded);
                console.log(`Button ${index + 1} classes updated: ${!isExpanded ? 'expanded' : 'collapsed'}.`);

                // Get the target class from 'data-target' attribute
                const targetClass = button.getAttribute('data-target');
                if (!targetClass) {
                    console.error(`Button ${index + 1} is missing the 'data-target' attribute.`);
                    return;
                }
                console.log(`Button ${index + 1} targets class: '${targetClass}'.`);

                // Find the controlled sub-toc list using the target class
                const controlledList = toc.querySelector(`.sub-toc-content.${targetClass}`);
                if (!controlledList) {
                    console.error(`No sub-toc list found with class '${targetClass}' for Button ${index + 1}.`);
                    return;
                }

                // Toggle the 'expanded' class on the controlled sub-toc list
                controlledList.classList.toggle('expanded', !isExpanded);
                console.log(`Sub-toc list '${targetClass}' is now ${!isExpanded ? 'expanded' : 'collapsed'}.`);
            });
        });




        const clearButton = document.querySelector('.clear-button');
        const searchInput = document.querySelector('.search input[type="search"]');
        clearButton.addEventListener('click', function () {
            searchInput.value = '';
            searchInput.focus();
            // The clear button will automatically hide due to CSS since the input is now empty
        });
    });

    Prism.highlightAll();
})();
