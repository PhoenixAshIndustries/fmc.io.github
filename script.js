const sheetID = 'YOUR_GOOGLE_SHEET_ID';
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json`;

let data = [];
const companySelect = document.getElementById('company');
const bayInput = document.getElementById('bay');
const msg = document.getElementById('message');

fetch(sheetURL)
  .then(res => res.text())
  .then(txt => {
    const json = JSON.parse(txt.match(/google\.visualization\.Query\.setResponse\((.*)\);/)[1]);
    const rows = json.table.rows;
    data = rows.map(r => ({
      bay: r.c[0]?.v?.toString().trim().toUpperCase(),
      lat: r.c[1]?.v,
      lng: r.c[2]?.v,
      company: r.c[3]?.v
    }));
  })
  .catch(() => msg.textContent = 'Error loading bay data.');

document.getElementById('locateBtn').addEventListener('click', () => {
  msg.textContent = '';
  const bay = bayInput.value.trim().toUpperCase();
  const comp = companySelect.value;
  if (!comp || !bay) return msg.textContent = 'Select a company and enter bay number.';

  const rec = data.find(d => d.company === comp && d.bay === bay);
  if (!rec) return msg.textContent = 'No matching bay found.';

  const url = `https://www.google.com/maps/dir/?api=1&destination=${rec.lat},${rec.lng}&travelmode=walking`;
  window.open(url, '_blank');
});
