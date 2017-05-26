const ah = require('./index');

const urlMelk = 'https://www.ah.nl/producten/product/wi33693/ah-halfvolle-melk';
ah.getNutritionFacts(urlMelk).then(console.log);

/*
{ Energie: '200 kJ (48 kcal)',
  Vet: '1,5 g',
  'Waarvan verzadigd': '1 g',
  'Waarvan enkelvoudig onverzadigd': '0,5 g',
  'Waarvan meervoudig onverzadigd': '0 g',
  Koolhydraten: '4,5 g',
  'Waarvan suikers': '4,5 g',
  Voedingsvezel: '0 g',
  Eiwitten: '3,5 g',
  Zout: '0,1 g',
  'Riboflavine/vitamine B2': '0,18 mg',
  'Vitamine B12': '0,47 µg',
  Calcium: '126 mg' }
*/

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

