// const/let/var nombreVariable: tipado = asingación
let nombre = 'Oscar' // tipado implícito
let nombre2: string = 'Alejandro' // tipado explícito

let edad: number
edad = 29

let edad2 // si no le asigno el tipo de variable (como arriba), será any
edad2 = 30
edad2 = '30'

enum Fases { // es una forma de declarar datos única de TS, es para enumerar datos
    primero, // 0
    segundo, // 1
    tercero // 2
}

enum userAction {
    fetchUser = 'FETCH_USER',
    postUser = 'POST_USER',
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
let changingType: any = 'Franco'
changingType = 26
changingType = true
//changingType.method() // un tipado any sí puede tener métodos
// Lo que hace el tipado any realmente es deshabilitarme todos los checkeos de TS. Es una mala práctica usarlo.

//Unknown
let unknownValue: unknown = 'Franco'
//let string1: string = unknownValue // Esto me da error
let string2: string = unknownValue as string // Ya no me da error
//unknownValue.method() // da error porque una variable de tipo unknown no puede tener métodos, ya que puede llegar a tener errores de tipo runtime

// variables en una funcion
function noImplicitType(firstArgument: string, secondArgument: string) {
    console.log(firstArgument);
    console.log(secondArgument);   
}

//noImplicitType(1, 2)// me da error porque estoy tipando al argumento como string
noImplicitType('Oscar', 'Alejandro') // Ya no me da error
// el tipado obligatorio de los argumentos se puede desactivar en tsconfig.json 'noImplicitAny': false
