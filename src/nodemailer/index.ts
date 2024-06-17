import nodemailer from 'nodemailer'
import path from 'path'
import dotenv from 'dotenv'
import ejs from 'ejs'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

let config = {
  host: 'smtp.gmail.com',
  service: 'gmail',
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
}

function createTransporter(config: any) {
  return nodemailer.createTransport(config)
}

async function sendEmail(messageOptions: any) {
  let transporter = createTransporter(config)
  await transporter.verify()

 transporter.sendMail(messageOptions, (err, info) => {
    if (err) {
      console.log(err)
    }
    console.log(info)
  })
}

export async function sendRegisterEmail(user: { name: string, email: string }) {
    ejs.renderFile(
      path.resolve(__dirname, '../../templates/register.ejs'),
      { name: user.name },
      async (err, data) => {
        if (err) {
          console.error(err)
          return
        }
  
        let messageOptions = {
          to: user.email,
          from: process.env.EMAIL,
          subject: 'Welcome to Premeir Vans Tours and travel',
          html: data,
        };
  
        await sendEmail(messageOptions)
      }
    )
  }