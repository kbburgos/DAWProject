db.createUser({
    user: "medicina",
    pwd: "medicina",
    roles: ["readWrite", "dbAdmin"]
})

db.clientes.insert({
    nombre: "jonathan",
    apellido: "quintana2"
})

db.clientes.insert([
    {nombre: "israel", apellido: "Solorzano"},
    {nombre: "israel2", apellido: "Solorzano"},
    {nombre: "israel3", apellido: "Solorzano"}
])

db.clientes.find({
    nombre: "israel"
})

db.clientes.update({
    apellid: "quintana"
},{
    nombre: "israel", apellido: "quintana"
})