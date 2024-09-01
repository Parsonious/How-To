document.addEventListener('DOMContentLoaded', async () => {
    const el = document.getElementById('bepio'), sp = document.getElementById('bepio.spinner');
    if (el) {
        const nt = encodeURIComponent(el.textContent ? el.textContent.trim() : el.innerText.trim());
        try {
            const r = await fetch(`https://bepio.net/api/content/${nt}`);
            if (!r.ok) throw new Error(`HTTP error! Status: ${r.status}`);
            el.parentNode.insertBefore(Object.assign(document.createElement('div'), {innerHTML: await r.text()}), el.nextSibling);
            if (sp) sp.style.visibility = 'hidden';
        } catch (e) {
            console.error('Fetch Error', e);
            el.innerHTML = '<p>Error Loading Content.</p>';
        }
    } else {
        console.warn(`Element not found.`);
    }
});
