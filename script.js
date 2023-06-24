fetchDataWithThen();
fetchDataWithAsyncAwait();
function fetchDataWithThen() {
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(response => response.json())
    .then(data => renderTable(data))
    .catch(error => console.log('Error:', error));
}
async function fetchDataWithAsyncAwait() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    const data = await response.json();
    renderTable(data);
  } catch (error) {
    console.log('Error:', error);
  }
}
function renderTable(data) {
  const cryptoTableBody = document.getElementById('cryptoTableBody');
  cryptoTableBody.innerHTML = '';

  data.forEach(coin => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${coin.name}</td>
      <td>${coin.id}</td>
      <td><img src="${coin.image}" alt="${coin.name}" width="30"></td>
      <td>${coin.symbol}</td>
      <td>${coin.current_price}</td>
      <td>${coin.total_volume}</td>
    `;
    cryptoTableBody.appendChild(row);
  });
}
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', () => {
  const searchValue = searchInput.value.toLowerCase();
  const rows = document.querySelectorAll('#cryptoTableBody tr');

  rows.forEach(row => {
    const name = row.querySelector('td:first-child').textContent.toLowerCase();
    if (name.includes(searchValue)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});
const sortButton = document.getElementById('sortButton');
sortButton.addEventListener('click', () => {
  const rows = Array.from(document.querySelectorAll('#cryptoTableBody tr'));
  const sortedRows = rows.sort((a, b) => {
    const marketCapA = parseFloat(a.querySelector('td:nth-child(5)').textContent.replace(',', ''));
    const marketCapB = parseFloat(b.querySelector('td:nth-child(5)').textContent.replace(',', ''));

    return marketCapA - marketCapB;
  });

  const cryptoTableBody = document.getElementById('cryptoTableBody');
  sortedRows.forEach(row => {
    cryptoTableBody.appendChild(row);
  });
});
