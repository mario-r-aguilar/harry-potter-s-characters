# Harry Potter's Characters

## Objetivo

Practicar los conocimientos adquiridos en los Cursos de Desarrollo Web y Javascript.
**LINK:** https://harry-potters-characters.netlify.app/

### Descripción

Se trata de una página web que **muestra personajes de**
**la saga de Harry Potter** e información sobre ellos.
La página obtiene dicha información desde la api: https://hp-api.onrender.com/

### Aspectos visuales

La página web renderiza dinámicamente la imagen y nombre de los personajes
a través del archivo **index.js**. Asimismo dado que no todos los personajes
poseen una foto cargada en la base de datos de la api, se le proporciona una
desde un archivo auxiliar, llamado **auxFile.js**, el cual contiene un array
con el nombre y una url de su foto.

Cuando hacemos clic sobre una foto y mantenemos presionado el botón, nos muestra
información adicional del personaje si la api la posee o bien N/A si no tiene el
dato. Además se puede seleccionar un personaje específo desde un desplegable
para que no sea necesario hacer scroll hasta encontrar a quien buscabamos.
Para la mayoría de los estilos se utilizo **Bootstrap**, a excepción del flip que
realizan las cards de los personajes al hacer clic sobre ellas.

### Aspectos lógicos

Se realiza un _fetch_ para obtener los datos de la api, se valida que no haya
elementos repetidos usando el _objeto glogal Set_ y almacena el resultado dentro
de una constante.

Recorre esta constante corroborando que el personaje posea una foto.
De no tenerla, busca una en el archivo auxiliar y la agrega si la encuentra.
Luego renderiza solo aquellos personajes que poseen una imagen. En caso de que
por algún motivo la url de alguna imagen falle, se mostrará una foto generica
de la saga.

Cuando hacemos clic y mantenemos presionado sobre la foto, esta realiza un flip
de la card para mostrar más información al respecto. Mientras que si elegimos un
personaje de la lista desplegable, solo renderiza esa card y un botón para volver
a ver todos los personajes nuevamente.
Todo ello se logra mediante la _escucha de eventos_ y la _manipulación del DOM_.
