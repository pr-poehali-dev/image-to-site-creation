import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.header import Header
from email.utils import formataddr


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на почту через SMTP Mail.ru"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    contact = body.get('contact', '').strip()
    task = body.get('task', '').strip()

    if not name or not contact:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и контакт обязательны'})
        }

    smtp_user = os.environ['SMTP_USER']
    smtp_password = os.environ['SMTP_PASSWORD']
    to_email = 'help@itproximum.ru'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = Header(f'Новая заявка с сайта — {name}', 'utf-8')
    msg['From'] = formataddr((str(Header('PROximum сайт', 'utf-8')), smtp_user))
    msg['To'] = to_email

    task_row = ''
    if task:
        task_row = f'''<tr style="border-top: 1px solid #eee;">
            <td style="padding: 10px 0; color: #888; font-size: 14px; vertical-align: top;">Задача</td>
            <td style="padding: 10px 0; font-size: 15px;">{task}</td>
          </tr>'''

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #FF7A00; padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #fff; margin: 0; font-size: 22px;">Новая заявка с сайта</h1>
      </div>
      <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #eee;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #888; width: 140px; font-size: 14px;">Имя</td>
            <td style="padding: 10px 0; font-weight: bold; font-size: 15px;">{name}</td>
          </tr>
          <tr style="border-top: 1px solid #eee;">
            <td style="padding: 10px 0; color: #888; font-size: 14px;">Контакт</td>
            <td style="padding: 10px 0; font-weight: bold; font-size: 15px;">{contact}</td>
          </tr>
          {task_row}
        </table>
      </div>
    </div>
    """

    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
