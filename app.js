new Vue({
  el: '#app',
  data: {
    mostrarForm: false,
    apellido: '',
    nombre: '',
    fechaNacimiento: '',
    sexo: 'macho',
    especie: 'perro',
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

      // Lógica para generar un DNI falso
      const dniFalso = Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000);
      this.dniFalso = dniFalso;
      this.dniGenerado = true;

      // Limpia el formulario
      this.apellido = '';
      this.nombre = '';
      this.fechaNacimiento = '';
      this.sexo = 'macho';
      this.especie = 'perro';
      this.raza = '';
      this.aceptoTerminos = false;
      this.$refs.foto.value = '';

      // Guarda los datos en localStorage (puedes mejorar esta parte)
      const datosMascota = {
        apellido: this.apellido,
        nombre: this.nombre,
        fechaNacimiento: this.fechaNacimiento,
        sexo: this.sexo,
        especie: this.especie,
        raza: this.raza,
        fotoMascota: this.fotoMascota
      };
      localStorage.setItem('datosMascota', JSON.stringify(datosMascota));
    }
  },
  computed: {
    nombreCompleto() {
      return `${this.nombre} ${this.apellido}`;
    }
  },
  created() {
    // Carga los datos previamente guardados en localStorage (puedes mejorar esta parte)
    const datosMascota = JSON.parse(localStorage.getItem('datosMascota'));
    if (datosMascota) {
      this.apellido = datosMascota.apellido;
      this.nombre = datosMascota.nombre;
      this.fechaNacimiento = datosMascota.fechaNacimiento;
      this.sexo = datosMascota.sexo;
      this.especie = datosMascota.especie;
      this.raza = datosMascota.raza;
      this.fotoMascota = datosMascota.fotoMascota;
    }
  }
});
