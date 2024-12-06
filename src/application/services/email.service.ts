import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly client: SibApiV3Sdk.TransactionalEmailsApi;

  constructor() {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;

    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    this.client = new SibApiV3Sdk.TransactionalEmailsApi();
  }

  async sendPostCreationEmail(
    email: string,
    postTitle: string,
    postLink: string,
  ): Promise<void> {
    try {
      const sendSmtpEmail = {
        to: [{ email }],
        subject: 'New Blog Post Created!',
        htmlContent: `
          <h1>New Post Alert</h1>
          <p>A new post titled "<strong>${postTitle}</strong>" has been created.</p>
          <p>Click <a href="${postLink}">here</a> to view it!</p>
        `,
        sender: {
          email: 'no-reply@yourdomain.com',
          name: 'Blog Notification',
        },
      };

      await this.client.sendTransacEmail(sendSmtpEmail);
      console.log(`Email sent to ${email}`);
    } catch (error) {
      console.error('Error sending email:', error.message);
      throw new Error('Failed to send email');
    }
  }
}
