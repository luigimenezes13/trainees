import Email from './email';
import { Sender } from './sender';
import Employee from './employee';
class EmailSender implements Sender{

  public send(employee: Employee) {
    const email = this.emailFor(employee)
    console.log(
      `To: ${email.getTo()}, Subject: ${email.getSubject()}, Message: ${email.getMessage()}`
    );
  }

  private emailFor(employee: Employee): Email {
    const message: string = `Happy birthday, dear ${employee.getFirstName()}!`;
    return new Email(employee.getEmail(), 'Happy birthday!', message);
  }
}

export default EmailSender;
