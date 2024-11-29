fetch('./data.csv')
    .then(response => response.text())
    .then(data => {
        console.log('CSV geladen:', data);

        const rows = data.split('\n').slice(1); // header overslaan
        const labels = [];
        const values = [];

        rows.forEach(row => {
            if (row.trim() !== '') { 
                const columns = row.split(','); 
                if (columns.length === 2) { //  check if 2 kolommen
                    const [jaar, waarde] = columns;
                    labels.push(jaar.trim());
                    values.push(Number(waarde.trim()));
                } else {
                    console.warn('Ongeldige rij overgeslagen:', row);
                }
            }
        });

        console.log('labels:', labels);
        console.log('waardes:', values);

        const ctx = document.getElementById('mijnGrafiek').getContext('2d');
        new Chart(ctx, {
            type: 'line', 
            data: {
                labels: labels,
                datasets: [{
                    label: 'Waarden per Jaar',
                    data: values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    }
                }
            }
        });
    })
    .catch(error => console.error('Fout bij laden CSV:', error));