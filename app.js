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
    fotoMascota: null 
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
  

      
      const apellido = this.apellido;
      const nombre = this.nombre;
      const fechaNacimiento = this.fechaNacimiento;
      const sexo = this.sexo;
      const especie = this.especie;
      const raza = this.raza;

      // generar un DNI falso
      const dniFalso = Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000);
      this.dniFalso = dniFalso;

      //  true a dniGenerado después de la generación del DNI
      this.dniGenerado = true;

      // Actualiza la foto de la mascot
      const fotoInput = this.$refs.foto;
      if (fotoInput.files && fotoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.fotoMascota = e.target.result;
        };
        reader.readAsDataURL(fotoInput.files[0]);
      }
    // Guardar datos en localstorage


    
    const datosMascota = {
      apellido: this.apellido,
      nombre: this.nombre,
      fechaNacimiento: this.fechaNacimiento,
      sexo: this.sexo,
      especie: this.especie,
      raza: this.raza,
      aceptoTerminos: this.aceptoTerminos,
      dniFalso: this.dniFalso,
      fotoMascota: this.fotoMascota
    };
    localStorage.setItem('datosMascota', JSON.stringify(datosMascota));
    },

    cargarDatosGuardados() {
    // Cargar datos  localsstorage
    const datosMascota = localStorage.getItem('datosMascota');
    if (datosMascota) {
      const parsedData = JSON.parse(datosMascota);
      this.apellido = parsedData.apellido || '';
      this.nombre = parsedData.nombre || '';
      this.fechaNacimiento = parsedData.fechaNacimiento || '';
      this.sexo = parsedData.sexo || '';
      this.especie = parsedData.especie || '';
      this.raza = parsedData.raza || '';
      this.aceptoTerminos = parsedData.aceptoTerminos || false;
      this.dniFalso = parsedData.dniFalso || null;
      this.fotoMascota = parsedData.fotoMascota || null;
      this.dniGenerado = !!parsedData.dniFalso;
    }
    },
    limpiarDatosGuardados() {
      // Limpiar datos de localStorage
      localStorage.removeItem('datosMascota');
    
    
      this.apellido = '';
      this.nombre = '';
      this.fechaNacimiento = '';
      this.sexo = '';
      this.especie = '';
      this.raza = '';
      this.aceptoTerminos = false;
      this.dniFalso = null;
      this.fotoMascota = null;
      this.dniGenerado = false;
    }
},
  computed: {
    nombreCompleto() {
      return `${this.nombre} ${this.apellido}`;
    }
  },
  created() {
    // Cargar datos 
    this.cargarDatosGuardados();
  },
  beforeDestroy() {
    // Limpiar datos 
    this.limpiarLocalStorage();
  }
});
