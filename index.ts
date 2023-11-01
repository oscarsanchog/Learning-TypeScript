// const/let/var nombreVariable: tipado = asingación
let nombre = "Oscar" // tipado implícito
let nombre2: string = "Alejandro" // tipado explícito

let edad: number
edad = 29

let edad2 // si no le asigno el tipo de variable (como arriba), será any
edad2 = 30
edad2 = "30"

enum Fases { // es una forma de declarar datos única de TS, es para enumerar datos
  primero, // 0
  segundo, // 1
  tercero, // 2
}

enum userAction {
  fetchUser = "FETCH_USER",
  postUser = "POST_USER",
}

userAction.fetchUser // me puede llegar a servir para comparar en un switch en el reducer de redux

// ----

//null
let nullExample: null = null
let numberExample: number = null

//undefined
let undefinedExample: undefined = undefined
let stringExample: string = undefined

//esto se modifica en el tsconfig.json "strictNullChecks": false,
// esto no es obligatorio, depende del programador. Por ejemplo, para declarar un estado global en null y luego cambiarlo

// ----
//Any
let changingType: any = "Franco"
changingType = 26
changingType = true
//changingType.method() // un tipado any sí puede tener métodos
// Lo que hace el tipado any realmente es deshabilitarme todos los checkeos de TS. Es una mala práctica usarlo.

//Unknown
let unknownValue: unknown = "Franco"
//let string1: string = unknownValue // Esto me da error
let string2: string = unknownValue as string // Ya no me da error
//unknownValue.method() // da error porque una variable de tipo unknown no puede tener métodos, ya que puede llegar a tener errores de tipo runtime

// variables en una funcion
function noImplicitType(firstArgument: string, secondArgument: string) {
  console.log(firstArgument)
  console.log(secondArgument)
}

//noImplicitType(1, 2)// me da error porque estoy tipando al argumento como string
noImplicitType("Oscar", "Alejandro") // Ya no me da error
// el tipado obligatorio de los argumentos se puede desactivar en tsconfig.json 'noImplicitAny': false

// Tuple
let person: [string, number] = ["Franco", 26]
person = ["Oscar", 30] // la puedo cambiar

// Arreglos
let arreglo: number[] = [1, 2, 3, 4]
arreglo.push(8) // no le puedo pushear otra cosa que no sea un número

let stringArray: string[] = ["Oscar", "Sancho"]
let oscar = stringArray.shift() // no es necesario tipar la variable oscar porque está implícito cuando uso el método shift en stringArray (que es un array de strings)
oscar.length // tengo todos los métodos de los strings

// Otra sintaxis de los arrays
let numbersArray: Array<number> = [2, 3, 5, 8]

// Objetos
// - Tipado inferido
const user = {
  nombre: "Oscar",
  apellido: "Sancho",
}

// - Tipado explícito
interface User {
  nombre: string
  apellido: string
  edad: number
  hobbies: Hobbie[]
}

interface Hobbie {
  name: string
}

const user2: User = {
  nombre: "matias",
  apellido: "lamela",
  edad: 23,
  hobbies: [],
}

// extends
interface Estudiante extends User {
  // no es necesario reescribir código, sino que hereda las claves de la interface User
  // nombre: string,
  // apellido: string,
  // edad: number,
  isActive?: boolean // esta key es opcional
  saludo: () => void
}

let pechocha: Estudiante = {
  nombre: "pechocha",
  apellido: "homocha",
  edad: 100,
  //isActive: true, // no se queja si lo comento porque lo declaré como opcional
  saludo: () => console.log("Hola" + nombre),
  hobbies: [{ name: "leer" }], // solo se pueden agregar objetos con valor del tipo que tipé en la interface Hobbie
}

pechocha.hobbies[0].name // así puedo acceder
pechocha.isActive // esto me dará undefined

// ----
// Clases
class Persona {
  nombre: string // todas las variables de una clase son públicas por defecto, lo que quiere decir es que puedo acceder a ellas desde fuera de la clase
  private edad: number // aquí le indico que es privada
  protected email: string // Puedo acceder desde otras clases hijas, pero no desde fuera de la clase
  constructor(nombre: string, edad: number, email: string) {
    this.nombre = nombre
    this.edad = edad
    this.email = email
  }

  getFullInfo() {
    return `${this.nombre} ${this.edad}`
  }

