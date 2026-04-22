
const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const bodyParser = require("body-parser")
const fs = require("fs")

const app = express()
app.use(bodyParser.json())
app.use(express.static("public"))

const db = new sqlite3.Database("./database.db")

// init db if empty
const initSQL = fs.readFileSync("./db/init.sql").toString()
db.exec(initSQL)

app.get("/api/patients",(req,res)=>{
 db.all("SELECT * FROM patients WHERE status='admit'",[],(err,rows)=>{
  res.json(rows||[])
 })
})

app.get("/api/bed/:bed",(req,res)=>{
 db.get("SELECT * FROM patients WHERE bed_id=? AND status='admit'",[req.params.bed],(err,row)=>{
  res.json(row||{})
 })
})

app.post("/api/admit",(req,res)=>{
 const p=req.body
 db.run(`INSERT OR REPLACE INTO patients
 (hn,an,name,age,gender,admit_date,discharge_date,ward_id,room_id,bed_id,status)
 VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
 [p.hn,p.an,p.name,p.age,p.gender,p.admit_date,p.discharge_date,p.ward_id,p.room_id,p.bed_id,"admit"])
 res.json({status:"ok"})
})

app.post("/api/discharge/:hn",(req,res)=>{
 db.run("UPDATE patients SET status='discharge' WHERE hn=?",[req.params.hn])
 res.json({status:"discharged"})
})

app.get("/api/menu",(req,res)=>{
 db.all("SELECT * FROM menu_items WHERE available=1",[],(err,rows)=>{
  res.json(rows||[])
 })
})

app.post("/api/orders",(req,res)=>{
 const o=req.body
 db.run(`INSERT INTO orders(hn,bed_id,meal_date,meal_type,status,created_at)
 VALUES (?,?,?,?,?,datetime('now'))`,
 [o.hn,o.bed_id,o.meal_date,o.meal_type,"pending"],
 function(){

  const orderId=this.lastID

  if(o.items){
   o.items.forEach(i=>{
    db.run("INSERT INTO order_items(order_id,menu_id,qty) VALUES (?,?,?)",
    [orderId,i.menu_id,i.qty])
   })
  }

 })

 res.json({status:"ok"})
})

app.get("/api/orders",(req,res)=>{
 db.all("SELECT * FROM orders ORDER BY created_at DESC",[],(err,rows)=>{
  res.json(rows||[])
 })
})

app.listen(3000,()=>{
 console.log("MealCare running http://localhost:3000")
})
