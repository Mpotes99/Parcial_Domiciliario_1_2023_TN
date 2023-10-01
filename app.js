new Vue({
  el: '#app',
  data: {
    mostrarForm: false,
    apellido: '',
    nombre: '',
    fechaNacimiento: '',
    sexo: '',
    especie: '',
    raza: '',
    aceptoTerminos: false,
    dniFalso: null,
    dniGenerado: false,
    fotoMascota: null // Almacena la foto de la mascota
  },
  methods: {
    mostrarFormulario() {
      this.mostrarForm = true;
    },
    verificarYGenerarDni() {
      if (this.dniGenerado) {
        alert('El DNI ya ha sido generado. No puedes modificar el formulario.');
        return; 
      }

      // Asigna los valores de los campos del formulario a las propiedades correspondientes.
      const apellido = this.apellido;
      const nombre = this.nombre;
      const fechaNacimiento = this.fechaNacimiento;
      const sexo = this.sexo;
      const especie = this.especie;
      const raza = this.raza;

      // Lógica para generar un DNI falso
      const dniFalso = Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000);
      this.dniFalso = dniFalso;
      this.dniGenerado = true;

    /*  // Limpia el formulario
      this.apellido = '';
      this.nombre = '';
      this.fechaNacimiento = '';
      this.sexo = '';
      this.especie = '';
      this.raza = '';
      this.aceptoTerminos = false;*/

      // Actualiza la foto de la mascota si se seleccionó una
      const fotoInput = this.$refs.foto;
      if (fotoInput.files && fotoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.fotoMascota = e.target.result;
        };
        reader.readAsDataURL(fotoInput.files[0]);
      }
    }
  },
  computed: {
    nombreCompleto() {
      return `${this.nombre} ${this.apellido}`;
    }
  }
});
