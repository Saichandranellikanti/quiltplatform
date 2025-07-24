import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { bookingData, userEmail } = await req.json()

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Get user's company from database
    const { data: userData, error: userError } = await supabaseClient
      .from('users')
      .select('company')
      .eq('email', userEmail)
      .single()

    if (userError || !userData) {
      throw new Error('User not found or no company associated')
    }

    const company = userData.company

    // Google Sheets API endpoint
    const GOOGLE_SHEETS_API_KEY = Deno.env.get('GOOGLE_SHEETS_API_KEY')
    const GOOGLE_SHEETS_SCRIPT_URL = Deno.env.get('GOOGLE_SHEETS_SCRIPT_URL')

    if (!GOOGLE_SHEETS_API_KEY || !GOOGLE_SHEETS_SCRIPT_URL) {
      throw new Error('Google Sheets configuration missing')
    }

    // Prepare data for Google Sheets
    const sheetData = {
      company: company,
      timestamp: new Date().toISOString(),
      bookingNo: bookingData.bookingNo || `${company}-${Date.now()}`,
      bookingDate: bookingData.bookingDate,
      portOfLoading: bookingData.portOfLoading,
      portOfDischarge: bookingData.portOfDischarge,
      shipper: bookingData.shipper,
      receiver: bookingData.receiver,
      country: bookingData.country,
      containerType: bookingData.containerType,
      containerNo: bookingData.containerNo,
      quantity: bookingData.quantity,
      freight: bookingData.freight,
      blCharges: bookingData.blCharges,
      localCharges: bookingData.localCharges,
      permitType: bookingData.permitType,
      notes: bookingData.notes,
      submittedBy: userEmail
    }

    // Send to Google Sheets
    const response = await fetch(GOOGLE_SHEETS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sheetData)
    })

    if (!response.ok) {
      throw new Error('Failed to save to Google Sheets')
    }

    const result = await response.json()

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Booking saved successfully',
        bookingNo: sheetData.bookingNo,
        result 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in save-booking function:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})