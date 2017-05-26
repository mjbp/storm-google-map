export const infobox = data => `<div class="infobox">
                    <div class="infobox-inner" tabindex="0" id="map-infobox">
                        <h3 class="beta">${data.city}</h3>
                        <div class="delta">${data.companyName}</div>
                        <div class="delta">${data.address}</div>
                        <div class="delta">${data.country}</div>
                        <div class="delta"><b>Tel:</b> ${data.tel}</div>
                    </div>
                </div>`;

    