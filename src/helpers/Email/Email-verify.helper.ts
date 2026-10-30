interface VerificationEmail {
    subject: string;
    html: string;
    text: string;
}

interface Options {
    logoUrl?: string; 
    companyName?: string;
    siteUrl?: string;
    year?: number;
}

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

export function generateVerificationEmail(
    code: string | number,
    url: string,
    {
        logoUrl = "https://yourdomain.com/logo.png",
        companyName = "RebelGive, LLC",
        siteUrl = "www.rebelgive.com",
        year = 2020,
    }: Options = {}
): VerificationEmail {
    const subject = `Hello This is Test verification Email ${code}`;
    const safeUrl = escapeHtml(url);

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(subject)}</title>
  <style>
    @media only screen and (max-width: 480px) {
      .content { padding: 28px 16px 36px 16px !important; }
      .title { font-size: 26px !important; line-height: 32px !important; }
      .text { font-size: 15px !important; line-height: 22px !important; }
      .btn { font-size: 16px !important; padding: 14px 40px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#ffffff;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <!-- Top cyan bar -->
    <tr>
      <td style="background-color:#0dc4f2; height:8px; line-height:8px; font-size:0;">&nbsp;</td>
    </tr>

    <tr>
      <td align="center">
        <!-- Centered container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
               style="max-width:600px; width:100%;">

          <!-- Main content -->
          <tr>
            <td class="content" align="center"
                style="padding:40px 24px 50px 24px; font-family:Arial, Helvetica, sans-serif;">
              <img src="${escapeHtml(logoUrl)}" width="56" height="56" alt="Logo"
                   style="display:block; border-radius:50%; margin:0 auto 32px auto;" />

              <h1 class="title"
                  style="margin:0 0 20px 0; font-size:32px; line-height:38px; font-weight:normal; color:#064e63;">
                Verify your email
              </h1>

              <p class="text"
                 style="margin:0 auto 32px auto; max-width:440px; font-size:16px; line-height:24px; color:#064e63;">
                To keep things secure and make sure your account is protected,
                please verify your email using the button below
              </p>

              <!-- Button -->
              <a class="btn" href="${safeUrl}" target="_blank"
                 style="display:inline-block; background-color:#0dc4f2; color:#ffffff; text-decoration:none;
                        font-size:18px; font-family:Arial, Helvetica, sans-serif;
                        padding:14px 56px; border-radius:40px;">
                Click to verify
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center"
                style="background-color:#e0f7ff; padding:20px 16px; font-family:Arial, Helvetica, sans-serif;">
              <img src="${escapeHtml(logoUrl)}" width="40" height="40" alt="Logo"
                   style="display:block; border-radius:50%; margin:0 auto 12px auto;" />
              <p style="margin:0; font-size:12px; line-height:18px; color:#064e63;">
                Copyright ${year} — ${escapeHtml(companyName)}<br />
                ${escapeHtml(siteUrl)}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const text = `Verify your email

To keep things secure and make sure your account is protected, please verify your email using the link below:

${url}

Verification code: ${code}

Copyright ${year} — ${companyName}
${siteUrl}`;

    return { subject, html, text };
}