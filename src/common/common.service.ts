import { Injectable } from "@nestjs/common";

@Injectable()
export class CommonService {
  isValidDateString(dateString: string) {
    const dateObject = new Date(dateString);
    return !isNaN(dateObject.getTime());
  }

  isValidFullName(name: string): boolean {
    const words = name.split(/\s+/);
    return words.length >= 2;
  }

  isValidUkrainianPhoneNumber(phoneNumber: string): string | null {
    const ukrainianPhoneNumberPattern = /^(\+38)?\d{10}$/;
    // const numericPhoneNumber = phoneNumber.replace(/\D/g, "");
    let test = ukrainianPhoneNumberPattern.test(phoneNumber);
    return test ? phoneNumber : null;
  }

  isInteger(value: string): boolean {
    return !isNaN(parseInt(value)) && Number.isInteger(parseFloat(value));
  }
}
