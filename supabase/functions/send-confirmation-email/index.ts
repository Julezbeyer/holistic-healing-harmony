
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
      status: 200,
    })
  }

  try {
    const { appointment, timeSlot, recipient, subject } = await req.json()

    // Logging für Diagnose
    console.log('Appointment:', appointment)
    console.log('TimeSlot:', timeSlot)
    console.log('Recipient:', recipient)
    console.log('Subject:', subject)

    // Hier könntest du einen E-Mail-Service wie SendGrid oder ähnliches einbinden
    // Beispiel:
    // const sendGridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${Deno.env.get('SENDGRID_API_KEY')}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     personalizations: [{ to: [{ email: recipient }] }],
    //     from: { email: 'noreply@deinangebot.de' },
    //     subject: subject,
    //     content: [{
    //       type: 'text/html',
    //       value: `Ihre Buchung wurde bestätigt für den ${timeSlot.date} von ${timeSlot.startTime} bis ${timeSlot.endTime}`
    //     }]
    //   })
    // })

    // Simuliere E-Mail-Versand für Testzwecke
    const emailContent = `
      <h1>Terminbestätigung</h1>
      <p>Sehr geehrte(r) ${appointment.name},</p>
      <p>Ihr Termin wurde erfolgreich gebucht:</p>
      <ul>
        <li>Datum: ${timeSlot.date}</li>
        <li>Uhrzeit: ${timeSlot.startTime} - ${timeSlot.endTime}</li>
      </ul>
      <p>Wir freuen uns auf Ihren Besuch!</p>
    `

    console.log('E-Mail würde gesendet an:', recipient)
    console.log('E-Mail-Inhalt:', emailContent)

    return new Response(
      JSON.stringify({ success: true, message: 'E-Mail erfolgreich gesendet' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error)
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
