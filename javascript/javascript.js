document.addEventListener("DOMContentLoaded", function(){
    cargarCatalogo();
    cargarDetalleLibro();
});
function cargarCatalogo(){
    const contenedor = document.getElementById("lista-libros");
    if(!contenedor){
        return;
    }
    fetch("xml/libros.xml")
    .then(function(respuesta){
        return respuesta.text();
    })
    .then(function(datos){
        const parser = new DOMParser();
        const xml = parser.parseFromString(datos,"text/xml");
        const libros = xml.getElementsByTagName("libro");
        for(let i=0;i<libros.length; i++){
            const id = libros[i].getElementsByTagName("id")[0].textContent;
            const titulo = libros[i].getElementsByTagName("titulo")[0].textContent;
            const autor = libros[i].getElementsByTagName("autor")[0].textContent;
            const categoria = libros[i].getElementsByTagName("categoria")[0].textContent;
            const anio = libros[i].getElementsByTagName("anio")[0].textContent;
            const portada = libros[i].getElementsByTagName("portada")[0].textContent;
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta-libro");
            tarjeta.innerHTML = `
                <img src="${portada}" alt="Portada de ${titulo}">
                <h3>${titulo}</h3>
                <p><strong>Autor:</strong> ${autor}</p>
                <p><strong>Categoría:</strong> ${categoria}</p>
                <p><strong>Año:</strong> ${anio}</p>
                <a href="detalle.html?id=${id}" class="boton-detalle">Ver detalle</a>
            `;
            contenedor.appendChild(tarjeta);
        }
    })
    .catch(function(error){
        contenedor.innerHTML = "<p>No se pudo cargar el catálogo de libros.</p>";
        console.log("Error al cargar XML:", error);
    });

}
function cargarDetalleLibro(){
    const contenedor = document.getElementById("detalle-libro");
    if(!contenedor){
        return;
    }
    const parametros = new URLSearchParams(window.location.search);
    const idBuscado = parametros.get("id");
    if(!idBuscado){
        contenedor.innerHTML = "<p>Selecciona un libro desde el catálogo para ver su información.</p>";
        return;
    }
    fetch("xml/libros.xml")
    .then(function(respuesta){
        return respuesta.text();
    })
    .then(function(datos){
        const parser = new DOMParser();
        const xml = parser.parseFromString(datos, "text/xml");
        const libros = xml.getElementsByTagName("libro");
        for(let i=0;i<libros.length;i++){
            const id = libros[i].getElementsByTagName("id")[0].textContent;
            if(id === idBuscado){
                const titulo = libros[i].getElementsByTagName("titulo")[0].textContent;
                const autor = libros[i].getElementsByTagName("autor")[0].textContent;
                const categoria = libros[i].getElementsByTagName("categoria")[0].textContent;
                const anio = libros[i].getElementsByTagName("anio")[0].textContent;
                const editorial = libros[i].getElementsByTagName("editorial")[0].textContent;
                const descripcion = libros[i].getElementsByTagName("descripcion")[0].textContent;
                const portada = libros[i].getElementsByTagName("portada")[0].textContent;
                contenedor.innerHTML = `
                    <div class="detalle-contenido">
                        <img src="${portada}" alt="Portada de ${titulo}">
                        <div class="detalle-texto">
                            <h3>${titulo}</h3>
                            <p><strong>Autor:</strong> ${autor}</p>
                            <p><strong>Categoría:</strong> ${categoria}</p>
                            <p><strong>Año:</strong> ${anio}</p>
                            <p><strong>Editorial:</strong> ${editorial}</p>
                            <p><strong>Descripción:</strong> ${descripcion}</p>
                            <a href="catalogo.html" class="boton-detalle">Volver al catálogo</a>
                        </div>
                    </div>
                `;
                return;
            }
        }
        contenedor.innerHTML = "<p>No se encontró la información del libro seleccionado.</p>";
    })
    .catch(function (error){
        contenedor.innerHTML = "<p>No se pudo cargar la información del libro.</p>";
        console.log("Error al cargar detalle:", error);
    });
}