  getAge() {
    return this.edad // puedo acceder a edad xq estoy dentro de la clase
  }

  protected getName() { // los métodos pueden ser privados o protected también
    return this.nombre
  }
}

const student = new Persona("Oscar", 30, "oscar@gmail.com")

student.getFullInfo()
//student.edad // me lanza error xq es privada
student.getAge() // ahora sí puedo acceder a la edad

class Estudiante extends Persona {
  isActive?: boolean
  constructor(nombre: string, edad: number, email: string) {
    super(nombre, edad, email)
    this.isActive = false
  }
  getEmail () {
    this.email
  }
}

const Fede = new Persona('Fede', 29, 'fede@gmail.com')

// ----
// Funciones
/* Sintaxis:
function nombreFunction(parametroUno: TIPADO, parametroDos: TIPADO): TIPADO_RETURN
*/
function suma (a: number, b: number): number {
    return a + b
}

const result = suma(2, 2) // mi variable automáticamente tomará el tipado del retorno de la función

// función tipo void
function consoleLog(): void { // si le pongo void es porque no retornará nada
    console.log('Función tipo void porque no hay return');
}

// función tipo never
function throwError(msg: string): never { // La función será de tipo never si es que retornará un error
    throw new Error(msg)
}

// parámetro opcional
function suma2 (a: number, b: number, c?: number) {
    return a + b + c
}

const result2 = suma2(1, 2, 3) // el último parámetro puede ir o no

// tipado alternativo
function suma3 (a: number | string, b: number | string): number | string | void { // otra forma es hacer dos funciones diferentes y ya
    if(typeof a === 'number' && typeof b === 'number') return a + b
    if(typeof a === 'string' && typeof b === 'string') return a + b
}
const result3 = suma3(1, 2)

// otra solución
function suma4 (a: number | string, b: number | string): number | string | void { // otra forma es hacer dos funciones diferentes y ya
    if(typeof a === 'string') a = parseInt(a)
    if(typeof b === 'string') b = parseInt(b)

    return a + b
}

// es necesario hacer esto porque TS, a comparación de JS, no puede sumar o concatenar dependiendo si es number o string; puede solo sumar o concanetar

// Generic functions
// - Las generics function están para solucionar este problema:
const array = [1, 2, 3, 4]
const arrayString= ['a', 'b', 'c']

function firstElement(arr: any[]){ // declaré al parámetro como any
  return arr[0]
}
const elemento = firstElement(array) // esto es un problema porque la nueva variable declarada será any
const elementoString = firstElement(arrayString) // También es any

// Solución: pasarle el tipado por parámetro
function secondElement<Type>(arr: Type[]): Type { // por conveción es Type, también se suele encontrar como <T>
  return arr[0]
}
let elemento2 = secondElement(array) // magia, ya no es any, sino que agarra el tipado del parámetro que se le envió a la función
let elementoString2 = secondElement<string>(arrayString) // tipado explícito

// trabajar con generic functions y objetos
function merge<U extends object, V extends object>(obj1: U, obj2: V) {
  return {
    ...obj1,
    ...obj2
  }
} // esto se utiliza para que cuando yo llame a mi función, me advierta con un error de que lo que le estoy pasando no es un objeto

merge({name: 'Franco'}, {age: 25})
//merge({name: 'Franco'}, 23) // me da error porque 23 no es un objeto 

// Se usa generic functions cuando estoy usando arreglo y objetos
// Las actions en redux son funciones genéricas.
// El axios.post y axios.get también
// Otro ejemplo es el useState de react, también usa generic functions. Cuando no se le pone el estado inicial, es necesario pasarle el tipado por parámetro con <>

// ----
// function overloads
function resta1(a: number, b: string): string;
function resta1(a: string, b: number): string;
function resta1(a: string, b: string): string;
function resta1(a: number, b: number): number;
function resta1(a: number | string, b: number | string): number | string {
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  } else {
    return "Error: Los argumentos no son números.";
  }
}

let resultado = resta1(2, 2)

// otro ejemplo:
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}

makeDate(12345678); // 1970-01-01T03:25:45.678Z
makeDate(3, 5, 2021); // 2021-04-05T03:00:00.000Z
//makeDate(1, 3); // Error: No overload expects 2 arguments, but overloads
		// do exist that expect either 1 or 3 arguments.

// Hay que instalar los types de react para trabajar con él, sino se rompe toro. Hay que averiguar eso.

// ----

