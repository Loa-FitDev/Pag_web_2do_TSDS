import { supabase } from "./supabase.js";

//------var let const
// const arrayNumero = [10, 20, 30];
// arrayNumero.push(50);
// console.log(arrayNumero);
// const persona = {
//   nombre: "Alejandro",
//   edad: 49,
// };
// persona.edad = 20;
// persona.pais = "Argentina";
// console.log(persona);
//--------Funciones
// function sumar(num1, num2) {
//   console.log(num1 + num2);
// }
// const sumarDos = (num1, num2) => {
//   return num1 + num2;
// };
// const sumarTres = (num1, num2) => num1 + num2;
// sumar(10, 20);
// const resultado = sumarTres(15, 30);
// console.log(resultado);
// const mensaje = (nombre) => "Hola soy " + nombre;
// console.log(mensaje("Alejandro"));
//-- Objetos
// const cliente = {
//   nombre: "Aquiles",
//   edad: 19,
//   casado: false,
// };
// cliente.telefonos = [447106, 500386];
// cliente.id = 1;
// console.log(cliente);
// console.log(cliente.nombre);
// console.log(cliente.telefonos[1]);
// const { edad } = cliente;
// console.log(edad);
// const web = {
//   nombre: "bluuweb",
//   links: {
//     enlace: "www.bluuweb.cl",
//   },
//   redesSociales: {
//     youtube: {
//       enlace: "youtube.com/bluuweb",
//       nombre: "bluuweb yt",
//     },
//   },
// };

// console.log(web.redesSociales.youtube.enlace);
// const { enlace } = web.redesSociales.youtube;
// console.log(enlace);
//let urlApi =

const app = document.querySelector("#app");

async function mostrarAlerta(id, nombre) {
  const resultado = await Swal.fire({
    title: `¿Está seguro que desea borrar a ${nombre}?`,
    text: "No podrá revertir esta acción.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, borrar",
    cancelButtonText: "Cancelar",
  });

  if (!resultado.isConfirmed) {
    return;
  }

  const { data, error } = await supabase
    .from("clientes")
    .delete()
    .eq("id", id)
    .select("id");

  if (error || data.length === 0) {
    console.error("Error al borrar el cliente:", error);

    await Swal.fire({
      title: "No se pudo borrar",
      text: error?.message ?? "Verifique las políticas RLS de Supabase.",
      icon: "error",
    });

    return;
  }

  await Swal.fire({
    title: "¡Borrado!",
    text: `El cliente ${nombre} ha sido borrado.`,
    icon: "success",
  });

  await obtenerClientes();
}

app.addEventListener("click", (event) => {
  const botonBorrar = event.target.closest(".btn-borrar");

  if (!botonBorrar) {
    return;
  }

  const nombre = botonBorrar
    .closest("tr")
    .querySelector("td")
    .textContent.trim();

  mostrarAlerta(botonBorrar.dataset.id, nombre);
});

const obtenerClientes = async () => {
  try {
    // const respuesta = await fetch(urlApi);
    // const clientes = await respuesta.json();
    const { data: clientes, error } = await supabase
      .from("clientes")
      .select("*");

    if (error) {
      throw error;
    }

    console.log(clientes);
    let htmlTabla = "<table class='table table-dark table-striped'>";
    htmlTabla += `<tr>
                        <th>Apellido y Nombre</th>
                        <th>Dirección</th>
                        <th>Dni</th>
                        <th>Acciones</th>
                 </tr>`;
    htmlTabla += clientes
      //.filter((element) => element.firstname.includes("u"))
      .map(
        (element) => `
        <tr>
            <td>${element.firstname} ${element.lastname}</td>
            <td>${element.address}</td>
            <td>${element.dni}</td>
            <td>
                <button
                  class="btn btn-danger btn-borrar"
                  data-id="${element.id}"
                >
                  Borrar
                </button>
            </td>
        </tr>
        `,
      )
      .join("");
    htmlTabla += "</table>";
    app.innerHTML = htmlTabla;
  } catch (error) {
    console.log("OCURRIO UN ERROR " + error);
  }
};

obtenerClientes();

const btnAdd = document.querySelector("#btnAdd");
btnAdd.addEventListener("click", async () => {
  const firstname = document.querySelector("#nombreInput").value.trim();
  const lastname = document.querySelector("#apellidoInput").value.trim();
  const dni = document.querySelector("#dniInput").value.trim();
  const address = document.querySelector("#direccionInput").value.trim();

  if (!firstname || !lastname || !dni || !address) {
    await Swal.fire({
      title: "Campos incompletos",
      text: "Por favor complete todos los campos.",
      icon: "warning",
    });
    return;
  }

  const { data, error } = await supabase.from("clientes").insert([
    {
      firstname,
      lastname,
      address,
      dni,
    },
  ]);

  if (error) {
    console.error("Error al agregar el cliente:", error);
    await Swal.fire({
      title: "No se pudo agregar",
      text: error?.message ?? "Verifique las políticas RLS de Supabase.",
      icon: "error",
    });
    return;
  }

  const modalEl = document.querySelector("#AddClientModal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  if (modal) modal.hide();

  document.querySelector("#nombreInput").value = "";
  document.querySelector("#apellidoInput").value = "";
  document.querySelector("#dniInput").value = "";
  document.querySelector("#direccionInput").value = "";

  await Swal.fire({
    title: "¡Agregado!",
    text: `El cliente ${firstname} ${lastname} ha sido agregado.`,
    icon: "success",
  });

  await obtenerClientes();
});
