var express = require('express')
var app = express()

let cursos=[
    {
        id:01,
        nombre:'Matematicas',
        duracion: 64,
        costo: 1200000
    },
    {
        id:02,
        nombre:'Ingles',
        duracion: 32,
        costo: 800000
    },
    {
        id:03,
        nombre:'Programacion',
        duracion: 48,
        costo: 800000
    }
]


function listarCursos() {
    for (var id=01;id<=cursos.length;id++){
        (function(id){
            setTimeout(function(){
                cursoSeleccionado=cursos.find(cursoDeseado=>cursoDeseado.id==id)
                console.log(
                    'ID del curso: '+cursoSeleccionado.id+'\n'+
                    'Nombre del curso: '+cursoSeleccionado.nombre+'\n'+
                    'Duracion del curso: '+cursoSeleccionado.duracion+'\n'+
                    'Valor del curso: '+cursoSeleccionado.costo+ ' pesos'+'\n'+'\n'+'\n'
                 )},id*2000);
                })(id);
    }
}

const opciones={
    id:{
        demand:true,
        alias: 'i'
    },
    nombre:{
        demand:true,
        alias:'n'
    },
    cedula:{
        demand:true,
        alias:'c'
    }
}

const fs=require('fs');


let confirmarInscripcion=(informacionEstudianteInscrito)=>{
    let datos=`${informacionEstudianteInscrito.nombre},${informacionEstudianteInscrito.cedula},${informacionEstudianteInscrito.id}`;
    texto='el estudiante '+ datos[0] + ' con cédula '+ datos[1] +' se ha inscrito en el curso '+ datos[2];
    // texto='el estudiante '+ opciones.id + ' con cédula '+ opciones.cedula +' se ha inscrito en el curso '+ opciones.id;
    fs.writeFile('inscripcion.txt',texto,(err)=>{
        if (err) throw (console.log('ha habido un error en la inscrpción, intente de nuevo'))
        console.log('Actualice la página se desea ver la confirmación de su inscripción')
        app.get('/', function (req, res) {
            res.send(texto)
        })
        app.listen(3000)
        console.log('Se ha inscrito exitosamente!')
    })
}


const educacionContinua = require('yargs')
    .command('inscribir','Módulo inscripción educación continua'+'\n'+'Porfavor ejecute el código con la palabra inscribir y las opciones que se muestran a continuación: (id del curso, nombre y cédula)'+'\n'+'Ej: inscribir -i=01 -n=nombre -c=1234',opciones).argv

    if (educacionContinua._[0]!= 'inscribir'){
        console.log('Tenemos disponibles '+cursos.length+ ' cursos que puedes ver a continuación, si desea inscribirse en algún curso ejecute el programa y digite la palabra "inscribir" :' +'\n' )
        listarCursos()
    }
    else{
        confirmarInscripcion(educacionContinua)
    }
    

     
// app.get('/', function (req, res) {
//     res.send(texto)
// })
     
// app.listen(3000)



    

     



