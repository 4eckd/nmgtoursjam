/**
 * Email Service Configuration for NMG Tours Jamaica
 * Uses Resend for transactional emails
 */

import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY not set - email functionality will be disabled')
}

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@nmgtoursjam.com'
const COMPANY_NAME = 'NMG Tours Jamaica'

/**
 * Send booking confirmation email to customer
 */
export async function sendBookingConfirmationEmail(data: {
  customerEmail: string
  customerName: string
  bookingNumber: string
  tourTitle: string
  tourDate: string
  guests: number
  totalPrice: string
  meetingPoint: string
}) {
  if (!resend) {
    console.warn('Resend not configured - skipping email')
    return { success: false, message: 'Email service not configured' }
  }

  try {
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .booking-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #10b981; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .detail-label { font-weight: 600; color: #6b7280; }
            .detail-value { color: #111827; }
            .cta-button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Booking Confirmed!</h1>
              <p>Your Jamaican adventure awaits</p>
            </div>
            <div class="content">
              <p>Dear ${data.customerName},</p>
              <p>Thank you for booking with ${COMPANY_NAME}! Your tour has been confirmed.</p>

              <div class="booking-details">
                <h2 style="color: #10b981; margin-top: 0;">Booking Details</h2>
                <div class="detail-row">
                  <span class="detail-label">Booking Number:</span>
                  <span class="detail-value"><strong>${data.bookingNumber}</strong></span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Tour:</span>
                  <span class="detail-value">${data.tourTitle}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Date:</span>
                  <span class="detail-value">${data.tourDate}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Guests:</span>
                  <span class="detail-value">${data.guests} ${data.guests === 1 ? 'person' : 'people'}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Total Paid:</span>
                  <span class="detail-value"><strong>${data.totalPrice}</strong></span>
                </div>
                <div class="detail-row" style="border-bottom: none;">
                  <span class="detail-label">Meeting Point:</span>
                  <span class="detail-value">${data.meetingPoint}</span>
                </div>
              </div>

              <p><strong>What to bring:</strong></p>
              <ul>
                <li>This confirmation email (printed or on your phone)</li>
                <li>Valid ID</li>
                <li>Comfortable clothing and footwear</li>
                <li>Sunscreen and hat</li>
                <li>Camera (optional)</li>
              </ul>

              <p><strong>Important Notes:</strong></p>
              <ul>
                <li>Please arrive 15 minutes before your scheduled tour time</li>
                <li>Contact us immediately if you need to make changes</li>
                <li>Cancellation policy: Full refund if cancelled 48+ hours in advance</li>
              </ul>

              <center>
                <a href="https://nmgtoursjam.com/dashboard" class="cta-button">View My Bookings</a>
              </center>

              <p>If you have any questions, feel free to reply to this email or contact us at:</p>
              <p>
                📧 info@nmgtoursjam.com<br>
                📞 +1 (876) XXX-XXXX
              </p>

              <p>We look forward to showing you the beauty of Jamaica! 🇯🇲</p>

              <p>Warm regards,<br>
              <strong>The ${COMPANY_NAME} Team</strong></p>

              <div class="footer">
                <p>© ${new Date().getFullYear()} ${COMPANY_NAME}. All rights reserved.</p>
                <p>You received this email because you booked a tour with us.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    const { data: emailData, error } = await resend.emails.send({
      from: `${COMPANY_NAME} <${FROM_EMAIL}>`,
      to: data.customerEmail,
      subject: `Booking Confirmed - ${data.tourTitle} (${data.bookingNumber})`,
      html: emailHtml,
    })

    if (error) {
      console.error('Error sending booking confirmation email:', error)
      return { success: false, message: error.message }
    }

    return { success: true, messageId: emailData?.id }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, message: 'Failed to send email' }
  }
}

/**
 * Send booking reminder email (24 hours before tour)
 */
export async function sendBookingReminderEmail(data: {
  customerEmail: string
  customerName: string
  tourTitle: string
  tourDate: string
  meetingPoint: string
}) {
  if (!resend) {
    console.warn('Resend not configured - skipping reminder email')
    return { success: false, message: 'Email service not configured' }
  }

  try {
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .reminder-box { background: #fef3c7; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #f59e0b; }
            .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⏰ Tour Reminder</h1>
              <p>Your adventure is tomorrow!</p>
            </div>
            <div class="content">
              <p>Hi ${data.customerName},</p>
              <p>This is a friendly reminder that your tour with ${COMPANY_NAME} is coming up soon!</p>

              <div class="reminder-box">
                <h2 style="color: #d97706; margin-top: 0;">Tour Details</h2>
                <p><strong>Tour:</strong> ${data.tourTitle}</p>
                <p><strong>Date & Time:</strong> ${data.tourDate}</p>
                <p><strong>Meeting Point:</strong> ${data.meetingPoint}</p>
              </div>

              <p><strong>Please remember to bring:</strong></p>
              <ul>
                <li>Your booking confirmation</li>
                <li>Valid ID</li>
                <li>Comfortable clothing</li>
                <li>Sunscreen and hat</li>
              </ul>

              <p><strong>Arrival:</strong> Please arrive 15 minutes early.</p>

              <p>Need to make changes? Contact us as soon as possible.</p>

              <p>See you soon!<br>
              <strong>The ${COMPANY_NAME} Team</strong></p>

              <div class="footer">
                <p>© ${new Date().getFullYear()} ${COMPANY_NAME}. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    const { data: emailData, error } = await resend.emails.send({
      from: `${COMPANY_NAME} <${FROM_EMAIL}>`,
      to: data.customerEmail,
      subject: `Reminder: ${data.tourTitle} - Tomorrow!`,
      html: emailHtml,
    })

    if (error) {
      console.error('Error sending reminder email:', error)
      return { success: false, message: error.message }
    }

    return { success: true, messageId: emailData?.id }
  } catch (error) {
    console.error('Error sending reminder email:', error)
    return { success: false, message: 'Failed to send email' }
  }
}
