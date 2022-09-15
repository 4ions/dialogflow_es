//projectId,displayName,trainingPhrasesParts,messageTexts

const constructor = require('./create').createIntent

constructor({
  projectId: 'dev-vwpartes-sbsp',
  displayName: 'menu.pregunta',
  inputContextNames: ['menu', 'main'],
  outputContexts:
    [
      {
        "name": "menu",
        "lifespanCount": 0
      },
      {
        "name": "main",
        "lifespanCount": 5
      }
    ],
  trainingPhrasesParts: ['Hacer pregunta ❓', 'Hacer pregunta', 'Pregunta', 'Asesor', 'opcion 4', '4', 'eleccion 4', 'numero 4', 'cuatro', 'numero cuatro', 'escojo el cuatro'],
  action: "menu.pregunta",
  messageTexts: ['En unos instantes uno de nuestros asesores te atenderá para ayudarte con tu consulta. 👨‍💻'],
  webhookState: "WEBHOOK_STATE_ENABLED",
  haveFallback: false,
  fallbackContexts: ['main', 'menu'],
  fallbackMessage: ['😊 ¿Cómo te gustaría continuar? Selecciona una opción.\n\n1️⃣ Cotizar a domicilio ⚙\n2️⃣ Menú inicial 🔙']
});

// trainingPhrasesParts:['mi numero 3011233212','3214564567','mi telefono es 3219877898','3506788765','es 3247892345'],
// trainingPhrasesParts:['hola', 'oli','buenas','buenas tardes','como vas','buenos dias','buenas noches'],
// trainingPhrasesParts:['mi nombre es Leonardo Valencia', 'Soy Pepito Perez','Juan Garces','Luisa Morales','Jonatan Ponton','Andres Bermudes','Maria Del Carmen',' Maria Jose Cabal'],
// trainingPhrasesParts:['opcion 1','1','eleccion 1','numero 1','uno','numero uno','escojo el uno'],
// trainingPhrasesParts:['opcion 2','2','eleccion 2','numero 2','dos','numero dos','escojo el dos'],
// trainingPhrasesParts:['opcion 3','3','eleccion 3','numero 3','tres','numero tres','escojo el tres'],
// trainingPhrasesParts:['opcion 4','4','eleccion 4','numero 4','cuatro','numero cuatro','escojo el cuatro'],
// trainingPhrasesParts:['opcion 5','5','eleccion 5','numero 5','cinco','numero cinco','escojo el cinco'],
// 'opcion 6','6','eleccion 6','numero 6','seis','numero seis','escojo el seis'
//trainingPhrasesParts:['Calle 222','Calle 170','Toberin','Av. Suba','Calle 80','Américas','Americas','opcion 1','1','eleccion 1','numero 1','uno','numero uno','escojo el uno','opcion 2','2','eleccion 2','numero 2','dos','numero dos','escojo el dos','opcion 3','3','eleccion 3','numero 3','tres','numero tres','escojo el tres','opcion 4','4','eleccion 4','numero 4','cuatro','numero cuatro','escojo el cuatro','opcion 5','5','eleccion 5','numero 5','cinco','numero cinco','escojo el cinco','opcion 6','6','eleccion 6','numero 6','seis','numero seis','escojo el seis'],
