
// Copy/Paste these lines to add more codes
const qrDatabase = [
    { id: "forest_01", name: "The old Oak" },
    { id: "bench_02", name: "Park Bench" },
    { id: "fountain_03", name: "Water Fountain" },
    { id: "statue_04", name: "Bronze Statue" }
];

// dont tuthc: under here


if (!localStorage.getItem('scanned_tags')) {
    localStorage.setItem('scanned_tags', JSON.stringify([]));
}

function updateGameUI() {
    const scannedTags = JSON.parse(localStorage.getItem('scanned_tags'));
    const listContainer = document.getElementById('qr-list');
    
    
    document.getElementById('scan-count').innerText = scannedTags.length;

    
    if (listContainer) {
        listContainer.innerHTML = '';
        qrDatabase.forEach(qr => {
            const isScanned = scannedTags.includes(qr.id);
            const item = document.createElement('div');
            item.className = `qr-item ${isScanned ? 'scanned' : 'unscanned'}`;
            item.innerText = `${qr.name} ${isScanned ? '✅' : '❓'}`;
            listContainer.appendChild(item);
        });
    }
}

function onScanSuccess(decodedText) {
    let scannedTags = JSON.parse(localStorage.getItem('scanned_tags'));
    const foundInDb = qrDatabase.find(tag => tag.id === decodedText);

    if (foundInDb) {
        if (!scannedTags.includes(decodedText)) {
            scannedTags.push(decodedText);
            localStorage.setItem('scanned_tags', JSON.stringify(scannedTags));
            alert(`Found: ${foundInDb.name}!`);
            updateGameUI();
        } else {
            alert("Already scanned!");
        }
    }
}


if (document.getElementById('reader')) {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
    scanner.render(onScanSuccess);
    updateGameUI();
}
