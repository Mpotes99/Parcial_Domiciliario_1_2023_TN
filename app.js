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
        if (!this.$refs.foto.files[0]) {
          alert('Por favor, cargue una foto de la mascota.');
          return;
        }
  
        const file = this.$refs.foto.files[0];
        const reader = new FileReader();
  
        reader.onload = () => {
          this.fotoMascota = reader.result; 
        };
  
        reader.readAsDataURL(file); 
  
  
        // Genera el DNI falso
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
  
        return false;
      }
    },
    computed: {
      nombreCompleto() {
        return `${this.nombre} ${this.apellido}`;
      }
    }
  });
  