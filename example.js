const ah = require('./index');

const urlAsperges = 'https://www.ah.nl/producten/product/wi99045/ah-asperges-wit';
ah.getPriceInfo(urlAsperges, 'wi99045').then(console.log);

/*
{ price: 2.99,
  unit: '500 g',
  availability: { orderable: true, label: 'Leverbaar' } }
*/

ah.getProductInfo(urlAsperges, 'wi99045').then(console.log);

/*
{ id: 'wi99045',
  description: 'AH As­per­ges wit',
  unitSize: '500 g',
  brandName: 'AH',
  categoryName: 'Aardappel, groente, fruit/Witte asperges',
  availability: { orderable: true, label: 'Leverbaar' },
  priceLabel: { now: 2.99, was: 3.99 },
  discount:
   { type: { name: 'BONUS' },
     label: '25% korting',
     period: 'vanaf maandag' },
  propertyIcons: [ 'gezondere_keuze' ],
  ... etc.
*/

