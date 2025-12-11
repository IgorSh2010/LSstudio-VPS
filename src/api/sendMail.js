import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const result = await resend.emails.send({
      from: 'lika.shepetko@gmail.com', //'noreply@ls-studio.top',  // або будь-який верифікований e-mail у Resend
      to,
      subject,
      text,
    });

    console.log('Email sent:', result);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Send error:', error);
    res.status(500).json({ message: 'Send failed' });
  }
};
